// Variabili globali per salvare i dati tra "Calcola" e "Check"
let canoneMensileBase = 0;
let setupFeeBase = 0;
let tabletCosto = 0;
let lettoreCosto = 0;

const prezzi = {
  starter: {
    solo: [109, 99, 89, 69, 59, 49, 29, 19],
    crm:  [119, 109, 99, 79, 69, 59, 39, 29]
  },
  plus: {
    solo: [129, 119, 109, 89, 69, 59, 49, 39],
    crm:  [139, 129, 119, 99, 79, 69, 59, 49]
  },
  vip: {
    solo: [139, 129, 119, 99, 79, 69, 59, 49],
    crm:  [149, 139, 129, 109, 89, 79, 69, 59]
  }
};

const setup = [99, 119, 129, 149, 199, 299, 499, 899];
const soglie = [1, 2, 4, 6, 8, 10, 15, 20];

// Trova l’indice corretto in base al numero di stanze
function getIndiceStanze(stanze) {
  for (let i = 0; i < soglie.length; i++) {
    if (stanze <= soglie[i]) return i;
  }
  return soglie.length - 1;
}

// Avvia tutto al caricamento pagina
document.addEventListener("DOMContentLoaded", function () {
  const calculateBtn = document.getElementById("calculate-btn");
  const checkBtn = document.getElementById("check-btn");
  const spinner = document.getElementById("loading-spinner");
  const countdown = document.getElementById("countdown");
  const dettaglioPanel = document.getElementById("dettaglio-panel");

  calculateBtn.addEventListener("click", calcolaPreventivo);

  checkBtn.addEventListener("click", () => {
    // Avvia countdown
    spinner.style.display = "block";
    countdown.textContent = "Attendere 15 secondi...";
    dettaglioPanel.style.display = "none";

    let seconds = 15;
    const interval = setInterval(() => {
      seconds--;
      countdown.textContent = `Attendere ${seconds} secondi...`;

      if (seconds <= 0) {
        clearInterval(interval);
        spinner.style.display = "none";
        dettaglioPanel.style.display = "block";

        // Calcolo PROMO
        const setupFeePromo = setupFeeBase;
        const totaleUnaTantumPromo = setupFeePromo + tabletCosto + lettoreCosto;

        document.getElementById("default-monthly-price").textContent = `${canoneMensileBase.toFixed(2)} €`;
        document.getElementById("setup-fee").textContent = `${setupFeePromo.toFixed(2)} €`;
        document.getElementById("setup-total-promo").textContent = `${totaleUnaTantumPromo.toFixed(2)} €`;
      }
    }, 1000);
  });
});

function calcolaPreventivo() {
  // Prendo input dal form
  const stanze = parseInt(document.getElementById("rooms").value);
  const medici = parseInt(document.getElementById("doctors").value);
  const bundle = document.getElementById("bundle").value || "plus";
  const crm = document.getElementById("crm").checked;
  const tablet = document.getElementById("tabletFirma").checked;
  const lettore = document.getElementById("lettoreTessera").checked;

  if (isNaN(stanze) || isNaN(medici) || stanze <= 0) {
    alert("Inserisci un numero valido di ambulatori e medici.");
    return;
  }

  // Calcolo indice fascia prezzo
  const idx = getIndiceStanze(stanze);
  let prezzoUnitario = prezzi[bundle][crm ? "crm" : "solo"][idx];

  // Applico sconto se rapporto medici/stanze ≤ 1.3
  if ((medici / stanze) <= 1.3) {
    prezzoUnitario = prezzoUnitario / 1.5;
  }

  // Salvo i valori di base globali
  canoneMensileBase = prezzoUnitario * stanze;
  setupFeeBase = setup[idx];
  tabletCosto = tablet ? 429 : 0;
  lettoreCosto = lettore ? 79 : 0;

  // Calcolo a listino (+25%)
  const canoneListino = canoneMensileBase * 1.25;
  const setupListino = setupFeeBase * 1.25;
  const totaleListinoUnaTantum = setupListino + tabletCosto + lettoreCosto;

  // Mostro nel DOM
  document.getElementById("monthly-list-price").textContent = `${canoneListino.toFixed(2)} €`;
  document.getElementById("setup-list-price").textContent = `${setupListino.toFixed(2)} €`;
  document.getElementById("setup-total").textContent = `${totaleListinoUnaTantum.toFixed(2)} €`;

  // Reset UI
  document.getElementById("results").style.display = "block";
  document.getElementById("listino-panel").style.display = "block";
  document.getElementById("dettaglio-panel").style.display = "none";
  document.getElementById("loading-spinner").style.display = "none";
}
