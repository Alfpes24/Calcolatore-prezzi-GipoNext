document.addEventListener("DOMContentLoaded", () => {
  const calcolaBtn = document.getElementById("calcola");
  const scontoPanel = document.getElementById("sconto-panel");
  const listinoFinale = document.getElementById("listino-finale");
  const promoFinale = document.getElementById("promo-finale");
  const promoLoader = document.querySelector(".promo-loader");

  calcolaBtn.addEventListener("click", () => {
    const rooms = parseInt(document.getElementById("rooms").value) || 0;
    const doctors = parseInt(document.getElementById("doctors").value) || 0;
    const bundle = document.getElementById("bundle").value;
    const crm = document.getElementById("crm").checked;
    const tablet = document.getElementById("tablet").checked;
    const ts = document.getElementById("ts").checked;

    // Fasce base mensili
    let baseMonthly = 0;
    if (bundle === "start") baseMonthly = 149;
    if (bundle === "plus") baseMonthly = 189;
    if (bundle === "top") baseMonthly = 219;

    if (crm) baseMonthly += 20;

    // Sconto extra per basso rapporto medici/sale
    const ratio = doctors / rooms;
    if (ratio <= 1.3) baseMonthly -= 10;

    // Calcolo costi una tantum base
    let setupFee = 0;
    if (rooms <= 2) setupFee = 290;
    else if (rooms <= 4) setupFee = 390;
    else if (rooms <= 6) setupFee = 490;
    else setupFee = 590;

    // Accessori
    if (tablet) setupFee += 190;
    if (ts) setupFee += 90;

    // Prezzo listino (simulazione +25%)
    const listino = Math.round(baseMonthly * 1.25);
    const setupListino = Math.round(setupFee * 1.25);

    // Prezzo promo (originale)
    const promoMonthly = baseMonthly;
    const promoSetup = setupFee;

    // Mostra sezione offerta
    scontoPanel.style.display = "block";
    promoLoader.style.display = "flex";
    listinoFinale.textContent = "€" + listino;
    promoFinale.textContent = "—";

    // Simula attesa
    setTimeout(() => {
      promoFinale.textContent = "€" + promoMonthly;
      promoLoader.style.display = "none";
    }, 1500);
  });

  const firmaBtn = document.querySelector(".firma-btn");
  firmaBtn.addEventListener("click", () => {
    alert("Apertura DocuSign per firma contratto...");
    // window.open("https://docusign.com/tuo-contratto", "_blank");
  });
});
