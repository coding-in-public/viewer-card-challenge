const fadeables = document.querySelectorAll(".fade-up");

const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("faded");
      fadeObs.unobserve(e.target);
    }
  });
});

fadeables.forEach((f) => fadeObs.observe(f));
