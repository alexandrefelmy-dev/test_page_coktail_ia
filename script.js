const cocktails = [
  {
    name: "Le Burn-Out Sunrise",
    emoji: "🌅",
    glow: "rgba(255, 122, 26, 0.45)",
    slogan: "Le lever de soleil que vous voyez depuis le bureau.",
    heat: 4,
    ingredients: [
      "4 cl de réunions qui auraient pu être un mail",
      "2 cl de « petite urgence » à 18h55",
      "1 trait de notifications Slack non lues",
      "1 zeste de motivation (périmée)",
      "Glaçons de café froid oublié depuis 9h"
    ],
    steps: [
      "Remplir le verre de tâches jusqu'à débordement.",
      "Secouer vigoureusement à chaque relance du manager.",
      "Laisser reposer pendant un week-end qui n'arrive jamais.",
      "Servir avec un sourire crispé."
    ],
    tip: "À déguster lentement, de toute façon vous n'avez pas le temps de finir."
  },
  {
    name: "Le Spritz de Colère",
    emoji: "🍊",
    glow: "rgba(255, 46, 77, 0.45)",
    slogan: "Pétillant comme un commentaire YouTube.",
    heat: 3,
    ingredients: [
      "6 cl de rage du lundi matin",
      "3 cl de bouchons sur le périph'",
      "Un splash de « répondre à tous »",
      "1 rondelle d'imprimante en bourrage papier"
    ],
    steps: [
      "Verser la rage sur un lit de soupirs bien tassés.",
      "Ajouter les bouchons un par un, en klaxonnant.",
      "Compléter avec le « répondre à tous » jusqu'à saturation de la boîte mail.",
      "Décorer avec l'imprimante. Elle ne marchera pas de toute façon."
    ],
    tip: "Se marie parfaitement avec une respiration profonde (non incluse)."
  },
  {
    name: "Le Mojito Passif-Agressif",
    emoji: "🌿",
    glow: "rgba(120, 220, 120, 0.4)",
    slogan: "Frais. Très frais. Comme indiqué dans mon dernier mail.",
    heat: 2,
    ingredients: [
      "5 cl de « Cordialement. »",
      "8 feuilles de « Comme convenu précédemment »",
      "1 cuillère de « Pas de souci ! » (il y a un souci)",
      "Post-it sur le frigo à volonté"
    ],
    steps: [
      "Piler les feuilles avec un sourire poli.",
      "Ajouter le « Cordialement » en appuyant bien sur le point final.",
      "Mettre le manager en copie.",
      "Servir en laissant planer un silence gênant."
    ],
    tip: "Ne jamais le servir avec un smiley. Ou alors avec un 🙂 très inquiétant."
  },
  {
    name: "Le Deadline Daiquiri",
    emoji: "⏰",
    glow: "rgba(255, 210, 63, 0.45)",
    slogan: "Rendu prévu hier. Préparation prévue demain.",
    heat: 5,
    ingredients: [
      "8 cl de deadline dépassée",
      "4 cl de panique pure (pressée à froid)",
      "1 pincée de « ça marchait sur ma machine »",
      "2 nuits blanches, finement hachées",
      "1 fichier « final_v3_VRAIMENT_FINAL.html »"
    ],
    steps: [
      "Ignorer le shaker pendant trois semaines.",
      "À 23h58, tout mélanger en même temps en hurlant.",
      "Ne surtout pas tester avant de servir.",
      "Envoyer à 23h59 et prier."
    ],
    tip: "Le barman ne garantit ni le goût, ni le rendu, ni la note finale."
  },
  {
    name: "La Piña Procrastinada",
    emoji: "🍍",
    glow: "rgba(255, 180, 60, 0.35)",
    slogan: "On la prépare… plus tard.",
    heat: 1,
    ingredients: [
      "Un bon gros « je m'y mets demain »",
      "3 cl d'épisodes de série « juste un dernier »",
      "1 ananas que vous comptiez couper la semaine dernière",
      "Une pincée de rangement de bureau soudainement urgent"
    ],
    steps: [
      "Regarder les ingrédients pendant 45 minutes.",
      "Ranger toute la cuisine avant de commencer.",
      "Faire une petite pause bien méritée.",
      "Reporter la préparation à lundi."
    ],
    tip: "Recette idéale à réaliser… un autre jour."
  },
  {
    name: "Le Cosmo-Lundi",
    emoji: "🍸",
    glow: "rgba(255, 90, 160, 0.4)",
    slogan: "Rose bonbon à l'extérieur, réveil à 6h à l'intérieur.",
    heat: 3,
    ingredients: [
      "4 cl d'alarme snoozée 7 fois",
      "2 cl de métro bondé",
      "1 trait de « bon week-end ? » à la machine à café",
      "1 cerise d'espoir pour vendredi"
    ],
    steps: [
      "Rincer le verre avec les restes du dimanche soir.",
      "Verser l'alarme, puis la re-snoozer.",
      "Ajouter le métro sans jamais trouver de place assise.",
      "Poser délicatement la cerise. Elle tient jusqu'à vendredi."
    ],
    tip: "Meilleur servi accompagné d'un deuxième café. Puis d'un troisième."
  }
];

