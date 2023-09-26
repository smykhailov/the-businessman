const today = new Date();

var creditInterestRate = Math.random() * 10 + 5;
var debitInterestRate = Math.random() * 10 + 5;
var incomeTax = Math.random() * 9 + 1;

var accountBalance = Math.random() * 10000 + 1000;
var creditBalance = 0;
var depositBalance = 0;
var netIncome = 0;

var houseTax = Math.random() * 19 + 1;
var landTax = Math.random() * 19 + 1;


setInterval(() => {
    const currentDate = today.toLocaleDateString('en-US');
    const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfWeekNum = today.getDay();
    
    const todayDateElement = document.getElementById('today-date');
    const todayDayOfWeekElement = document.getElementById('today-day-of-week');
    
    todayDateElement.innerText = currentDate;
    todayDayOfWeekElement.innerText = dayOfWeek;

    const creditInterestRateElement = document.getElementById('credit-interest-rate');
    const debitInterestRateElement = document.getElementById('debit-interest-rate');
    const incomeTaxElement = document.getElementById('income-tax');

    creditInterestRateElement.innerText = creditInterestRate.toFixed(0);
    debitInterestRateElement.innerText = debitInterestRate.toFixed(0);
    incomeTaxElement.innerText = incomeTax.toFixed(0);

    const accountBalanceElement = document.getElementById('account-balance');
    const creditBalanceElement = document.getElementById('credit-balance');
    const depositBalanceElement = document.getElementById('deposit-balance');
    const netIncomeElement = document.getElementById('net-income');

    accountBalanceElement.innerText = accountBalance.toFixed(0);
    creditBalanceElement.innerText = creditBalance.toFixed(0);
    depositBalanceElement.innerText = depositBalance.toFixed(0);
    netIncomeElement.innerText = netIncome.toFixed(0);

    const houseTaxElement = document.getElementById('house-tax');
    const landTaxElement = document.getElementById('land-tax');

    houseTaxElement.innerText = houseTax.toFixed(0);
    landTaxElement.innerText = landTax.toFixed(0);
    
    if (dayOfWeekNum === 0) {
        todayDayOfWeekElement.classList.add('sunday');
    } else if (dayOfWeekNum === 6) {
        todayDayOfWeekElement.classList.add('saturday');
    } else {
        todayDayOfWeekElement.classList.remove('sunday');
        todayDayOfWeekElement.classList.remove('saturday');
    }    
    
    today.setDate(today.getDate() + 1);
}, 2000);