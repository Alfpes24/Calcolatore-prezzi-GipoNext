// === Selettori ===
const form = document.getElementById("calculator-form");
const calculateBtn = document.getElementById("calculate-btn");
const checkBtn = document.getElementById("check-btn");

const listinoPanel = document.getElementById("listino-panel");
const loadingPanel = document.getElementById("loading-spinner");
const dettaglioPanel = document.getElementById("dettaglio-panel");

const monthlyListPrice = document.getElementById("monthly-list-price");
const setupListPrice = document.getElementById("setup-list-price");
const setupTotal = document.getElementById("setup-total");

const defaultMonthlyPrice = document.getElementById("default-monthly-price");
const listMonthlyCrossed = document.getElementById("list-monthly-crossed");
const setupFee = document.getElementById("setup-fee");
const listSetupCrossed = document.getElementById("list-setup-crossed");

// === Variabili globali ===
let canoneReale = 0;
let setupReale = 0;
let canoneListino = 0;
let setupListino = 0;

// === Calcolo prezzi ===
function calculatePrices() {
  const rooms = parseInt(document.getElementById("rooms").value, 10);
  const doctors = parseInt(document.getElementById("doctors").value, 10);
  const bundle = document.getElementById("bundle").value;
  const crm = document.getElementById("crm").checked;
  const tablet = document.getElementById("tabletFirma").checked;
  const tessera = document.getElementById("lettoreTessera").checked;

  if (isNaN(rooms) || isNaN(doctors)) return;

  // === Prezzo reale ===
  if (bundle === "starter") canoneReale = 100;
  if (bundle === "plus") canoneReale = 150;
  if (bundle === "vip") canoneReale = 200;

  canoneReale += rooms * 10 + doctors * 5;
  if (crm) canoneReale += 75;

  setupReale = 299;
  if (tablet) setupReale += 429;
  if (tessera) setupReale += 79;

  // === Prezzo maggiorato a listino (+25%)
  canoneListino = canoneReale * 1.25;
  setupListino = setupReale * 1.25;

  // === Mostra prezzi a listino
  monthlyListPrice.textContent = canoneListino.toFixed(2) + " €";
  setupListPrice.textContent = setupListino.toFixed(2) + " €";
  setupTotal.textContent = setupListino.toFixed(2) + " €";

  // === Mostra pannello
  listinoPanel.classList.remove("hidden");
  loadingPanel.classList.add("hidden");
  dettaglioPanel.classList.add("hidden");

  setTimeout(() => {
    listinoPanel.scrollIntoView({ behavior: "smooth" });
  }, 200);
}

// === Countdown 15s ===
function startCountdown() {
  const countdown = document.getElementById("countdown");
  let seconds = 15;
  countdown.textContent = `Attendere ${seconds} secondi…`;

  const timer = setInterval(() => {
    seconds--;
    countdown.textContent = `Attendere ${seconds} secondi…`;
    if (seconds <= 0) {
      clearInterval(timer);
      showPromoPanel();
    }
  }, 1000);
}

// === Barra di caricamento ===
function startProgressBar() {
  const bar = document.getElementById("progressBar");
  let width = 0;
  const interval = setInterval(() => {
    width += 100 / 150;
    if (width >= 100) {
      width = 100;
      clearInterval(interval);
    }
    bar.style.width = width + "%";
  }, 100);
}

// === Mostra offerta riservata ===
function showPromoPanel() {
  loadingPanel.classList.add("hidden");
  dettaglioPanel.classList.remove("hidden");

  const prezzoPromo = canoneReale.toFixed(2); // prezzo reale
  const setupPromo = setupReale.toFixed(2);   // prezzo reale

  defaultMonthlyPrice.textContent = prezzoPromo + " €";
  listMonthlyCrossed.textContent = canoneListino.toFixed(2) + " €";
  setupFee.textContent = setupPromo + " €";
  listSetupCrossed.textContent = setupListino.toFixed(2) + " €";

  setTimeout(() => {
    dettaglioPanel.scrollIntoView({ behavior: "smooth" });
  }, 300);
}

// === Eventi ===
calculateBtn.addEventListener("click", calculatePrices);

checkBtn.addEventListener("click", () => {
  loadingPanel.classList.remove("hidden");
  dettaglioPanel.classList.add("hidden");

  startCountdown();
  startProgressBar();

  setTimeout(() => {
    loadingPanel.scrollIntoView({ behavior: "smooth" });
  }, 300);
});
