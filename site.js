const sparkleNamespace = "http://www.andymatuschak.org/xml-namespaces/sparkle";
const releaseOrigin = "https://github.com";
const releasePath = "/uid4oe/tolk-releases/releases";
const stableVersion = /^\d+\.\d+\.\d+$/;

function compareVersion(a, b) {
  const aParts = a.split(".").map(Number);
  const bParts = b.split(".").map(Number);
  return aParts[0] - bParts[0] || aParts[1] - bParts[1] || aParts[2] - bParts[2];
}

async function loadStableRelease() {
  const response = await fetch("appcast.xml");
  if (!response.ok) return;

  const feed = new DOMParser().parseFromString(await response.text(), "text/xml");
  const releases = Array.from(feed.querySelectorAll("rss > channel > item"), item => {
    const field = name => item.getElementsByTagNameNS(sparkleNamespace, name)[0]?.textContent.trim();
    return {
      channel: field("channel"),
      version: field("shortVersionString"),
      minimum: field("minimumSystemVersion"),
      installer: item.querySelector("enclosure")?.getAttribute("url"),
      description: item.querySelector("description")?.textContent ?? "",
    };
  });

  const release = releases
    .filter(item => !item.channel && stableVersion.test(item.version))
    .sort((a, b) => compareVersion(b.version, a.version))[0];
  if (!release) return;

  const expectedInstaller = releaseOrigin + releasePath + "/download/v" + release.version + "/tolk-" + release.version + ".dmg";
  if (release.installer !== expectedInstaller) return;

  document.querySelectorAll("[data-download]").forEach(link => { link.href = expectedInstaller; });
  document.querySelectorAll("[data-release]").forEach(link => { link.href = releaseOrigin + releasePath + "/tag/v" + release.version; });
  document.querySelectorAll("[data-version]").forEach(label => {
    label.textContent = "v" + release.version;
    label.hidden = false;
  });
  if (/^\d+(?:\.\d+)*$/.test(release.minimum)) {
    document.querySelectorAll("[data-minimum]").forEach(label => {
      label.textContent = release.minimum.replace(/\.0$/, "");
    });
  }
  const highlights = release.description.split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => /^[-*] /.test(line))
    .slice(0, 3);
  if (highlights.length) {
    const summary = document.querySelector("[data-summary]");
    const list = summary.querySelector("ul");
    for (const highlight of highlights) {
      const item = document.createElement("li");
      item.textContent = highlight.slice(2);
      list.append(item);
    }
    summary.hidden = false;
  }
}

loadStableRelease().catch(() => {
  // The links to GitHub Releases remain available if the feed cannot load.
});
