// Riferimenti agli elementi
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

// Funzione di calcolo dei prezzi
function calculatePrices() {
  const rooms = parseInt(document.getElementById("rooms").value, 10);
  const doctors = parseInt(document.getElementById("doctors").value, 10);
  const bundle = document.getElementById("bundle").value;
  const crm = document.getElementById("crm").checked;
  const tablet = document.getElementById("tabletFirma").checked;
  const tessera = document.getElementById("lettoreTessera").checked;

  if (isNaN(rooms) || isNaN(doctors)) return;

  // Canone base mensile
  let canone = 100 + rooms * 10 + doctors * 5;
  if (bundle === "plus") canone += 50;
  if (bundle === "vip") canone += 100;
  if (crm) canone += 75;

  // Setup una tantum
  let setup = 299;
  if (tablet) setup += 429;
  if (tessera) setup += 79;

  // Totale
  const totaleUnaTantum = setup;

  // Mostra risultati a listino
  monthlyListPrice.textContent = canone.toFixed(2) + " €";
  setupListPrice.textContent = setup.toFixed(2) + " €";
  setupTotal.textContent = totaleUnaTantum.toFixed(2) + " €";

  // Scorri fino al pannello
  listinoPanel.classList.remove("hidden");
  loadingPanel.classList.add("hidden");
  dettaglioPanel.classList.add("hidden");

  setTimeout(() => {
    listinoPanel.scrollIntoView({ behavior: "smooth" });
  }, 200);
}

// Countdown 15s
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

// Barra di caricamento 0 → 100% in 15s
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

// Mostra il pannello con l'offerta riservata
function showPromoPanel() {
  loadingPanel.classList.add("hidden");
  dettaglioPanel.classList.remove("hidden");
  dettaglioPanel.scrollIntoView({ behavior: "smooth" });

  // Applica sconto fittizio
  const prezzoListino = parseFloat(monthlyListPrice.textContent);
  const setupListino = parseFloat(setupListPrice.textContent);

  const prezzoPromo = (prezzoListino * 0.85).toFixed(2);
  const setupPromo = (setupListino * 0.7).toFixed(2);

  defaultMonthlyPrice.textContent = prezzoPromo + " €";
  listMonthlyCrossed.textContent = prezzoListino.toFixed(2) + " €";
  setupFee.textContent = setupPromo + " €";
  listSetupCrossed.textContent = setupListino.toFixed(2) + " €";
}

// Event listeners
calculateBtn.addEventListener("click", calculatePrices);

checkBtn.addEventListener("click", () => {
  loadingPanel.classList.remove("hidden");
  listinoPanel.classList.add("hidden");
  dettaglioPanel.classList.add("hidden");

  startCountdown();
  startProgressBar();

  setTimeout(() => {
    dettaglioPanel.scrollIntoView({ behavior: "smooth" });
  }, 300);
});
