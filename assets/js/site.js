document.documentElement.classList.add("js");

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
  { rootMargin: "0px 0px -10% 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Gallery filter
const chips = document.querySelectorAll(".chip");
chips.forEach((chip) =>
  chip.addEventListener("click", () => {
    const f = chip.dataset.filter;
    chips.forEach((c) => {
      c.classList.toggle("is-on", c === chip);
      c.setAttribute("aria-pressed", c === chip);
    });
    document.querySelectorAll(".grid figure").forEach((fig) => (fig.hidden = f !== "all" && fig.dataset.cat !== f));
  })
);

// Analytics: count the leads that matter. WhatsApp and phone taps are the site's conversions.
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (!a) return;
  const method = a.href.includes("whatsapp.com") ? "whatsapp" : a.href.startsWith("tel:") ? "phone" : null;
  if (method) gtag("event", "generate_lead", { method, link_text: a.textContent.trim().slice(0, 60) });
});
chips.forEach((chip) =>
  chip.addEventListener("click", () => gtag("event", "select_content", { content_type: "gallery_filter", item_id: chip.dataset.filter }))
);
