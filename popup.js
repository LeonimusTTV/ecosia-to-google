const activeEl = document.getElementById("status-active");
const idleEl = document.getElementById("status-idle");

idleEl.addEventListener("click", () => {
  chrome.tabs.create({ url: "https://www.ecosia.org/" });
  window.close();
});

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  const isEcosia = !!tab?.url && /^https:\/\/www\.ecosia\.org\//.test(tab.url);
  activeEl.hidden = !isEcosia;
  idleEl.hidden = isEcosia;
});
