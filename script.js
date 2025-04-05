// === Variabili globali ===
let canoneMensileBase = 0;
let setupFeeBase = 0;
let tabletCosto = 0;
let lettoreCosto = 0;

// === Prezzi base ===
const prezzi = {
  starter: {
    solo: [109, 99, 89, 69, 59, 49, 29, 19],
    crm: [119, 109, 99, 79, 69, 59, 39, 29]
  },
  plus: {
    solo: [129, 119, 109, 89, 69, 59, 49, 39],
    crm: [139, 129, 119, 99, 79, 69, 59, 49]
  },
  vip: {
    solo: [139, 129, 119, 99, 79, 69, 59, 49],
    crm: [149, 139, 129, 109, 89, 79, 69, 59]
  }
};

const setup = [99, 119, 129, 149, 199, 299, 499, 899];
const soglie = [1, 2, 4, 6, 8, 10, 15, 20];

// === Utility ===
function getIndiceStanze(stanze) {
  for (let i = 0; i < soglie.length; i++) {
    if (stanze <= soglie[i]) return i;
  }
  return soglie.length - 1;
}

// === Eventi iniziali ===
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calculate-btn").addEventListener("click", calcolaPreventivo);
  document.getElementById("check-btn").addEventListener("click", startPromoCheck);
});

// === Calcolo preventivo base ===
function calcolaPreventivo() {
  const stanze = parseInt(document.getElementById("rooms").value);
  const medici = parseInt(document.getElementById("doctors").value);
  const bundle = document.getElementById("bundle").value;
  const crm = document.getElementById("crm").checked;
  const tablet = document.getElementById("tabletFirma").checked;
  const lettore = document.getElementById("lettoreTessera").checked;

  if (isNaN(stanze) || isNaN(medici) || stanze <= 0 || medici <= 0) {
    alert("Inserisci valori validi per ambulatori e medici.");
    return;
  }

  const idx = getIndiceStanze(stanze);
  let prezzoUnitario = prezzi[bundle][crm ? "crm" : "solo"][idx];

  if ((medici / stanze) <= 1.3) {
    prezzoUnitario = prezzoUnitario / 1.5;
  }

  canoneMensileBase = prezzoUnitario * stanze;
  setupFeeBase = setup[idx];
  tabletCosto = tablet ? 429 : 0;
  lettoreCosto = lettore ? 79 : 0;

  const canoneListino = canoneMensileBase * 1.25;
  const setupListino = setupFeeBase * 1.25;
  const totaleListino = setupListino + tabletCosto + lettoreCosto;

  // Mostra pannello listino
  document.getElementById("monthly-list-price").textContent = `${canoneListino.toFixed(2)} €`;
  document.getElementById("setup-list-price").textContent = `${setupListino.toFixed(2)} €`;
  document.getElementById("setup-total").textContent = `${totaleListino.toFixed(2)} €`;

  document.getElementById("listino-panel").classList.remove("hidden");
  document.getElementById("loading-spinner").classList.add("hidden");
  document.getElementById("dettaglio-panel").classList.add("hidden");

  // 🔽 Scroll automatico
  document.getElementById("listino-panel").scrollIntoView({ behavior: "smooth" });
}

// === Verifica condizioni riservate ===
function startPromoCheck() {
  const spinner = document.getElementById("loading-spinner");
  const promoPanel = document.getElementById("dettaglio-panel");
  const countdown = document.getElementById("countdown");
  const checkBtn = document.getElementById("check-btn");

  // Mostra spinner ECG
  spinner.classList.remove("hidden");
  promoPanel.classList.add("hidden");

  // 🔽 Scroll automatico verso ECG
  spinner.scrollIntoView({ behavior: "smooth" });

  // Disabilita pulsante verifica
  checkBtn.disabled = true;

  let seconds = 15;
  countdown.textContent = `Attendere ${seconds} secondi…`;

  const interval = setInterval(() => {
    seconds--;
    countdown.textContent = `Attendere ${seconds} secondi…`;

    if (seconds <= 0) {
      clearInterval(interval);
      spinner.classList.add("hidden");
      promoPanel.classList.remove("hidden");

      // Sblocca pulsante per eventuali riutilizzi
      checkBtn.disabled = false;

      // Calcoli offerta reale
      const setupTotalePromo = setupFeeBase + tabletCosto + lettoreCosto;
      const canoneListino = canoneMensileBase * 1.25;
      const setupListino = setupFeeBase * 1.25;

      document.getElementById("default-monthly-price").textContent = `${canoneMensileBase.toFixed(2)} €`;
      document.getElementById("setup-fee").textContent = `${setupFeeBase.toFixed(2)} €`;

      document.getElementById("list-monthly-crossed").textContent = `${canoneListino.toFixed(2)} €`;
      document.getElementById("list-setup-crossed").textContent = `${setupListino.toFixed(2)} €`;

      // 🔽 Scroll verso offerta
      promoPanel.scrollIntoView({ behavior: "smooth" });
    }
  }, 1000);
}
