const projects = {
  "doce-confeito": {
    kicker: "Projeto 01 / Confeitaria artesanal",
    title: "D Confeito",
    intro:
      "Uma presença digital delicada e editorial para uma confeitaria artesanal que transforma pequenos momentos em grandes memórias.",
    challenge:
      "Traduzir o cuidado do trabalho artesanal para a tela, apresentar as criações com personalidade e facilitar o primeiro contato.",
    solution:
      "Uma composição calorosa, tipografia expressiva e fotografia em destaque criam uma experiência afetiva, elegante e responsiva.",
    delivery:
      "Estrutura de página, direção visual, experiência responsiva e desenvolvimento front-end.",
    url: "https://doce-confeito-site.pages.dev/",
  },
  "barbearia-monteiro": {
    kicker: "Projeto 02 / Barbearia",
    title: "Barbearia Monteiro",
    intro:
      "Um site institucional de presença forte, construído para transmitir profissionalismo e levar o cliente ao agendamento sem distrações.",
    challenge:
      "Comunicar confiança e estilo logo no primeiro contato, destacando o profissional e tornando a reserva de horário simples.",
    solution:
      "Fotografia imersiva, alto contraste e chamadas objetivas criam uma experiência masculina, sofisticada e orientada à conversão.",
    delivery:
      "Conceito visual, UI/UX, adaptação mobile e desenvolvimento da interface.",
    url: "https://barbearia-monteiro-preview.regular-glider.workers.dev/",
  },
};

const dialog = document.querySelector("#project-dialog");
const dialogClose = dialog.querySelector(".dialog-close");
const dialogLink = dialog.querySelector(".dialog-link");

function openProject(projectKey) {
  const project = projects[projectKey];
  if (!project) return;

  dialog.querySelector(".dialog-kicker").textContent = project.kicker;
  dialog.querySelector(".dialog-title").textContent = project.title;
  dialog.querySelector(".dialog-intro").textContent = project.intro;
  dialog.querySelector(".dialog-challenge").textContent = project.challenge;
  dialog.querySelector(".dialog-solution").textContent = project.solution;
  dialog.querySelector(".dialog-delivery").textContent = project.delivery;
  dialogLink.href = project.url;
  dialogLink.style.display = project.url === "#" ? "none" : "flex";

  dialog.showModal();
  document.body.classList.add("dialog-open");
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => openProject(card.dataset.project));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(card.dataset.project);
    }
  });
});

dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  const isOutside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;
  if (isOutside) dialog.close();
});
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const progress = document.querySelector(".page-progress");
window.addEventListener(
  "scroll",
  () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`;
  },
  { passive: true }
);

const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
  card.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
});

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
  });
  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

// Mantém links diretos para seções precisos mesmo com a rolagem suave do site.
window.addEventListener("load", () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;

  document.documentElement.style.scrollBehavior = "auto";
  target.scrollIntoView({ block: "start" });
  target.querySelectorAll(".reveal").forEach((element) =>
    element.classList.add("is-visible")
  );
  document.documentElement.style.removeProperty("scroll-behavior");
});
