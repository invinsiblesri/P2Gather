/// <reference path="./youtube.d.ts" />

let apiPromise: Promise<typeof YT> | null = null;

export function loadYouTubeAPI(): Promise<typeof YT> {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<typeof YT>((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }

    const existing = document.querySelector(
      'script[src*="youtube.com/iframe_api"]',
    );
    if (existing) {
      const wait = () => {
        if (window.YT?.Player) resolve(window.YT);
        else setTimeout(wait, 50);
      };
      wait();
      return;
    }

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      if (window.YT) resolve(window.YT);
      else reject(new Error('YouTube IFrame API failed to initialize'));
    };

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.onerror = () => {
      apiPromise = null;
      reject(new Error('Failed to load YouTube IFrame API'));
    };
    document.head.appendChild(script);
  });

  return apiPromise;
}

export async function createYouTubePlayer(
  containerId: string,
  options?: Partial<YT.PlayerOptions>,
): Promise<YT.Player> {
  const yt = await loadYouTubeAPI();

  return new Promise<YT.Player>((resolve, reject) => {
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.style.position = 'fixed';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.style.width = '1px';
      container.style.height = '1px';
      container.style.opacity = '0';
      container.style.pointerEvents = 'none';
      document.body.appendChild(container);
    }

    try {
      const player = new yt.Player(containerId, {
        height: '1',
        width: '1',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          ...options?.playerVars,
        },
        events: {
          onReady: () => resolve(player),
          onError: (e) =>
            reject(new Error(`YouTube player error: ${e.data}`)),
          ...options?.events,
        },
      });
    } catch (err) {
      reject(err);
    }
  });
}
