const currencyEndpoint = 'https://api.exchangeratesapi.io/';
const currencyLatests = 'latest';
const currencyBaseQueryParams = '?base=';

const currencyConverterEl = document.querySelector('.currency-converter');
const currencyConverterInputEl = currencyConverterEl.querySelector('input');
const currencyConverterCurrencySelectEl = currencyConverterEl.querySelector('select');
const firstResult = document.querySelector('.currency-converter__first-result');
const secondResult = document.querySelector('.currency-converter__second-result');

function errorHanlder(err) {
  console.warn(err);
}

function addCurrencyToHtml(base, rates) {
  const element = document.querySelector(`.currency__${base.toLowerCase()}`);
  element.textContent = `- ${rates.PLN.toFixed(4)}`;
}

async function getCurrencyFor(base) {
  const response = await fetch(`${currencyEndpoint}${currencyLatests}${currencyBaseQueryParams}${base}`);
  const data = await response.json();

  return data;
}

async function getCurrencyConverterData() {
  const selectedCurrency = currencyConverterCurrencySelectEl.value;
  const currencyAmount = currencyConverterInputEl.value;
  const rates = await getCurrencyFor(selectedCurrency);

  if (selectedCurrency === 'PLN') {
    firstResult.innerHTML = `${(currencyAmount * rates.rates.EUR).toFixed(2)} EUR`;
    secondResult.innerHTML = `${(currencyAmount * rates.rates.USD).toFixed(2)} USD`;
  } else if (selectedCurrency === 'USD') {
    firstResult.innerHTML = `${(currencyAmount * rates.rates.PLN).toFixed(2)} PLN`;
    secondResult.innerHTML = `${(currencyAmount * rates.rates.EUR).toFixed(2)} EUR`;
  } else if (selectedCurrency === 'EUR') {
    firstResult.innerHTML = `${(currencyAmount * rates.rates.PLN).toFixed(2)} PLN`;
    secondResult.innerHTML = `${(currencyAmount * rates.rates.USD).toFixed(2)} USD`;
  }
}

export function currencyInit() {
  getCurrencyFor('EUR')
      .then((data) => addCurrencyToHtml('EUR', data.rates))
      .catch(errorHanlder);
  getCurrencyFor('USD')
      .then((data) => addCurrencyToHtml('USD', data.rates))
      .catch(errorHanlder);
  getCurrencyConverterData().catch(errorHanlder);

  currencyConverterCurrencySelectEl.addEventListener('change', getCurrencyConverterData);
  currencyConverterInputEl.addEventListener('keyup', getCurrencyConverterData);
}
