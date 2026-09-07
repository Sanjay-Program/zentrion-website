
const platforms = [
  {
    name: 'GitHub',
    url: (username: string) => `https://api.github.com/users/${username}`,
    profile: (username: string) => `https://github.com/${username}`,
    check: 'json' as const,
  },
  {
    name: 'HackerNews',
    url: (username: string) => `https://hacker-news.firebaseio.com/v0/user/${username}.json`,
    profile: (username: string) => `https://news.ycombinator.com/user?id=${username}`,
    check: 'json' as const,
  },
  {
    name: 'NPM',
    url: (username: string) => `https://registry.npmjs.org/-/user/org.couchdb.user:${username}`,
    profile: (username: string) => `https://www.npmjs.com/~${username}`,
    check: 'json' as const,
  },
  {
    name: 'Chess.com',
    url: (username: string) => `https://api.chess.com/pub/player/${username}`,
    profile: (username: string) => `https://www.chess.com/member/${username}`,
    check: 'json' as const,
  },
  {
    name: 'Instagram',
    url: (username: string) => `https://www.instagram.com/${username}/`,
    profile: (username: string) => `https://www.instagram.com/${username}/`,
    check: 'status' as const,
  },
  {
    name: 'LeetCode',
    url: (username: string) => `https://leetcode.com/u/${username}/`,
    profile: (username: string) => `https://leetcode.com/u/${username}/`,
    check: 'status' as const,
  },
  {
    name: 'X',
    url: (username: string) => `https://x.com/${username}`,
    profile: (username: string) => `https://x.com/${username}`,
    check: 'status' as const,
  },
  {
    name: 'GitLab',
    url: (username: string) => `https://gitlab.com/${username}`,
    profile: (username: string) => `https://gitlab.com/${username}`,
    check: 'status' as const,
  },
  {
    name: 'Dev.to',
    url: (username: string) => `https://dev.to/${username}`,
    profile: (username: string) => `https://dev.to/${username}`,
    check: 'status' as const,
  },
  {
    name: 'Medium',
    url: (username: string) => `https://medium.com/@${username}`,
    profile: (username: string) => `https://medium.com/@${username}`,
    check: 'status' as const,
  },
  {
    name: 'Reddit',
    url: (username: string) => `https://www.reddit.com/user/${username}/about.json`,
    profile: (username: string) => `https://www.reddit.com/user/${username}/`,
    check: 'json' as const,
  },
];

function validUsername(username: string) {
  return /^[a-zA-Z0-9._-]{2,32}$/.test(username);
}

export async function onRequestGet({ request }: { request: Request }) {
  const query = new URL(request.url).searchParams.get('query')?.trim() || '';

  if (!query || !validUsername(query)) {
    return Response.json({ error: 'Please provide a valid username.' }, { status: 400 });
  }

  const checks = await Promise.all(
    platforms.map(async (platform) => {
      const encoded = encodeURIComponent(query);
      const url = platform.url(encoded);
      try {
        const response = await fetch(url, {
          method: 'GET',
          redirect: 'manual',
          headers: { Accept: 'application/json,text/html', 'User-Agent': 'zentrion-tools' },
          signal: AbortSignal.timeout(6000),
        });

        let exists = false;
        let certainty: 'high' | 'medium' | 'low' = 'high';

        if (platform.check === 'json' && response.status === 200) {
          try {
            const data = await response.json();
            exists = data !== null && !data.error;
          } catch {
            exists = false;
          }
        } else if (platform.check === 'status') {
          if (response.status === 404) {
            exists = false;
          } else if (response.status >= 200 && response.status < 400) {
            exists = true;
            certainty = 'medium';
          } else {
            exists = false;
            certainty = 'low';
          }
        }

        return {
          platform: platform.name,
          exists,
          status: response.status,
          certainty,
          profileUrl: platform.profile(query),
          checkedAt: new Date().toISOString(),
        };
      } catch {
        return {
          platform: platform.name,
          exists: false,
          status: null,
          error: 'Network/CORS blocked',
          profileUrl: platform.profile(query),
          checkedAt: new Date().toISOString(),
        };
      }
    })
  );

  return Response.json({
    username: query,
    checks,
  });
}
