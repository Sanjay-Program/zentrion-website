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

  const [userRes, eventsRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${encodeURIComponent(query)}`, {
      headers,
      signal: AbortSignal.timeout(7000),
    }),
    fetch(`https://api.github.com/users/${encodeURIComponent(query)}/events/public?per_page=20`, {
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
  const events = eventsRes.ok ? await eventsRes.json() : [];
  const repos = reposRes.ok ? await reposRes.json() : [];
  const exposedEmails = new Set<string>();

  if (Array.isArray(events)) {
    for (const event of events) {
      if (
        event?.type !== 'PushEvent' ||
        !event?.payload ||
        !Array.isArray(event.payload.commits)
      ) {
        continue;
      }

      for (const commit of event.payload.commits) {
        const email = commit?.author?.email;
        if (typeof email === 'string' && !email.endsWith('@noreply.github.com')) {
          exposedEmails.add(email);
        }
      }
    }
  }

  return NextResponse.json({
    username: query,
    user: {
      login: user.login,
      name: user.name,
      avatar: user.avatar_url,
      profile: user.html_url,
      bio: user.bio,
      company: user.company,
      location: user.location,
      blog: user.blog,
      publicRepos: user.public_repos,
      publicGists: user.public_gists,
      followers: user.followers,
      following: user.following,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    },
    emails: Array.from(exposedEmails),
    emailCount: exposedEmails.size,
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
    timestamp: new Date().toISOString(),
  });
}