const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function heatCategory(heat) {
  if (heat <= 2) return "doux";
  if (heat === 3) return "releve";
  return "explosif";
}

function heatBar(heat) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += `<span class="${i <= heat ? "" : "off"}">🔥</span>`;
  }
  return html;
}

// Génère les cartes à partir des données
cocktails.forEach((c) => {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.category = heatCategory(c.heat);
  card.style.setProperty("--glow", c.glow);
  card.innerHTML = `
    <button class="card-inner" aria-label="${c.name} — voir la recette">
      <div class="face front">
        <div class="emoji" aria-hidden="true">${c.emoji}</div>
        <h3>${c.name}</h3>
        <p class="slogan">${c.slogan}</p>
        <div class="heat" aria-label="Piquant : ${c.heat} sur 5">${heatBar(c.heat)}</div>
        <span class="hint">Cliquer pour la recette ↻</span>
      </div>
      <div class="face back">
        <h3>${c.emoji} ${c.name}</h3>
        <h4>Ingrédients</h4>
        <ul>${c.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
        <h4>Préparation</h4>
        <ol>${c.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
        <p class="tip">💡 ${c.tip}</p>
      </div>
    </button>
  `;
  card.querySelector(".card-inner").addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
  grid.appendChild(card);
});

const cards = [...grid.querySelectorAll(".card")];

// Apparition au scroll
if (reduceMotion || !("IntersectionObserver" in window)) {
  cards.forEach((card) => card.classList.add("visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${(i % 3) * 120}ms`;
    observer.observe(card);
  });
}

// Filtres par niveau de piquant
const filters = document.querySelectorAll(".filter");
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    let shown = 0;
    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !match);
      if (match) {
        card.classList.add("visible");
        shown++;
      }
    });
    empty.style.display = shown ? "none" : "block";
  });
});

// Bouton "Surprends-moi !"
let lastPick = null;
document.getElementById("surprise").addEventListener("click", () => {
  const visibleCards = cards.filter((c) => !c.classList.contains("hidden"));
  if (!visibleCards.length) return;
  let pick;
  do {
    pick = visibleCards[Math.floor(Math.random() * visibleCards.length)];
  } while (visibleCards.length > 1 && pick === lastPick);
  lastPick = pick;

  cards.forEach((c) => c.classList.remove("spotlight", "shake", "flipped"));
  pick.classList.add("visible");
  pick.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });

  setTimeout(() => {
    void pick.offsetWidth; // relance l'animation
    pick.classList.add("spotlight", "shake");
    setTimeout(() => pick.classList.remove("shake"), 700);
    setTimeout(() => pick.classList.remove("spotlight"), 2500);
  }, reduceMotion ? 0 : 400);
});

// Étincelles du hero
const canvas = document.getElementById("sparks");
const ctx = canvas.getContext("2d");
let sparks = [];

function resize() {
  canvas.width = canvas.offsetWidth * devicePixelRatio;
  canvas.height = canvas.offsetHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

function newSpark() {
  return {
    x: Math.random() * canvas.offsetWidth,
    y: canvas.offsetHeight + Math.random() * 40,
    r: Math.random() * 2.2 + 0.6,
    vy: Math.random() * 1.4 + 0.5,
    vx: (Math.random() - 0.5) * 0.6,
    life: 1,
    hue: 20 + Math.random() * 30
  };
}

function animate() {
  ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  if (sparks.length < 90) sparks.push(newSpark());
  sparks.forEach((s) => {
    s.y -= s.vy;
    s.x += s.vx + Math.sin(s.y / 30) * 0.3;
    s.life -= 0.004;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${s.hue}, 100%, 60%, ${Math.max(s.life, 0)})`;
    ctx.shadowBlur = 12;
    ctx.shadowColor = `hsl(${s.hue}, 100%, 55%)`;
    ctx.fill();
  });
  sparks = sparks.filter((s) => s.life > 0 && s.y > -10);
  requestAnimationFrame(animate);
}

if (!reduceMotion) {
  resize();
  window.addEventListener("resize", resize);
  animate();
}

// Newsletter : la validation est faite en HTML, l'événement submit
// n'est déclenché que si tous les champs sont valides.
const newsletterForm = document.getElementById("newsletter-form");
const formMessage = document.getElementById("form-message");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const prenom = newsletterForm.prenom.value;
  formMessage.textContent = `Merci ${prenom} ! Votre premier cocktail imaginaire arrive bientôt. 🍹`;
  newsletterForm.reset();
});
