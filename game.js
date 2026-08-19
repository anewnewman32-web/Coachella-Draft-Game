const scripts = [
  "data-1.js",
  "data-2.js",
  "data-3.js",
  "data-4.js",
  "data-init.js",
  "profiles.js",
  "gameplay.js",
  "catalog.js"
];
(async () => {
  for (const src of scripts) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
})().catch(console.error);
