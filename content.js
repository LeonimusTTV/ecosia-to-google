function editElementsByClass(className, callback) {
  document.querySelectorAll(`.${className}`).forEach(callback);
}

function editElementsByType(testId, type, callback) {
  document.querySelectorAll(`[${type}="${testId}"]`).forEach(callback);
}

function htmlToElement(html) {
  const doc = new DOMParser().parseFromString(html.trim(), "text/html");
  return doc.body.firstElementChild;
}

function applyEdits() {
  const hostname = window.location.hostname;
  if (hostname === null || hostname === undefined) return;

  if (hostname === "www.ecosia.org") {
    ecosiaEdits();
  } else {
    googleEdits();
  }
}

function ecosiaEdits() {
  const inputText = document.querySelector('.search-form__input')?.value;
  if (!inputText) return;

  // take the new item, duplicate it for Google search link
  // search-navigation-item-news
  const googleSearchUrl = `https://google.com/search?q=${encodeURIComponent(inputText)}`;
  const googleLogoSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15px" height="15px" viewBox="0 0 15 15" version="1.1"><g id="surface1"><path style=" stroke:none;fill-rule:nonzero;fill:currentColor;" d="M 11.324219 1.144531 C 12.300781 1.800781 12.300781 1.800781 12.898438 2.699219 C 12.109375 3.492188 11.316406 4.285156 10.5 5.101562 C 10.195312 4.945312 9.894531 4.792969 9.582031 4.628906 C 8.386719 4.125 7.5625 4.125 6.300781 4.5 C 5.246094 5.277344 4.867188 5.769531 4.5 7.03125 C 4.5 8.285156 4.679688 8.878906 5.398438 9.902344 C 6.4375 10.628906 7.015625 10.804688 8.289062 10.78125 C 9.375 10.480469 9.800781 10.167969 10.5 9.300781 C 9.410156 9.300781 8.320312 9.300781 7.199219 9.300781 C 7.199219 8.210938 7.199219 7.121094 7.199219 6 C 9.574219 6 11.953125 6 14.398438 6 C 14.691406 8.632812 14.804688 9.960938 13.324219 12.082031 C 12.074219 13.589844 11.152344 14.308594 9.152344 14.5 C 6.640625 14.527344 4.679688 14.507812 2.777344 12.707031 C 0.996094 10.757812 0.761719 9.039062 0.808594 6.4375 C 0.984375 4.472656 1.691406 3.300781 3.132812 1.988281 C 5.335938 0.160156 8.757812 -0.0859375 11.324219 1.144531 Z M 11.324219 1.144531 "/></g></svg>'

  const newsItem = document.querySelector('[data-test-id="search-navigation-item-news"]');

  // The News icon is loaded asynchronously after Vue re-renders the nav: wait for it so the clone gets an <svg>
  if (!newsItem || !newsItem.querySelector('svg')) return;

  const existing = document.querySelector('[data-test-id="search-navigation-item-custom"]');
  if (existing && !existing.querySelector('svg')) existing.remove();
  else if (existing) {
    // Keep the link in sync if the query changed without a full reload
    const existingLink = existing.querySelector('a');
    if (existingLink && existingLink.href !== googleSearchUrl) existingLink.href = googleSearchUrl;
    return;
  }

  // Deep clone keeps every class and the scoped data-v-* attributes, so the page CSS still applies
  const googleItem = newsItem.cloneNode(true);
  googleItem.setAttribute('data-test-id', 'search-navigation-item-custom');
  googleItem.classList.forEach((c) => { if (/active|selected/.test(c)) googleItem.classList.remove(c); });

  const link = googleItem.querySelector('a');
  if (link) {
    link.href = googleSearchUrl;
    link.setAttribute('aria-label', 'Google');
    link.setAttribute('data-test-id', 'search-navigation-google');
    link.removeAttribute('aria-current');
    link.classList.forEach((c) => { if (/active|selected/.test(c)) link.classList.remove(c); });
  }

  // Swap only the icon content, keeping the original <svg> element (and its attributes/classes)
  const icon = googleItem.querySelector('svg');
  if (icon) {
    const newIcon = htmlToElement(googleLogoSVG);
    icon.setAttribute('viewBox', newIcon.getAttribute('viewBox'));
    icon.innerHTML = newIcon.innerHTML;
  }

  // Replace only the label text
  const label = googleItem.querySelector('.search-navigation__bar-label')
    || googleItem.querySelector('[data-test-id="button-text"]');
  if (label) {
    const textNode = [...label.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
    if (textNode) textNode.textContent = ' Google ';
    else label.textContent = 'Google';
  }

  newsItem.parentNode.appendChild(googleItem);

  editElementsByType("search-navigation-item-images", "data-test-id", (el) => {
    el.children[0].href = `https://www.google.com/search?q=${inputText}&sclient=img&udm=2`
  })
}

function googleEdits() {
  const inputText = document.querySelector('[role="combobox"]').value;
  const menu = document.querySelectorAll('[role="listitem"]');

  // edit the second list item which is the normal web search to point to Ecosia
  if (menu.length > 1) {
    menu[1].children[0].href = `https://www.ecosia.com/search?q=${inputText}`;
  }
}

applyEdits();

const observer = new MutationObserver(() => applyEdits());
observer.observe(document.body, { childList: true, subtree: true });