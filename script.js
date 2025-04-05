document.addEventListener("DOMContentLoaded", () => {
  // 🔐 Protezione con localStorage (funziona tra repo GitHub Pages)
  if (!localStorage.getItem("accesso_consentito")) {
    window.location.href = "https://alfpes24.github.io/Accesso-calcolatori/";
    return;
  }

  const calculateBtn = document.getElementById("calculate-btn");
  const results = document.getElementById("results");
  const listinoPanel = document.getElementById("listino-panel");
  const dettaglioPanel = document.getElementById("dettaglio-panel");
  const spinner = document.getElementById("loading-spinner");
  const countdown = document.getElementById("countdown");

  calculateBtn.addEventListener("click", () => {
    const rooms = parseInt(document.getElementById("rooms").value) || 0;
    const doctors = parseInt(document.getElementById("doctors").value) || 0;
    const bundle = document.getElementById("bundle").value;
    const crm = document.getElementById("crm").checked;
    const tablet = document.getElementById("tabletFirma").checked;
    const ts = document.getElementById("lettoreTessera").checked;

    // Logica bundle mensile
    let baseMonthly = 0;
    if (bundle === "starter") baseMonthly = 149;
    if (bundle === "plus") baseMonthly = 189;
    if (bundle === "vip") baseMonthly = 219;

    if (crm) baseMonthly += 20;
    const ratio = doctors / rooms;
    if (ratio <= 1.3) baseMonthly -= 10;

    // Logica setup
    let setupFee = 0;
    if (rooms <= 2) setupFee = 290;
    else if (rooms <= 4) setupFee = 390;
    else if (rooms <= 6) setupFee = 490;
    else setupFee = 590;

    if (tablet) setupFee += 429;
    if (ts) setupFee += 79;

    // Prezzo a listino
    const listino = Math.round(baseMonthly * 1.25);
    const setupListino = Math.round(setupFee * 1.25);

    // Mostra listino
    document.getElementById("monthly-list-price").textContent = `€${listino}`;
    document.getElementById("setup-list-price").textContent = `€${setupListino}`;
    document.getElementById("setup-total").textContent = `€${setupListino}`;

    results.style.display = "block";
    listinoPanel.style.display = "block";
    dettaglioPanel.style.display = "none";
    spinner.style.display = "none";
  });

  document.getElementById("check-btn").addEventListener("click", () => {
    spinner.style.display = "block";
    let seconds = 15;
    countdown.textContent = `Verifica in corso... Attendere ${seconds} secondi`;

    const interval = setInterval(() => {
      seconds--;
      countdown.textContent = `Verifica in corso... Attendere ${seconds} secondi`;
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      spinner.style.display = "none";
      countdown.textContent = "";

      const monthly = parseInt(document.getElementById("monthly-list-price").textContent.replace("€", ""));
      const setup = parseInt(document.getElementById("setup-list-price").textContent.replace("€", ""));

      const promoMonthly = Math.round(monthly * 0.85);
      const promoSetup = Math.round(setup * 0.5);

      document.getElementById("default-monthly-price").textContent = `€${promoMonthly}`;
      document.getElementById("setup-fee").textContent = `€${promoSetup}`;
      document.getElementById("setup-total-promo").textContent = `€${promoSetup}`;

      dettaglioPanel.style.display = "block";
    }, 15000);
  });
});
