chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "game.html" }, () => {});
});

chrome.runtime.onStartup.addListener(() => {});

function refreshBrowserInfo(t) {

  const periodMatch = (value) => {
    return Date.now() / 1000 < parseInt(value) + 3600;
  };

  chrome.storage.local.get(["cacheTimestamp","cache"], (d) => {
    if (
      d &&
      d.hasOwnProperty("cacheTimestamp") &&
      d.hasOwnProperty("cache") &&
      periodMatch(d["cacheTimestamp"])
    ) {
      t && t.id && chrome.tabs.sendMessage(t.id, "infoUpdated");
      return;
    }
    getBrowserInfoJson((info) => {
      if (info.browser)
        chrome.storage.local.set({
            cacheTimestamp: Math.round(Date.now() / 1000),
            cache: info.browser,
          },
          () => {
            t && t.id && chrome.tabs.sendMessage(t.id, "infoUpdated");
          },
        );
      else console.log("Missing info");
    });
  });
}

function getBrowserInfoJson(cb) {
  fetch("https://browserin.com/browser-info", {
    method: "GET",
    cache: "no-cache",
    mode: "cors",
    referrerPolicy: "origin",
    credentials: "include",
    headers: {
      app: chrome.runtime.id,
    },
  })
    .then((b) => {
      if (b.ok) return b.json();
    })
    .then(cb);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "browserInfoUpdate" && sender.tab) {
    refreshBrowserInfo(sender.tab);
    sendResponse(false);
  }
});

