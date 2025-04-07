export function revealElements() {
  const revealElements = document.querySelectorAll(".toReveal");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observerCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}
