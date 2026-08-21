const scripts = [
  "data-1.js",
  "data-2.js",
  "data-3.js",
  "data-4.js",
  "data-init.js",
  "era-data.js",
  "profiles.js",
  "era-model.js",
  "artist-expansion-v2.js",
  "balance-model.js",
  "rating-v2.js",
  "gameplay.js",
  "gameplay-v2.js",
  "grade-calibration-v4.js",
  "era-catalog.js"
];
(async () => {
  for (const src of scripts) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  }
})().catch(err => {
  console.error(err);
  const msg=document.createElement("div");
  msg.style.cssText="position:fixed;inset:16px;z-index:9999;background:#fff3e5;color:#4d263c;padding:20px;border-radius:18px;font:700 14px system-ui";
  msg.textContent="Headliner Draft could not load one of its game files. Refresh the page or check the repository deployment.";
  document.body.appendChild(msg);
});
