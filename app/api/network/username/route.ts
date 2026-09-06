import { NextResponse } from 'next/server';

const platforms = [
  { name: 'GitHub', url: (u: string) => `https://github.com/${u}` },
  { name: 'X', url: (u: string) => `https://x.com/${u}` },
  { name: 'Instagram', url: (u: string) => `https://www.instagram.com/${u}/` },
  { name: 'Reddit', url: (u: string) => `https://www.reddit.com/user/${u}/` },
  { name: 'Medium', url: (u: string) => `https://medium.com/@${u}` },
  { name: 'Dev.to', url: (u: string) => `https://dev.to/${u}` },
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
      const url = platform.url(query);
      try {
        const response = await fetch(url, {
          method: 'GET',
          redirect: 'manual',
          signal: AbortSignal.timeout(6000),
        });

        if (response.status === 404) {
          return { platform: platform.name, url, status: 'available', statusCode: 404 };
        }

        if (response.status >= 200 && response.status < 400) {
          return { platform: platform.name, url, status: 'taken', statusCode: response.status };
        }

        return { platform: platform.name, url, status: 'unknown', statusCode: response.status };
      } catch {
        return { platform: platform.name, url, status: 'unknown', statusCode: null };
      }
    })
  );

  return NextResponse.json({ username: query, checks });
}
