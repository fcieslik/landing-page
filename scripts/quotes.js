const quotesEndpoint = 'https://quotes.rest/';
const quoteOfTheDay = 'qod';

const quotesDiv = document.querySelector('.quotes');

function handleError(err) {
  console.warn(err);

  const errorMsg = `<p class="quotes__quote">Unable to fetch quotes</p>`;
  quotesDiv.innerHTML = errorMsg;
}

async function fetchQuoteOfTheDay() {
  const response = await fetch(`${quotesEndpoint}${quoteOfTheDay}`);
  const quoteData = await response.json();

  addQuoute(quoteData.contents.quotes[0]);
}

function addQuoute(quote) {
  const quoteHtml = `<p class="quotes__quote">"${quote.quote}"</p><p class="quotes__author">${quote.author}</p>`;
  quotesDiv.innerHTML = quoteHtml;
}

fetchQuoteOfTheDay().catch(handleError);

export function initQuotes() {
  fetchQuoteOfTheDay().catch(handleError);
}
