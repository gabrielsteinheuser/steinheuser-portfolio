const projects = {
  "arena-viva-equipe": {
    kicker: "Projeto 03 / Desenvolvimento em equipe",
    title: "Arena Viva",
    intro: "Projeto de reservas para arenas esportivas desenvolvido em colaboração com gDorigon.",
    challenge: "Organizar o agendamento de quadras e facilitar a gestão de reservas esportivas.",
    solution: "Desenvolvimento colaborativo de uma solução voltada à rotina de arenas.",
    delivery: "Fluxo de reservas, organização das informações e desenvolvimento colaborativo da experiência.",
    technologies: "HTML, CSS, JavaScript e Git",
    timeline: "Projeto em evolução",
    result: "A proposta busca simplificar o agendamento de quadras e reduzir a organização manual das reservas.",
    url: "https://github.com/gabrielsteinheuser/arena-viva",
    linkLabel: "Ver prévia técnica",
    images: null,
  },
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
    technologies: "HTML, CSS e JavaScript",
    timeline: "Projeto publicado e responsivo",
    result: "Organiza a apresentação dos produtos e cria um caminho direto da descoberta para novos pedidos.",
    url: "https://doce-confeito-site.pages.dev/",
    images: {
      desktop: "assets/projects/doce-confeito-desktop.jpg",
      mobile: "assets/projects/doce-confeito-mobile.jpg",
      desktopAlt: "Página inicial do site D Confeito em um computador",
      mobileAlt: "Página inicial do site D Confeito em um celular",
    },
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
    technologies: "HTML, CSS e JavaScript",
    timeline: "Projeto publicado e responsivo",
    result: "Aproxima descoberta e agendamento, tornando o próximo passo evidente para quem procura o serviço.",
    url: "https://barbearia-monteiro-preview.regular-glider.workers.dev/",
    images: {
      desktop: "assets/projects/barbearia-monteiro-desktop.jpg",
      mobile: "assets/projects/barbearia-monteiro-mobile.jpg",
      desktopAlt: "Página inicial da Barbearia Monteiro em um computador",
      mobileAlt: "Página inicial da Barbearia Monteiro em um celular",
    },
  },
};

const dialog = document.querySelector("#project-dialog");
const dialogClose = dialog.querySelector(".dialog-close");
const dialogLink = dialog.querySelector(".dialog-link");
const dialogQuote = dialog.querySelector(".dialog-quote");
const dialogGallery = dialog.querySelector(".dialog-gallery");
const dialogDesktopImage = dialog.querySelector(".dialog-shot-desktop img");
const dialogMobileImage = dialog.querySelector(".dialog-shot-mobile img");

function openProject(projectKey) {
  const project = projects[projectKey];
  if (!project) return;

  dialog.querySelector(".dialog-kicker").textContent = project.kicker;
  dialog.querySelector(".dialog-title").textContent = project.title;
  dialog.querySelector(".dialog-intro").textContent = project.intro;
  dialog.querySelector(".dialog-challenge").textContent = project.challenge;
  dialog.querySelector(".dialog-solution").textContent = project.solution;
  dialog.querySelector(".dialog-delivery").textContent = project.delivery;
  dialog.querySelector(".dialog-technologies").textContent = project.technologies;
  dialog.querySelector(".dialog-timeline").textContent = project.timeline;
  dialog.querySelector(".dialog-result").textContent = project.result;
  dialogLink.href = project.url;
  dialogLink.firstChild.textContent = `${project.linkLabel || "Visitar projeto"} `;
  dialogLink.style.display = project.url === "#" ? "none" : "flex";
  dialogLink.dataset.project = projectKey;

  const quoteText = `Olá, Gabriel! Vi o projeto ${project.title} no seu portfólio e gostaria de solicitar um orçamento para algo parecido.`;
  dialogQuote.href = `https://wa.me/5543996036236?text=${encodeURIComponent(quoteText)}`;
  dialogQuote.dataset.project = projectKey;

  if (project.images) {
    dialogGallery.hidden = false;
    dialogDesktopImage.src = project.images.desktop;
    dialogDesktopImage.alt = project.images.desktopAlt;
    dialogMobileImage.src = project.images.mobile;
    dialogMobileImage.alt = project.images.mobileAlt;
  } else {
    dialogGallery.hidden = true;
    dialogDesktopImage.removeAttribute("src");
    dialogDesktopImage.alt = "";
    dialogMobileImage.removeAttribute("src");
    dialogMobileImage.alt = "";
  }

  dialog.showModal();
  document.body.classList.add("dialog-open");
  trackEvent("project_open", { project: projectKey });
}

function trackEvent(eventName, details = {}) {
  const payload = JSON.stringify({
    event: eventName,
    path: window.location.pathname,
    project: details.project || "",
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/events", new Blob([payload], { type: "application/json" }));
    return;
  }

  fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => openProject(card.dataset.project));
  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openProject(card.dataset.project);
  });
});

document.addEventListener("click", (event) => {
  const trackedElement = event.target.closest("[data-track]");
  if (trackedElement) {
    trackEvent(trackedElement.dataset.track, {
      project: trackedElement.dataset.project || "",
    });
  }
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
trackEvent("page_view");

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
