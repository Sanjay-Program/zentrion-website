export async function onRequestGet({ request }: { request: Request }) {
  const query = new URL(request.url).searchParams.get('query')?.trim() || '';

  if (!query) {
    return Response.json({ error: 'Please provide a username.' }, { status: 400 });
  }

  const sites = [
    { name: 'GitHub', url: `https://github.com/${query}`, testUrl: `https://github.com/${query}` },
    { name: 'Twitter', url: `https://twitter.com/${query}`, testUrl: `https://twitter.com/${query}` },
    { name: 'Instagram', url: `https://instagram.com/${query}`, testUrl: `https://instagram.com/${query}` },
    { name: 'Reddit', url: `https://reddit.com/user/${query}`, testUrl: `https://www.reddit.com/user/${query}/about.json` },
    { name: 'YouTube', url: `https://youtube.com/@${query}`, testUrl: `https://youtube.com/@${query}` },
    { name: 'TikTok', url: `https://tiktok.com/@${query}`, testUrl: `https://tiktok.com/@${query}` },
    { name: 'Pinterest', url: `https://pinterest.com/${query}`, testUrl: `https://pinterest.com/${query}` },
    { name: 'Medium', url: `https://medium.com/@${query}`, testUrl: `https://medium.com/@${query}` },
    { name: 'HackerNews', url: `https://news.ycombinator.com/user?id=${query}`, testUrl: `https://news.ycombinator.com/user?id=${query}` },
    { name: 'Vimeo', url: `https://vimeo.com/${query}`, testUrl: `https://vimeo.com/${query}` },
    { name: 'SoundCloud', url: `https://soundcloud.com/${query}`, testUrl: `https://soundcloud.com/${query}` },
    { name: 'GitLab', url: `https://gitlab.com/${query}`, testUrl: `https://gitlab.com/${query}` },
    { name: 'Twitch', url: `https://twitch.tv/${query}`, testUrl: `https://twitch.tv/${query}` },
    { name: 'Patreon', url: `https://patreon.com/${query}`, testUrl: `https://patreon.com/${query}` },
    { name: 'ProductHunt', url: `https://producthunt.com/@${query}`, testUrl: `https://producthunt.com/@${query}` },
    { name: 'Linktree', url: `https://linktr.ee/${query}`, testUrl: `https://linktr.ee/${query}` },
    { name: 'Flickr', url: `https://flickr.com/people/${query}`, testUrl: `https://flickr.com/people/${query}` },
    { name: 'Blogger', url: `https://${query}.blogspot.com/`, testUrl: `https://${query}.blogspot.com/` },
    { name: 'Dev.to', url: `https://dev.to/${query}`, testUrl: `https://dev.to/${query}` },
    { name: 'CodePen', url: `https://codepen.io/${query}`, testUrl: `https://codepen.io/${query}` },
    { name: 'Kaggle', url: `https://kaggle.com/${query}`, testUrl: `https://kaggle.com/${query}` },
    { name: 'LeetCode', url: `https://leetcode.com/${query}`, testUrl: `https://leetcode.com/${query}` },
    { name: 'HackTheBox', url: `https://app.hackthebox.com/users/${query}`, testUrl: `https://app.hackthebox.com/users/${query}` },
    { name: 'TryHackMe', url: `https://tryhackme.com/p/${query}`, testUrl: `https://tryhackme.com/p/${query}` },
    { name: 'BuyMeACoffee', url: `https://buymeacoffee.com/${query}`, testUrl: `https://buymeacoffee.com/${query}` },
    { name: 'Gravatar', url: `https://en.gravatar.com/${query}`, testUrl: `https://en.gravatar.com/${query}` },
    { name: 'Behance', url: `https://behance.net/${query}`, testUrl: `https://behance.net/${query}` },
    { name: 'Dribbble', url: `https://dribbble.com/${query}`, testUrl: `https://dribbble.com/${query}` },
    { name: 'Spotify', url: `https://open.spotify.com/user/${query}`, testUrl: `https://open.spotify.com/user/${query}` },
    { name: 'Keybase', url: `https://keybase.io/${query}`, testUrl: `https://keybase.io/${query}` },
    { name: 'Pastebin', url: `https://pastebin.com/u/${query}`, testUrl: `https://pastebin.com/u/${query}` },
    { name: 'Wattpad', url: `https://wattpad.com/user/${query}`, testUrl: `https://wattpad.com/user/${query}` },
    { name: 'Goodreads', url: `https://goodreads.com/${query}`, testUrl: `https://goodreads.com/${query}` },
    { name: 'Quora', url: `https://quora.com/profile/${query}`, testUrl: `https://quora.com/profile/${query}` },
    { name: 'TripAdvisor', url: `https://tripadvisor.com/Profile/${query}`, testUrl: `https://tripadvisor.com/Profile/${query}` },
    { name: 'Steam', url: `https://steamcommunity.com/id/${query}`, testUrl: `https://steamcommunity.com/id/${query}` },
    { name: 'Giphy', url: `https://giphy.com/channel/${query}`, testUrl: `https://giphy.com/channel/${query}` },
    { name: 'BoredPanda', url: `https://boredpanda.com/author/${query}`, testUrl: `https://boredpanda.com/author/${query}` },
    { name: 'Roblox', url: `https://roblox.com/user.aspx?username=${query}`, testUrl: `https://roblox.com/user.aspx?username=${query}` },
    { name: 'Trello', url: `https://trello.com/${query}`, testUrl: `https://trello.com/${query}` },
    { name: 'Slideshare', url: `https://slideshare.net/${query}`, testUrl: `https://slideshare.net/${query}` },
    { name: 'Replit', url: `https://replit.com/@${query}`, testUrl: `https://replit.com/@${query}` },
    { name: 'Gitea', url: `https://gitea.com/${query}`, testUrl: `https://gitea.com/${query}` },
    { name: 'BitBucket', url: `https://bitbucket.org/${query}/`, testUrl: `https://bitbucket.org/${query}/` },
    { name: 'Codecademy', url: `https://codecademy.com/profiles/${query}`, testUrl: `https://codecademy.com/profiles/${query}` },
    { name: 'HackerEarth', url: `https://hackerearth.com/@${query}`, testUrl: `https://hackerearth.com/@${query}` },
    { name: 'Kik', url: `https://ws2.kik.com/user/${query}`, testUrl: `https://ws2.kik.com/user/${query}` },
    { name: 'VSCO', url: `https://vsco.co/${query}`, testUrl: `https://vsco.co/${query}` },
    { name: 'Substack', url: `https://${query}.substack.com`, testUrl: `https://${query}.substack.com` },
    { name: 'Tumblr', url: `https://${query}.tumblr.com`, testUrl: `https://${query}.tumblr.com` },
  ];

  try {
    const checkUsername = async (site: any) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      try {
        const res = await fetch(site.testUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        let status = 'Unknown';
        if (res.status === 200 || res.status === 301 || res.status === 302) status = 'Found';
        else if (res.status === 404) status = 'Not Found';
        else if (res.status === 403 || res.status === 401) status = 'Blocked / Rate Limited';
        
        return { site: site.name, url: site.url, status };
      } catch (err: any) {
        clearTimeout(timeoutId);
        return { site: site.name, url: site.url, status: err.name === 'AbortError' ? 'Timeout' : 'Error' };
      }
    };

    // Execute all 50 checks concurrently
    const results = await Promise.all(sites.map(checkUsername));

    // Sort to put 'Found' at the top
    results.sort((a, b) => {
        if (a.status === 'Found' && b.status !== 'Found') return -1;
        if (b.status === 'Found' && a.status !== 'Found') return 1;
        return 0;
    });

    return Response.json({
      valid: true,
      username: query,
      total_checked: sites.length,
      found_count: results.filter(r => r.status === 'Found').length,
      results: results,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return Response.json({ error: error.message || 'Failed to check usernames.' }, { status: 500 });
  }
}
