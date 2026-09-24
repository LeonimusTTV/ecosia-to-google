const activeEl = document.getElementById("status-active");
const backEl = document.getElementById("status-back");
const idleEl = document.getElementById("status-idle");

let googleQuery = "";

idleEl.addEventListener("click", () => {
  chrome.tabs.create({ url: "https://www.ecosia.org/" });
  window.close();
});

backEl.addEventListener("click", () => {
  const url = googleQuery
    ? `https://www.ecosia.org/search?q=${encodeURIComponent(googleQuery)}`
    : "https://www.ecosia.org/";
  chrome.tabs.update({ url });
  window.close();
});

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  let url = null;
  try {
    url = tab?.url ? new URL(tab.url) : null;
  } catch {}

  const isEcosia = url?.protocol === "https:" && url.hostname === "www.ecosia.org";
  const isGoogle = url?.protocol === "https:" && url.hostname === "www.google.com";

  if (isGoogle) googleQuery = url.searchParams.get("q") || "";

  activeEl.hidden = !isEcosia;
  backEl.hidden = !isGoogle;
  idleEl.hidden = isEcosia || isGoogle;
});
