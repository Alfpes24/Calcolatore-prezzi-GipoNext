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

let prezzoListino = 0;
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

  // Base canone mensile per bundle
  let canone = 0;
  if (bundle === "starter") canone = 100;
  if (bundle === "plus") canone = 150;
  if (bundle === "vip") canone = 200;

  // Aggiunte per ambulatori e medici
  canone += rooms * 10 + doctors * 5;

  // CRM aggiuntivo
  if (crm) canone += 75;

  // Setup base + optional
  let setup = 299;
  if (tablet) setup += 429;
  if (tessera) setup += 79;

  // Salva i valori numerici per l'offerta riservata
  prezzoListino = canone;
  setupListino = setup;

  // Mostra i prezzi a listino
  monthlyListPrice.textContent = canone.toFixed(2) + " €";
  setupListPrice.textContent = setup.toFixed(2) + " €";
  setupTotal.textContent = setup.toFixed(2) + " €";

  // Mostra il pannello listino
  listinoPanel.classList.remove("hidden");
  loadingPanel.classList.add("hidden");
  dettaglioPanel.classList.add("hidden");

  setTimeout(() => {
    listinoPanel.scrollIntoView({ behavior: "smooth" });
  }, 200);
}

// === Countdown 15 secondi ===
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
    width += 100 / 150; // 150 step in 15 secondi
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

  // Calcola sconti
  const prezzoPromo = (prezzoListino * 0.85).toFixed(2); // -15%
  const setupPromo = (setupListino * 0.7).toFixed(2);     // -30%

  // Mostra offerta
  defaultMonthlyPrice.textContent = prezzoPromo + " €";
  listMonthlyCrossed.textContent = prezzoListino.toFixed(2) + " €";
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
