import { NextResponse } from 'next/server';

const platforms = [
  {
    name: 'GitHub',
    url: (username: string) => `https://api.github.com/users/${username}`,
    profile: (username: string) => `https://github.com/${username}`,
  },
  {
    name: 'HackerNews',
    url: (username: string) => `https://hacker-news.firebaseio.com/v0/user/${username}.json`,
    profile: (username: string) => `https://news.ycombinator.com/user?id=${username}`,
  },
  {
    name: 'NPM',
    url: (username: string) => `https://registry.npmjs.org/-/user/org.couchdb.user:${username}`,
    profile: (username: string) => `https://www.npmjs.com/~${username}`,
  },
  {
    name: 'Chess.com',
    url: (username: string) => `https://api.chess.com/pub/player/${username}`,
    profile: (username: string) => `https://www.chess.com/member/${username}`,
  },
];

function validUsername(username: string) {
  return /^[a-zA-Z0-9._-]{2,32}$/.test(username);
}

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query')?.trim() || '';

  if (!query || !validUsername(query)) {
    return NextResponse.json({ error: 'Please provide a valid username.' }, { status: 400 });
  }

  const checks = await Promise.all(
    platforms.map(async (platform) => {
      const encoded = encodeURIComponent(query);
      const url = platform.url(encoded);
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { Accept: 'application/json', 'User-Agent': 'zentrion-tools' },
          signal: AbortSignal.timeout(6000),
        });

        let exists = false;
        if (response.status === 200) {
          try {
            const data = await response.json();
            exists = data !== null && !data.error;
          } catch {
            exists = false;
          }
        }

        return {
          platform: platform.name,
          exists,
          status: response.status,
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

  return NextResponse.json({
    username: query,
    checks,
  });
}
