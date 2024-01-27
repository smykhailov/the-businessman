let currentGameHandler = null;
const gameData = {};

const startNewGame = () => {
    const today = new Date();

    const interestRates = {
        depositInterestRate: Math.random() * 10 + 5,
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

    const assistantData = {
        oilToHeatHouse: Math.random() * 29 + 1,
        birthday: `${(Math.random() * 11 + 1).toFixed(0)}/${(Math.random() * 27 + 1).toFixed(0)}`
    }

    const availableHouses = [{
        name: '1 bedroom',
        price: Math.round(Math.random() * 5000 + 5000),
    }, {
        name: '2 bedrooms',
        price: Math.round(Math.random() * 10000 + 10000),
    }, {
        name: '3 bedrooms',
        price: Math.round(Math.random() * 10000 + 20000),
    }, {
        name: '4 bedrooms',
        price: Math.round(Math.random() * 10000 + 30000),
    }, {
        name: '5 bedrooms',
        price: Math.round(Math.random() * 10000 + 40000),
    }, {
        name: '6 bedrooms',
        price: Math.round(Math.random() * 10000 + 50000),
    }, {
        name: '7 bedrooms',
        price: Math.round(Math.random() * 10000 + 60000),
    }];

    const availableCars = [{
        name: 'Škoda 110 R',
        price: Math.round(Math.random() * 5000 + 5000),
    }, {
        name: 'Škoda Rapid',
        price: Math.round(Math.random() * 10000 + 10000),
    }, {
        name: 'Škoda Fabia',
        price: Math.round(Math.random() * 10000 + 20000),
    }, {
        name: 'Škoda Octavia',
        price: Math.round(Math.random() * 10000 + 30000),
    }, {
        name: 'Škoda Superb',
        price: Math.round(Math.random() * 10000 + 40000),
    }, {
        name: 'Škoda Kodiaq',
        price: Math.round(Math.random() * 10000 + 50000),
    }, {
        name: 'Škoda Enyaq',
        price:Math.round(Math.random() * 10000 + 60000),
    }];

    const currentMonthExchangePrices = {
        land: Math.round(Math.random() * 300 + 100),
        oil: Math.round(Math.random() * 30+ 10)
    }

    const historicalExchangePrices = [
        // HACK: this is temporary, this logic will be changed, when we implement end of month logic 
        { land: currentMonthExchangePrices.land, oil: currentMonthExchangePrices.oil },
        { land: 0, oil: 0 },
        { land: 0, oil: 0 },
        { land: 0, oil: 0 },
        { land: 0, oil: 0 },
        { land: 0, oil: 0 },
        { land: 0, oil: 0 },
        { land: 0, oil: 0 },
        { land: 0, oil: 0 },
        { land: 0, oil: 0 },
        { land: 0, oil: 0 },
        { land: 0, oil: 0 },
    ];

    const assets = {
        house: availableHouses[Math.round(Math.random() * 6)],
        car: availableCars[Math.round(Math.random() * 6)],
        land: {
            amount: Math.round(Math.random() * 95 + 5),
            currentMonthPrice: currentMonthExchangePrices.land,
        },
        oil: {
            amount: Math.round(Math.random() * 250 + 10),
            currentMonthPrice: currentMonthExchangePrices.oil,
        }
    }

    const bankData = {
        credit: [],
        deposit: []
    };

    for (let i = 0; i < 12; i++) {
        bankData.credit.push({
            amount: 0,
            monthsToPayBack: 0,
            returnDay: 0,
        });
        bankData.deposit.push({
            amount: 0,
            monthsToPayBack: 0,
            returnDay: 0,
        });
    }

    gameData.today = today;
    gameData.interestRates = interestRates;
    gameData.accountBalances = accountBalances;
    gameData.taxes = taxes;
    gameData.assistantData = assistantData;
    gameData.assets = assets;
    gameData.availableCars = availableCars;
    gameData.availableHouses = availableHouses;
    gameData.currentMonthExchangePrices = currentMonthExchangePrices;
    gameData.historicalExchangePrices = historicalExchangePrices;
    gameData.bankData = bankData;

    setMainMenuMouseActions();
    setMainMenuKeyboardActions();

    setQuitWindowEventHandlers();

    if (currentGameHandler) {
        clearInterval(currentGameHandler);
    }

    currentGameHandler = setInterval(() => {
        setTodayView(today);
        setInterestRates(interestRates);
        setAccountsBalance(accountBalances);
        setTaxes(taxes);

        setAssistantData(assistantData);
        setAssets(assets);
        setExchangePrices(currentMonthExchangePrices, historicalExchangePrices);
        setMarketData(availableCars, availableHouses);
        
        today.setDate(today.getDate() + 1);
    }, 2000);
};

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
    setElementData('deposit-interest-rate', interestRates.depositInterestRate.toFixed(0));
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

const setAssistantData = (data) => {
    setElementData('oil-to-heat-house', data.oilToHeatHouse.toFixed(0));
    setElementData('birthday', data.birthday);
}

const setAssets = (assets) => {
    setElementData('owned-house', assets.house.name);
    setElementData('owned-house-price', `${assets.house.price} Grobls`);
    setElementData('owned-car', assets.car.name);
    setElementData('owned-car-price', `${assets.car.price} Grobls`);

    setElementData('owned-land-amount', assets.land.amount);
    setElementData('owned-land-price', `${assets.land.amount * assets.land.currentMonthPrice} Grobls`);
    setElementData('owned-oil-amount', assets.oil.amount);
    setElementData('owned-oil-price', `${assets.oil.amount * assets.oil.currentMonthPrice} Grobls`);
}

const setExchangePrices = (exchangeCurrentMonthPrices, historicalExchangePrices) => {
    setElementData('exchange-land-price', exchangeCurrentMonthPrices.land);
    setElementData('exchange-oil-price', exchangeCurrentMonthPrices.oil);

    for (let i = 1; i < historicalExchangePrices.length + 1; i++) {
        // Arrays are zero based, but we start from 1 and need to subtract 1
        const historicalExchangePrice = historicalExchangePrices[i - 1];

        const landPriceElement = document.getElementById(`land-price-${i}`);
        const oilPriceElement = document.getElementById(`oil-price-${i}`);

        landPriceElement.innerText = historicalExchangePrice.land;
        oilPriceElement.innerText = historicalExchangePrice.oil;
    }
}

const setMarketData = (cars, houses) => {
    for (let i = 1; i < cars.length + 1; i++) {
        const car = cars[i - 1];

        const carNameElement = document.getElementById(`car-${i}`);
        const carPriceElement = document.getElementById(`car-price-${i}`);

        carNameElement.innerText = car.name;
        carPriceElement.innerText = `${car.price} Grobls`;
    }

    for (let i = 1; i < houses.length + 1; i++) {
        const house = houses[i - 1];

        const houseNameElement = document.getElementById(`house-${i}`);
        const housePriceElement = document.getElementById(`house-price-${i}`);

        houseNameElement.innerText = house.name;
        housePriceElement.innerText = `${house.price} Grobls`;
    }
}

const setBankData = (bankData) => {
    for (let i = 1; i < bankData.credit.length + 1; i++) {
        const credit = bankData.credit[i - 1];

        const row = i <= 6 ? 1 : 2;
        const column = i <= 6 ? i : i - 6;
        setElementData(`credit-${row}-${column}`, credit.amount);
    }

    for (let i = 1; i < bankData.deposit.length + 1; i++) {
        const deposit = bankData.deposit[i - 1];

        const row = i <= 6 ? 1 : 2;
        const column = i <= 6 ? i : i - 6;
        setElementData(`deposit-${row}-${column}`, deposit.amount);
    }
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

const setMainMenuMouseActions = () => {
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

    closeWindowMouseHandler();
}

const setMainMenuKeyboardActions = () => {    
    // Assign key bindings to open windows
    // By assigning it to the document, we can open windows from any page
    // and make sure there is only one handler for all windows
    document.addEventListener('keydown', (e) => {
        assignKeyBindingsToOpenWindow('b', 'bank-main', e);
        assignKeyBindingsToOpenWindow('m', 'market-main', e);
        assignKeyBindingsToOpenWindow('e', 'exchange-main', e);
        assignKeyBindingsToOpenWindow('a', 'assets-main', e);
        assignKeyBindingsToOpenWindow('s', 'assistant-main', e);
        assignKeyBindingsToOpenWindow('q', 'quit-main', e);

        closeWindowKeyboardHandler(e);
    });
}

const closeWindowMouseHandler = () => {
    const windows = document.getElementsByClassName('modal');
    for (let i = 0; i < windows.length; i++) {
        const window = windows[i];

        window.addEventListener('click', (e) => {
            // Apply clicks only to the modal window itself
            if (e.target !== window) {
                return;
            }

            window.classList.add('hidden');
        });
    }
}

const assignKeyBindingsToOpenWindow = (keyBinding, windowId, e) => {
    // Do not allow to open window, if there is already opened window
    const isThereOpenedWindow = document.querySelector('.modal:not(.hidden)');
    if (isThereOpenedWindow) {
        return;
    }

    if (e.key === keyBinding || (e.key === keyBinding.toUpperCase() && e.shiftKey)) {
        e.stopPropagation();
        e.preventDefault();
        open(windowId);
    }
}

const closeWindowKeyboardHandler = (e) => {
    if (e.key === 'Escape') {
        // Do not allow to open window, if there is already opened window
        const openedWindow = document.querySelector('.modal:not(.hidden)');

        if (openedWindow) {
            openedWindow.classList.add('hidden');
        } else {
            open('quit-main');
        }
    }
}

const open = (windowId) => {
    const window = document.getElementById(windowId);
    window.classList.remove('hidden');
}

const setQuitWindowEventHandlers = () => {
    document.addEventListener('keyup', (e) => {
        const quitWindow = document.getElementById('quit-main');
    
        if (quitWindow.classList.contains('hidden')) {
            return;
        }

        if (e.key === '1') {
            quitWindow.classList.add('hidden');
            startNewGame();
        }
    });
}

const assignBankWindowActions = () => {
    let lendMoneyProcessing = false;
    let borrowMoneyProcessing = false;

    document.addEventListener('keydown', (e) => {
        const bankWindow = document.getElementById('bank-main');
        if (bankWindow.classList.contains('hidden')) {
            return;
        }

        const lendMoneyKeyBinding = 'l';
        const borrowMoneyKeyBinding = 'b';

        const bankError = document.getElementById('bank-error');
        const lendMoney = document.getElementById('lend-money');
        const borrowMoney = document.getElementById('borrow-money');

        const amountToLend = document.getElementById('amount-to-lend');
        const amountToBorrow = document.getElementById('amount-to-borrow');

        const timeToLend = document.getElementById('time-to-lend');
        const timeToBorrow = document.getElementById('time-to-borrow');

        bankError.innerText = '';

        const cleanPrompts = () => {
            lendMoney.classList.add('hidden');
            borrowMoney.classList.add('hidden');

            amountToLend.value = '';
            amountToBorrow.value = '';

            timeToLend.value = '';
            timeToBorrow.value = '';

            bankError.innerText = '';

            lendMoneyProcessing = false;
            borrowMoneyProcessing = false;
        };

        if (e.key === lendMoneyKeyBinding || (e.key === lendMoneyKeyBinding.toUpperCase() && e.shiftKey)) {
            if (borrowMoneyProcessing) {
                return;
            }

            lendMoney.classList.remove('hidden');
            amountToLend.focus();

            lendMoneyProcessing = true;    
        }
        
        if (e.key === borrowMoneyKeyBinding || (e.key === borrowMoneyKeyBinding.toUpperCase() && e.shiftKey)) {
            if (lendMoneyProcessing) {
                return;
            }

            borrowMoney.classList.remove('hidden');
            amountToBorrow.focus();
            
            borrowMoneyProcessing = true;
        }

        if (e.key === 'Enter' || e.key === 'Tab') {
            if (lendMoneyProcessing) {
                const amountValue = +amountToLend.value;
                const timeValue = +timeToLend.value;

                if (+amountValue > gameData.accountBalances.accountBalance) {
                    amountToLend.value = '';
                    bankError.innerText = 'You do not have enough money to lend.';
                    return;
                }

                if (e.target === amountToLend) {
                    timeToLend.focus();
                }

                if (e.target === timeToLend) {
                    if (+timeValue > 12 || +timeValue < 1) {
                        timeToLend.value = '';
                        bankError.innerText = 'You cannot lend money for more than 12 months and less than 1.';
                        return;
                    }
                }

                if (amountValue > 0 && (timeValue > 0 && timeValue < 13)) {
                    gameData.bankData.deposit[timeValue - 1].amount += amountValue;
                    gameData.bankData.deposit[timeValue - 1].monthsToPayBack = timeValue;
                    gameData.bankData.deposit[timeValue - 1].returnDay = gameData.today.getDate() > 28 ? 28 : gameData.today.getDate();

                    gameData.accountBalances.accountBalance -= amountValue;
                    gameData.accountBalances.depositBalance += amountValue;
                } else {
                    return;
                }
            }
            
            if (borrowMoneyProcessing) {
                const amountValue = +amountToBorrow.value;
                const timeValue = +timeToBorrow.value;
                
                if (e.target === amountToBorrow) {
                    timeToBorrow.focus();
                }

                if (e.target === timeToBorrow) {
                    if (+timeValue > 12 || +timeValue < 1) {
                        timeToBorrow.value = '';
                        bankError.innerText = 'You cannot borrow money for more than 12 months and less than 1.';
                        return;
                    }
                }

                if (amountValue > 0 && (timeValue > 0 && timeValue < 13)) {
                    gameData.bankData.credit[timeValue - 1].amount += amountValue;
                    gameData.bankData.credit[timeValue - 1].monthsToPayBack = timeValue;
                    gameData.bankData.credit[timeValue - 1].returnDay = gameData.today.getDate() > 28 ? 28 : gameData.today.getDate();

                    gameData.accountBalances.accountBalance += amountValue;
                    gameData.accountBalances.creditBalance += amountValue;
                } else {
                    return;
                }
            }
            
            setAccountsBalance(gameData.accountBalances);
            setBankData(gameData.bankData);

            cleanPrompts();
            document.getElementById('bank-main').classList.add('hidden');
        }

        if (e.key === 'Escape') {
            cleanPrompts();
        }
    }, true);
}

const assignActionHandlers = () => {
    assignBankWindowActions();
};


startNewGame();
assignActionHandlers();