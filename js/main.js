const today = new Date();

const interestRates = {
    debitInterestRate: Math.random() * 10 + 5,
    incomeTax: Math.random() * 9 + 1,
    creditInterestRate: Math.random() * 10 + 5,
}

const accountBalances = {
    accountBalance: Math.random() * 10000 + 1000,
    creditBalance: 0,
    depositBalance: 0,
    netIncome: 0,
}

const taxes = {
    houseTax: Math.random() * 19 + 1,
    landTax: Math.random() * 19 + 1,
}

setInterval(() => {
    setTodayView(today);
    setInterestRates(interestRates);
    setAccountsBalance(accountBalances);
    setTaxes(taxes);
    
    today.setDate(today.getDate() + 1);
}, 2000);

const setTodayView = (today) => {
    const currentDate = today.toLocaleDateString('en-US');
    const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfWeekNum = today.getDay();
    
    setElementData('today-date', currentDate);
    setElementData('today-day-of-week', dayOfWeek);
    
    updateDayOfWeekColor(dayOfWeekNum);
}

const setInterestRates = (interestRates) => {
    setElementData('credit-interest-rate', interestRates.creditInterestRate.toFixed(0));
    setElementData('debit-interest-rate', interestRates.debitInterestRate.toFixed(0));
    setElementData('income-tax', interestRates.incomeTax.toFixed(0));
}

const setAccountsBalance = (accountBalances) => {
    setElementData('account-balance', accountBalances.accountBalance.toFixed(0));
    setElementData('credit-balance', accountBalances.creditBalance.toFixed(0));
    setElementData('deposit-balance', accountBalances.depositBalance.toFixed(0));
    setElementData('net-income', accountBalances.netIncome.toFixed(0));
}

const setTaxes = (taxes) => {
    setElementData('house-tax', taxes.houseTax.toFixed(0));
    setElementData('land-tax', taxes.landTax.toFixed(0));
}

const updateDayOfWeekColor = (dayOfWeekNum) => {
    const todayDayOfWeekElement = document.getElementById('today-day-of-week');
    if (dayOfWeekNum === 0) {
        todayDayOfWeekElement.classList.add('sunday');
    } else if (dayOfWeekNum === 6) {
        todayDayOfWeekElement.classList.add('saturday');
    } else {
        todayDayOfWeekElement.classList.remove('sunday');
        todayDayOfWeekElement.classList.remove('saturday');
    }
}

const setElementData = (elementId, data) => {
    const element = document.getElementById(elementId);
    element.innerText = data;
}

const setMainMenuActions = () => {
    const bankButton = document.getElementById('open-bank-btn');
    const marketButton = document.getElementById('open-market-btn');
    const exchangeButton = document.getElementById('open-exchange-btn');
    const assetsButton = document.getElementById('open-assets-btn');
    const assistantButton = document.getElementById('open-assistant-btn');
    const quitButton = document.getElementById('open-quit-btn');

    bankButton.addEventListener('click', () => {
        open('bank-main');
    });

    marketButton.addEventListener('click', () => {
        open('market-main');
    });

    exchangeButton.addEventListener('click', () => {
        open('exchange-main');
    });

    assetsButton.addEventListener('click', () => {
        open('assets-main');
    });

    assistantButton.addEventListener('click', () => {
        open('assistant-main');
    });

    quitButton.addEventListener('click', () => {
        open('quit-main');
    });
}

const open = (windowId) => {
    const window = document.getElementById(windowId);
    window.classList.remove('hidden');
}

setMainMenuActions();