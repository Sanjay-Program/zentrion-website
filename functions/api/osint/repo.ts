export async function onRequestGet({ request }: { request: Request }) {
  const query = new URL(request.url).searchParams.get('query')?.trim() || '';

  if (!query) {
    return Response.json({ error: 'Please provide a GitHub repository (e.g., owner/repo).' }, { status: 400 });
  }

  // Parse repo name from URL if necessary
  let repoPath = query;
  if (repoPath.includes('github.com/')) {
    repoPath = repoPath.split('github.com/')[1];
  }
  // Remove any trailing slashes or extra paths
  repoPath = repoPath.split('/').slice(0, 2).join('/');

  if (repoPath.split('/').length !== 2 || !repoPath.split('/')[1]) {
    return Response.json({ error: 'Invalid repository format. Use owner/repo.' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: { 'User-Agent': 'Zentrion-Cyber-Tools' }
    });

    if (!response.ok) {
        if (response.status === 404) {
            return Response.json({ error: 'GitHub repository not found.' }, { status: 404 });
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
    
    // Fetch languages
    let languages = {};
    try {
        const langRes = await fetch(`https://api.github.com/repos/${repoPath}/languages`, {
           headers: { 'User-Agent': 'Zentrion-Cyber-Tools' } 
        });
        if (langRes.ok) {
            languages = await langRes.json();
        }
    } catch(e) {}

    return Response.json({
      valid: true,
      full_name: data.full_name,
      description: data.description,
      html_url: data.html_url,
      homepage: data.homepage,
      stargazers_count: data.stargazers_count,
      watchers_count: data.watchers_count,
      forks_count: data.forks_count,
      open_issues_count: data.open_issues_count,
      network_count: data.network_count,
      subscribers_count: data.subscribers_count,
      language: data.language,
      languages: Object.keys(languages),
      created_at: data.created_at,
      updated_at: data.updated_at,
      pushed_at: data.pushed_at,
      size: data.size,
      default_branch: data.default_branch,
      license: data.license?.name || 'No License',
      owner: {
        login: data.owner.login,
        avatar_url: data.owner.avatar_url,
        html_url: data.owner.html_url,
        type: data.owner.type
      },
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return Response.json({ error: error.message || 'Failed to fetch GitHub repository data.' }, { status: 500 });
  }
}
