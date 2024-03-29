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
        accountBalance: Math.random() * 20000 + 10000,
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
        birthday: `${(Math.random() * 11 + 1).toFixed(0)}/${(Math.random() * 27 + 1).toFixed(0)}`,
        landSold: 0,
        landBought: 0,
        landGain: 0,
        oilSold: 0,
        oilBought: 0,
        oilGain: 0,
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
            returnDay: 0,
        });
        bankData.deposit.push({
            amount: 0,
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
    setElementData('land-sold', data.landSold);
    setElementData('land-bought', data.landBought);
    setElementData('land-gain', data.landGain);
    setElementData('oil-sold', data.oilSold);
    setElementData('oil-bought', data.oilBought);
    setElementData('oil-gain', data.oilGain);
}

const setAssets = (assets) => {
    setElementData('owned-house', assets.house ? assets.house.name : 'None');
    setElementData('owned-house-amount', assets.house ? "1" : '');
    setElementData('owned-house-price', `${assets.house ? assets.house.price : 0} Grobls`);
    setElementData('owned-car', assets.car ? assets.car.name : 'None');
    setElementData('owned-car-amount', assets.car ? "1" : '');
    setElementData('owned-car-price', `${assets.car ? assets.car.price : 0} Grobls`);

    setElementData('owned-land-amount', assets.land.amount);
    setElementData('owned-land-price', `${assets.land.amount * assets.land.currentMonthPrice} Grobls`);
    setElementData('owned-oil-amount', assets.oil.amount);
    setElementData('owned-oil-price', `${assets.oil.amount * assets.oil.currentMonthPrice} Grobls`);

    const credit = gameData.bankData.credit[gameData.today.getMonth()];
    if (credit.amount !== 0) {
        const element = setElementData('you-should-return-money', 
            `You should return money ${credit.returnDay} this month.`);
        
        if (gameData.today.getDate() < credit.returnDay) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }

    const deposit = gameData.bankData.deposit[gameData.today.getMonth()];
    if (deposit.amount !== 0) {
        const element = setElementData('you-get-money-back', 
            `Bank will return money ${deposit.returnDay} of this month.`);

        if (gameData.today.getDate() < deposit.returnDay) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }
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
    return element;
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

        const getMonthToReturn = (timeValue) => {
            const currentMonth = gameData.today.getMonth();
            // Get current month + time to lend/borrow, if it is more than 11, then we need to return it next year
            const monthToReturn = currentMonth + timeValue > 11 ? currentMonth + timeValue - 12 : currentMonth + timeValue;

            return monthToReturn;
        }

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
                    const monthToReturn = getMonthToReturn(timeValue);

                    gameData.bankData.deposit[monthToReturn].amount += amountValue;
                    gameData.bankData.deposit[monthToReturn].returnDay = gameData.today.getDate() > 28 ? 28 : gameData.today.getDate();

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
                    const monthToReturn = getMonthToReturn(timeValue);

                    gameData.bankData.credit[monthToReturn].amount += amountValue;
                    gameData.bankData.credit[monthToReturn].returnDay = gameData.today.getDate() > 28 ? 28 : gameData.today.getDate();

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

const assignMarketWindowActions = () => {
    let buyCarProcessing = false;
    let buyHouseProcessing = false;

    document.addEventListener('keydown', (e) => {
        const marketWindow = document.getElementById('market-main');
        if (marketWindow.classList.contains('hidden')) {
            return;
        }

        const buyCarKeyBinding = 'c';
        const buyHouseKeyBinding = 'h';

        const marketError = document.getElementById('market-error');
        const buyCar = document.getElementById('buy-car');
        const buyHouse = document.getElementById('buy-house');

        const carNumToBuy = document.getElementById('car-num-to-buy');
        const houseNumToBuy = document.getElementById('house-num-to-buy');

        marketError.innerText = '';

        const cleanPrompts = () => {
            buyCar.classList.add('hidden');
            buyHouse.classList.add('hidden');

            carNumToBuy.value = '';
            houseNumToBuy.value = '';

            marketError.innerText = '';

            buyCarProcessing = false;
            buyHouseProcessing = false;
        };

        if (e.key === buyCarKeyBinding || (e.key === buyCarKeyBinding.toUpperCase() && e.shiftKey)) {
            if (buyHouseProcessing) {
                return;
            }

            buyCar.classList.remove('hidden');
            carNumToBuy.focus();

            buyCarProcessing = true;    
        }
        
        if (e.key === buyHouseKeyBinding || (e.key === buyHouseKeyBinding.toUpperCase() && e.shiftKey)) {
            if (buyCarProcessing) {
                return;
            }

            buyHouse.classList.remove('hidden');
            houseNumToBuy.focus();
            
            buyHouseProcessing = true;
        }

        if (e.key === 'Enter' || e.key === 'Tab') {
            if (buyCarProcessing) {
                const num = +carNumToBuy.value;
                const price = gameData.availableCars[num - 1].price;

                if (price > gameData.accountBalances.accountBalance) {
                    carNumToBuy.value = '';
                    marketError.innerText = 'You do not have enough money.';
                    return;
                }

                if (num > 0) {
                    gameData.assets.car = gameData.availableCars[num - 1];
                    gameData.accountBalances.accountBalance -= price;
                    gameData.accountBalances.netIncome -= price;
                } else {
                    return;
                }
            }
            
            if (buyHouseProcessing) {
                const num = +houseNumToBuy.value;
                const price = gameData.availableHouses[num - 1].price;

                if (price > gameData.accountBalances.accountBalance) {
                    houseNumToBuy.value = '';
                    marketError.innerText = 'You do not have enough money.';
                    return;
                }

                if (num > 0) {
                    gameData.assets.house = gameData.availableHouses[num - 1];
                    gameData.accountBalances.accountBalance -= price;
                    gameData.accountBalances.netIncome -= price;
                } else {
                    return;
                }
            }
            
            setAccountsBalance(gameData.accountBalances);

            cleanPrompts();
            document.getElementById('market-main').classList.add('hidden');
        }

        if (e.key === 'Escape') {
            cleanPrompts();
        }
    }, true);
}

const assignExchangeWindowActions = () => {
    let buyLandProcessing = false;
    let buyOilProcessing = false;

    document.addEventListener('keydown', (e) => {
        const exchangeWindow = document.getElementById('exchange-main');
        if (exchangeWindow.classList.contains('hidden')) {
            return;
        }

        const buyLandKeyBinding = 'l';
        const buyOilKeyBinding = 'o';

        const exchangeError = document.getElementById('exchange-error');
        const buyLand = document.getElementById('buy-land');
        const buyOil = document.getElementById('buy-oil');

        const amountLandToBuy = document.getElementById('amount-land-buy');
        const amountOilToBuy = document.getElementById('amount-oil-buy');

        exchangeError.innerText = '';

        const cleanPrompts = () => {
            buyLand.classList.add('hidden');
            buyOil.classList.add('hidden');

            amountLandToBuy.value = '';
            amountOilToBuy.value = '';

            exchangeError.innerText = '';

            buyLandProcessing = false;
            buyOilProcessing = false;
        };

        if (e.key === buyLandKeyBinding || (e.key === buyLandKeyBinding.toUpperCase() && e.shiftKey)) {
            if (buyOilProcessing) {
                return;
            }

            buyLand.classList.remove('hidden');
            amountLandToBuy.focus();

            buyLandProcessing = true;    
        }
        
        if (e.key === buyOilKeyBinding || (e.key === buyOilKeyBinding.toUpperCase() && e.shiftKey)) {
            if (buyLandProcessing) {
                return;
            }

            buyOil.classList.remove('hidden');
            amountOilToBuy.focus();
            
            buyOilProcessing = true;
        }

        if (e.key === 'Enter' || e.key === 'Tab') {
            if (buyLandProcessing) {
                const amountValue = +amountLandToBuy.value;
                const totalLandPrice = amountValue * gameData.currentMonthExchangePrices.land;

                if (totalLandPrice > gameData.accountBalances.accountBalance) {
                    amountLandToBuy.value = '';
                    exchangeError.innerText = 'You do not have enough money.';
                    return;
                }

                if (amountValue > 0) {
                    gameData.assets.land.amount += amountValue;
                    gameData.accountBalances.accountBalance -= totalLandPrice;
                    gameData.accountBalances.netIncome -= totalLandPrice;
                    gameData.assistantData.landBought += amountValue;
                    gameData.assistantData.landGain -= totalLandPrice;
                } else {
                    return;
                }
            }
            
            if (buyOilProcessing) {
                const amountValue = +amountOilToBuy.value;
                const totalOilPrice = amountValue * gameData.currentMonthExchangePrices.oil;
                
                if (totalOilPrice > gameData.accountBalances.accountBalance) {
                    amountOilToBuy.value = '';
                    exchangeError.innerText = 'You do not have enough money.';
                    return;
                }

                if (amountValue > 0) {
                    gameData.assets.oil.amount += amountValue;
                    gameData.accountBalances.accountBalance -= totalOilPrice;
                    gameData.accountBalances.netIncome -= totalOilPrice;
                    gameData.assistantData.oilBought += amountValue;
                    gameData.assistantData.oilGain -= totalOilPrice;
                } else {
                    return;
                }
            }
            
            setAccountsBalance(gameData.accountBalances);
            setAssistantData(gameData.assistantData);

            cleanPrompts();
            document.getElementById('exchange-main').classList.add('hidden');
        }

        if (e.key === 'Escape') {
            cleanPrompts();
        }
    }, true);
}

const assignAssetsWindowActions = () => {
    let sellLandProcessing = false;
    let sellOilProcessing = false;

    document.addEventListener('keydown', (e) => {
        const assetsWindow = document.getElementById('assets-main');
        if (assetsWindow.classList.contains('hidden')) {
            return;
        }

        const sellHouseKeyBinding = 'h';
        const sellCarKeyBinding = 'c';
        const sellLandKeyBinding = 'l';
        const sellOilKeyBinding = 'o';

        const assetsError = document.getElementById('assets-error');
        const sellLand = document.getElementById('sell-land');
        const sellOil = document.getElementById('sell-oil');

        const amountLandToSell = document.getElementById('amount-land-sell');
        const amountOilToSell = document.getElementById('amount-oil-sell');

        assetsError.innerText = '';

        const cleanPrompts = () => {
            sellLand.classList.add('hidden');
            sellOil.classList.add('hidden');

            amountLandToSell.value = '';
            amountOilToSell.value = '';

            assetsError.innerText = '';

            sellLandProcessing = false;
            sellOilProcessing = false;
        };

        if (e.key === sellHouseKeyBinding || (e.key === sellHouseKeyBinding.toUpperCase() && e.shiftKey)) {
            gameData.accountBalances.accountBalance += gameData.assets.house.price;
            gameData.accountBalances.netIncome += gameData.assets.house.price;
            gameData.assets.house = undefined;

            setAssets(gameData.assets);
            setAccountsBalance(gameData.accountBalances);
            document.getElementById('assets-main').classList.add('hidden');
            return
        }

        if (e.key === sellCarKeyBinding || (e.key === sellCarKeyBinding.toUpperCase() && e.shiftKey)) {
            gameData.accountBalances.accountBalance += gameData.assets.car.price;
            gameData.accountBalances.netIncome += gameData.assets.car.price;
            gameData.assets.car = undefined;

            setAssets(gameData.assets);
            setAccountsBalance(gameData.accountBalances);
            document.getElementById('assets-main').classList.add('hidden');
            return
        }

        if (e.key === sellLandKeyBinding || (e.key === sellLandKeyBinding.toUpperCase() && e.shiftKey)) {
            if (sellOilProcessing) {
                return;
            }

            sellLand.classList.remove('hidden');
            amountLandToSell.focus();

            sellLandProcessing = true;    
        }
        
        if (e.key === sellOilKeyBinding || (e.key === sellOilKeyBinding.toUpperCase() && e.shiftKey)) {
            if (sellLandProcessing) {
                return;
            }

            sellOil.classList.remove('hidden');
            amountOilToSell.focus();
            
            sellOilProcessing = true;
        }

        if (e.key === 'Enter' || e.key === 'Tab') {
            if (sellLandProcessing) {
                const amountValue = +amountLandToSell.value;
                const totalLandPrice = amountValue * gameData.currentMonthExchangePrices.land;

                if (amountValue > gameData.assets.land.amount) {
                    amountLandToSell.value = '';
                    assetsError.innerText = 'You do not have that much land.';
                    return;
                }

                if (amountValue > 0) {
                    gameData.assets.land.amount -= amountValue;
                    gameData.accountBalances.accountBalance += totalLandPrice;
                    gameData.accountBalances.netIncome += totalLandPrice;
                    gameData.assistantData.landSold += amountValue;
                    gameData.assistantData.landGain += totalLandPrice;
                } else {
                    return;
                }
            }
            
            if (sellOilProcessing) {
                const amountValue = +amountOilToSell.value;
                const totalOilPrice = amountValue * gameData.currentMonthExchangePrices.oil;

                if (amountValue > gameData.assets.oil.amount) {
                    amountOilToSell.value = '';
                    assetsError.innerText = 'You do not have that much oil.';
                    return;
                }

                if (amountValue > 0) {
                    gameData.assets.oil.amount -= amountValue;
                    gameData.accountBalances.accountBalance += totalOilPrice;
                    gameData.accountBalances.netIncome += totalOilPrice;
                    gameData.assistantData.oilSold += amountValue;
                    gameData.assistantData.oilGain += totalOilPrice;
                } else {
                    return;
                }
            }
            
            setAccountsBalance(gameData.accountBalances);
            setAssistantData(gameData.assistantData);

            cleanPrompts();
            document.getElementById('assets-main').classList.add('hidden');
        }

        if (e.key === 'Escape') {
            cleanPrompts();
        }
    }, true);
}

const assignActionHandlers = () => {
    assignBankWindowActions();
    assignMarketWindowActions();
    assignExchangeWindowActions();
    assignAssetsWindowActions();
};

startNewGame();
assignActionHandlers();