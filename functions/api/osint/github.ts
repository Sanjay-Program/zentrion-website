export async function onRequestGet({ request }: { request: Request }) {
  const query = new URL(request.url).searchParams.get('query')?.trim() || '';

  if (!query) {
    return Response.json({ error: 'Please provide a GitHub username.' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Zentrion-Cyber-Tools' }
    });

    if (!response.ok) {
        if (response.status === 404) {
            return Response.json({ error: 'GitHub user not found.' }, { status: 404 });
        }
        throw new Error('GitHub API request failed.');
    }

    const data: any = await response.json();
    return Response.json({
      valid: true,
      username: data.login,
      name: data.name,
      bio: data.bio,
      company: data.company,
      location: data.location,
      blog: data.blog,
      twitter_username: data.twitter_username,
      public_repos: data.public_repos,
      public_gists: data.public_gists,
      followers: data.followers,
      following: data.following,
      created_at: data.created_at,
      updated_at: data.updated_at,
      profile_url: data.html_url,
      avatar_url: data.avatar_url,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return Response.json({ error: error.message || 'Failed to fetch GitHub data.' }, { status: 500 });
  }
}
