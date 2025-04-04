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

function getIndiceStanze(stanze) {
  for (let i = 0; i < soglie.length; i++) {
    if (stanze <= soglie[i]) return i;
  }
  return soglie.length - 1;
}

function calcolaPreventivo() {
  const stanze = parseInt(document.getElementById("stanze").value);
  const medici = parseInt(document.getElementById("medici").value);
  const bundle = document.getElementById("bundle").value;
  const crm = document.getElementById("crm").checked;
  const ecr = document.getElementById("moduloECR").checked;
  const smartq = document.getElementById("moduloSmartQ").checked;

  const idx = getIndiceStanze(stanze);
  let prezzoUnitario = prezzi[bundle][crm ? "crm" : "solo"][idx];

  // Sconto se rapporto medici/stanze <= 1.3
  if ((medici / stanze) <= 1.3) {
    prezzoUnitario = prezzoUnitario / 1.5;
  }

  const canoneMensileBase = prezzoUnitario * stanze;
  const setupFee = setup[idx];

  const moduliMensili = (ecr ? 70 : 0) + (smartq ? 90 : 0);
  const moduliSetup = smartq ? 299 : 0;

  const totaleMensile = canoneMensileBase + moduliMensili;
  const totaleSetup = setupFee + moduliSetup;

  document.getElementById("risultato").innerHTML =
    `Canone mensile: <strong>€${totaleMensile.toFixed(2)}</strong><br>` +
    `Setup una tantum: <strong>€${totaleSetup.toFixed(2)}</strong>`;
}
