const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your API Ninjas key
let exchangeRates = {};

async function loadCurrencies() {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await res.json();
    exchangeRates = data.rates;

    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');
    const inflationCountry = document.getElementById('inflationCountry');

    currencyList.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency.code;
        option1.text = `${currency.emoji} ${currency.code} - ${currency.country}`;
        fromSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency.code;
        option2.text = `${currency.emoji} ${currency.code} - ${currency.country}`;
        toSelect.appendChild(option2);

        const countryOption = document.createElement('option');
        countryOption.value = currency.country;
        countryOption.text = `${currency.emoji} ${currency.country}`;
        inflationCountry.appendChild(countryOption);
    });

    fromSelect.value = 'USD';
    toSelect.value = 'EUR';
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    if (!amount || !from || !to) {
        alert("Please fill all fields.");
        return;
    }
    const rate = exchangeRates[to];
    const result = (amount * rate).toFixed(2);
    document.getElementById('result').innerText = `${amount} ${from} = ${result} ${to}`;
}

async function showInflation() {
    const country = document.getElementById('inflationCountry').value;
    const res = await fetch(`https://api.api-ninjas.com/v1/inflation?country=${country}`, {
        headers: { 'X-Api-Key': apiKey }
    });
    const data = await res.json();
    if (data.length > 0) {
        document.getElementById('inflationResult').innerText = 
        `📍 ${data[0].country}\n📅 Date: ${data[0].date}\n📈 Monthly: ${data[0].monthly_rate_pct}%\n📈 Yearly: ${data[0].yearly_rate_pct}%`;
    } else {
        document.getElementById('inflationResult').innerText = 'Data not found.';
    }
}

function swapCurrencies() {
    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');
    [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
}

function clearAll() {
    document.getElementById('amount').value = '';
    document.getElementById('result').innerText = '';
    document.getElementById('inflationResult').innerText = '';
}

function toggleDarkMode() {
    if (document.body.style.background === 'black') {
        document.body.removeAttribute('style');
    } else {
        document.body.style.background = 'black';
        document.body.style.color = '#fff';
    }
}

function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleString();
}
setInterval(updateClock, 1000);

loadCurrencies();
updateClock();
