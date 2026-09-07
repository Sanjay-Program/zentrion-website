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
        let errMessage = 'GitHub API request failed.';
        try {
            const errData = await response.json();
            if (errData && errData.message) {
                errMessage = `GitHub API Error (${response.status}): ${errData.message}`;
            }
        } catch(e) {}
        throw new Error(errMessage);
    }

    const data: any = await response.json();
    
    // Fetch repos
    let reposData: any[] = [];
    try {
        const reposRes = await fetch(`https://api.github.com/users/${encodeURIComponent(query)}/repos?sort=updated&per_page=100`, {
           headers: { 'User-Agent': 'Zentrion-Cyber-Tools' } 
        });
        if (reposRes.ok) {
            reposData = await reposRes.json();
        }
    } catch(e) {}

    const topRepos = reposData
        .filter(r => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .map(r => ({
            name: r.name,
            description: r.description,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
            url: r.html_url,
            updated_at: r.updated_at
        }));

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
      top_repos: topRepos,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return Response.json({ error: error.message || 'Failed to fetch GitHub data.' }, { status: 500 });
  }
}
