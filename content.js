function editElementsByClass(className, callback) {
  document.querySelectorAll(`.${className}`).forEach(callback);
}

function editElementsByTestId(testId, callback) {
  document.querySelectorAll(`[data-test-id="${testId}"]`).forEach(callback);
}

function htmlToElement(html) {
  const doc = new DOMParser().parseFromString(html.trim(), "text/html");
  return doc.body.firstElementChild;
}

function applyEdits() {
  const inputText = document.querySelector('.search-form__input').value;

  const navigationItem = `<li data-test-id="search-navigation-item-custom" role="none" class="search-navigation__bar-item" data-v-8e91de8d=""><a role="menuitem" href="https://google.com/search?q=${inputText}" aria-label="News" data-test-id="search-navigation-news" as="a" variant="bare" class="button search-navigation__bar-link button base-button base-button--variant-bare base-button--size-s base-button--elevation-0 base-button--text-size-s search-navigation__bar-link button button--icon-position-start" data-v-3f81533f="" data-v-8e91de8d="" tabindex="-1"><span class="button__content" data-v-d023ccb5="" data-v-3f81533f=""><!----><!----><span data-test-id="button-text" class="button__text" data-v-d023ccb5=""><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15px" height="15px" viewBox="0 0 15 15" version="1.1"><g id="surface1"><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 11.324219 1.144531 C 12.300781 1.800781 12.300781 1.800781 12.898438 2.699219 C 12.109375 3.492188 11.316406 4.285156 10.5 5.101562 C 10.195312 4.945312 9.894531 4.792969 9.582031 4.628906 C 8.386719 4.125 7.5625 4.125 6.300781 4.5 C 5.246094 5.277344 4.867188 5.769531 4.5 7.03125 C 4.5 8.285156 4.679688 8.878906 5.398438 9.902344 C 6.4375 10.628906 7.015625 10.804688 8.289062 10.78125 C 9.375 10.480469 9.800781 10.167969 10.5 9.300781 C 9.410156 9.300781 8.320312 9.300781 7.199219 9.300781 C 7.199219 8.210938 7.199219 7.121094 7.199219 6 C 9.574219 6 11.953125 6 14.398438 6 C 14.691406 8.632812 14.804688 9.960938 13.324219 12.082031 C 12.074219 13.589844 11.152344 14.308594 9.152344 14.5 C 6.640625 14.527344 4.679688 14.507812 2.777344 12.707031 C 0.996094 10.757812 0.761719 9.039062 0.808594 6.4375 C 0.984375 4.472656 1.691406 3.300781 3.132812 1.988281 C 5.335938 0.160156 8.757812 -0.0859375 11.324219 1.144531 Z M 11.324219 1.144531 "/></g></svg><span class="search-navigation__bar-label" data-v-d023ccb5="" data-v-8e91de8d=""> Go to Google </span></span></span></a></li>`

  editElementsByClass("search-navigation__bar-list", (list) => {
    if (list.querySelector('[data-test-id="search-navigation-item-custom"]')) {
      return;
    }
    list.appendChild(htmlToElement(navigationItem));
  });

  editElementsByTestId("search-navigation-item-images", (el) => {
    el.children[0].href = `https://www.google.com/search?q=${inputText}&sclient=img&udm=2`
  })

  editElementsByClass("result-title", (el) => {
    el.textContent = el.textContent.replace("Ecosia", "Google");
  });
}

applyEdits();

const observer = new MutationObserver(() => applyEdits());
observer.observe(document.body, { childList: true, subtree: true });