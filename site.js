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
  const response = await fetch("appcast.xml", { cache: "no-cache" });
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

function setUpDemos() {
  const navigation = document.querySelector(".demo-nav");
  const tabs = Array.from(navigation.querySelectorAll("a"));
  const panels = tabs.map(tab => document.getElementById(tab.hash.slice(1)));

  function select(index) {
    tabs.forEach((tab, position) => {
      const active = position === index;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = panels[position];
      if (!active) panel.querySelector("video")?.pause();
      panel.hidden = !active;
    });
  }

  function selectFromLocation() {
    const index = tabs.findIndex(tab => tab.hash === location.hash);
    select(index < 0 ? 0 : index);
  }

  function activate(index) {
    select(index);
    const hash = tabs[index].hash;
    if (location.hash !== hash) history.pushState(null, "", hash);
  }

  navigation.setAttribute("role", "tablist");
  tabs.forEach((tab, index) => {
    const panel = panels[index];
    tab.id = panel.id + "-tab";
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panel.id);
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    panel.tabIndex = 0;
    setUpDemoPlayer(panel.querySelector("video"));

    tab.addEventListener("click", event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      activate(index);
    });

    tab.addEventListener("keydown", event => {
      let next;
      switch (event.key) {
        case "ArrowRight": next = (index + 1) % tabs.length; break;
        case "ArrowLeft": next = (index + tabs.length - 1) % tabs.length; break;
        case "Home": next = 0; break;
        case "End": next = tabs.length - 1; break;
        case " ": next = index; break;
        default: return;
      }
      event.preventDefault();
      activate(next);
      tabs[next].focus();
    });
  });

  selectFromLocation();
  window.addEventListener("hashchange", selectFromLocation);
}

function setUpDemoPlayer(video) {
  const frame = document.createElement("div");
  frame.className = "video-frame";
  video.before(frame);
  frame.append(video);

  const button = document.createElement("button");
  button.className = "demo-play";
  button.type = "button";
  button.textContent = "▶  Play demo";
  frame.append(button);
  video.controls = false;

  button.addEventListener("click", async () => {
    try {
      await video.play();
    } catch {
      video.controls = true;
      return;
    }
    video.controls = true;
    video.focus();
    button.hidden = true;
  });
}

loadStableRelease().catch(() => {
  // The links to GitHub Releases remain available if the feed cannot load.
});
setUpDemos();
