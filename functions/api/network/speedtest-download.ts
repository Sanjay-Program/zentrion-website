export async function onRequestGet(context: any) {
  const url = new URL(context.request.url);
  const sizeMb = parseInt(url.searchParams.get('size') || '5', 10);
  
  // Bound the size between 1MB and 25MB
  const clampedSize = Math.max(1, Math.min(25, sizeMb));
  const totalBytes = clampedSize * 1024 * 1024;

  const chunkSize = 65536;
  const chunk = new Uint8Array(chunkSize);
  crypto.getRandomValues(chunk);

  const stream = new ReadableStream({
    start(controller) {
      let bytesSent = 0;
      function push() {
        if (bytesSent >= totalBytes) {
          controller.close();
          return;
        }
        const sendSize = Math.min(chunkSize, totalBytes - bytesSent);
        controller.enqueue(chunk.slice(0, sendSize));
        bytesSent += sendSize;
        // Small delay to allow yielding and prevent blocking the worker event loop
        setTimeout(push, 0); 
      }
      push();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Access-Control-Allow-Origin': '*',
      'Content-Length': totalBytes.toString()
    }
  });
}
