// query selectors
const generateBtn = document.querySelector("#generate");
const insertList = document.querySelector("#insert-list");
const cardContainer = document.querySelector("#card-container");
const toastContainer = document.querySelector("#toast-container");

// data
const sayings = [
  "A stitch in time saves nine.",
  "Actions speak louder than words.",
  "Don't judge a book by its cover.",
  "The early bird catches the worm.",
  "Haste makes waste.",
  "Where there's a will, there's a way.",
  "Two wrongs don't make a right.",
  "You reap what you sow.",
  "Hope for the best, prepare for the worst.",
  "A penny saved is a penny earned.",
];

// function calls
function showToast(message) {
  const randoId = crypto.randomUUID();
  toastContainer.insertAdjacentHTML(
    "afterbegin",
    `<li class="toast" id="a${randoId}">${message}</li>`
  );
  const toast = document.querySelector(`#a${randoId}`);

  toast.addEventListener("animationend", () => {
    toast.remove();
  });
}

function getCardHTML(c) {
  return `<article class="card">
  <button aria-label="Remove this result" class="close-btn btn"><svg width="20" height="20" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" fill-rule="evenodd" d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5l3.469-3.468Z" clip-rule="evenodd"/></svg></button>
  <p class="quotation">${c}</p>
  <div class="btn-container">
    <button class="btn btn-insert">Insert</button>
    <button class="btn btn-copy">Copy</button>
  </div>
  </article>`;
}

function generateRandomCards() {
  const cardsHTML = sayings.map(getCardHTML).join("");
  document.startViewTransition(() => {
    cardContainer.insertAdjacentHTML("beforeend", cardsHTML);
  });
}

// event listeners
generateBtn.addEventListener("click", generateRandomCards);
cardContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("close-btn")) {
    document.startViewTransition(() => {
      e.target.closest(".card").remove();
    });
  }
  if (e.target.classList.contains("btn-insert")) {
    const quote = e.target
      .closest(".card")
      .querySelector(".quotation").textContent;
    insertList.insertAdjacentHTML("beforeend", `<li>${quote}</li>`);
    document.startViewTransition(() => {
      e.target.closest(".card").remove();
    });
  }
  if (e.target.classList.contains("btn-copy")) {
    const quote = e.target
      .closest(".card")
      .querySelector(".quotation").textContent;
    await navigator.clipboard.writeText(quote);
    showToast("Quote Copied");
  }
});

// 1. create our own toast library ✅
// 2. popover api 💩
// 3. intersection observer api animations ✅
// 4. view transitions ✅
