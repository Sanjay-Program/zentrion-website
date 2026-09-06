import { NextResponse } from 'next/server';

function validUsername(username: string) {
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(username);
}

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query')?.trim() || '';

  if (!query || !validUsername(query)) {
    return NextResponse.json({ error: 'Please provide a valid GitHub username.' }, { status: 400 });
  }

  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'zentrion-tools',
  };

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${encodeURIComponent(query)}`, {
      headers,
      signal: AbortSignal.timeout(7000),
    }),
    fetch(
      `https://api.github.com/users/${encodeURIComponent(
        query
      )}/repos?per_page=5&sort=updated&type=owner`,
      {
        headers,
        signal: AbortSignal.timeout(7000),
      }
    ),
  ]);

  if (userRes.status === 404) {
    return NextResponse.json({ error: 'GitHub user not found.' }, { status: 404 });
  }

  if (!userRes.ok) {
    return NextResponse.json(
      { error: 'GitHub API request failed. Please try again shortly.' },
      { status: userRes.status }
    );
  }

  const user = await userRes.json();
  const repos = reposRes.ok ? await reposRes.json() : [];

  return NextResponse.json({
    username: query,
    profile: {
      name: user.name,
      bio: user.bio,
      location: user.location,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      profileUrl: user.html_url,
      avatarUrl: user.avatar_url,
    },
    recentRepositories: Array.isArray(repos)
      ? repos.map((repo: {
          name: string;
          html_url: string;
          stargazers_count: number;
          forks_count: number;
          language: string | null;
          updated_at: string;
        }) => ({
          name: repo.name,
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          updatedAt: repo.updated_at,
        }))
      : [],
  });
}
