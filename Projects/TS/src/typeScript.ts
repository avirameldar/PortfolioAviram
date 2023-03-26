const cryptoTable = document.querySelector("#newCryptoCoin")!;
const searchByCoinName = document.querySelector("#searchBtn");
const coinSymbol = document.querySelector("#currency-name") as HTMLInputElement;
const minPrice = document.querySelector("#min-price") as HTMLInputElement;
const maxPrice = document.querySelector("#max-price") as HTMLInputElement;
const priceRageSearch = document.querySelector("#price-search-button") as HTMLButtonElement;
const minVolume = document.querySelector("#min-volume") as HTMLInputElement;
const maxVolume = document.querySelector("#max-volume") as HTMLInputElement;
const searchByVolume = document.querySelector("#volume-search-button") as HTMLButtonElement;
const top10ByVolume = document.querySelector("#top-10-button") as HTMLButtonElement;
const sortBy = document.querySelector("#sort-by") as HTMLSelectElement;
const sortButton = document.querySelector("#sort-button") as HTMLButtonElement;
const ascendingSort = document.querySelector("#sort-ascending") as HTMLInputElement;

class CryptoCoin {
    symbol: string;
    lastPrice: number;
    volume: number;
    priceChangePercent: number;

    constructor(symbol: string, lastPrice: number, volume: number, priceChangePercent: number) {
        this.symbol = symbol;
        this.lastPrice = lastPrice;
        this.volume = volume;
        this.priceChangePercent = priceChangePercent;
    }
}

function getData() {
    return new Promise((resolve, reject) => {
        const cryptoCoins = new XMLHttpRequest();
        cryptoCoins.open("GET", "https://api2.binance.com/api/v3/ticker/24hr");
        cryptoCoins.onload = function () {
            if (cryptoCoins.status == 200) {
                resolve(JSON.parse(cryptoCoins.response));
            }
            else {
                reject(cryptoCoins.status);
            }
        }

        cryptoCoins.send();
    });
}

let coinsArray: CryptoCoin[] = [];
function createCryptoArray() {
    getData().then((response: any) => {
        console.log(response);
        coinsArray = response.map((coin: any) => {
            return new CryptoCoin(coin.symbol, +coin.lastPrice, +coin.volume, +coin.priceChangePercent)
        })
        displayData(coinsArray);
    }).catch((status: any) => {
        console.log(status);
    });
}

createCryptoArray();
function getData2() {
};
function displayData(array: CryptoCoin[]) {
    cryptoTable.innerHTML = "";
    array.map((coin: any) => {
        let newCryptoTable = document.createElement("tr");
        newCryptoTable.innerHTML = `<th>${coin.symbol}</th>
                                <th>${coin.lastPrice}</th>
                                <th>${coin.volume}</th>
                                <th>${coin.priceChangePercent}</th>`;
        newCryptoTable.className = "newCryptoTable";
        cryptoTable?.appendChild(newCryptoTable);
    })
}

//search by coin name name 


searchByCoinName?.addEventListener("click", () => {
    displayData(coinsArray.filter((coin) => {
        return coin.symbol.includes(coinSymbol.value);
    }));
})

const newCoin = new CryptoCoin("abah", 123, 12, 3.6);
console.log(newCoin);

//search by price 

priceRageSearch.addEventListener("click", () => {
    displayData(coinsArray.filter((coin) => {
        if (minPrice.value != "" && maxPrice.value == "") {
            return coin.lastPrice > +minPrice.value;
        }
        if (minPrice.value == "" && maxPrice.value != "") {
            return coin.lastPrice < +maxPrice.value;
        }
        return coin.lastPrice > +minPrice.value && coin.lastPrice < +maxPrice.value;
    }));

});

//search by volume 

searchByVolume.addEventListener("click", () => {
    displayData(coinsArray.filter((coin) => {
        if (minVolume.value != "" && maxVolume.value == "") {
            return coin.volume > +minVolume.value;
        }
        if (minVolume.value == "" && maxVolume.value != "") {
            return coin.volume < +maxVolume.value;
        }
        return coin.volume > +minVolume.value && coin.volume < +maxVolume.value;

    }))
})

//top 10 exchange rates by volume 
top10ByVolume.addEventListener("click", () => {
    let newCoinArray: CryptoCoin[];
    newCoinArray = coinsArray;
    console.log(newCoinArray);
    newCoinArray.sort((a, b) => { return b.volume - a.volume })
    displayData(newCoinArray.slice(0, 10));
});

// sort by

sortButton.addEventListener("click", () => {
    let sortByArray: CryptoCoin[];
    sortByArray = coinsArray;
    displayData(sortByArray.sort((a, b) => {
        if (ascendingSort.checked) {
            let temp = a;
            a = b;
            b = temp;
        }

        switch (sortBy.value) {
            case "volume":
                return b.volume - a.volume;
            case "lastPrice":
                return b.lastPrice - a.lastPrice;
            case "priceChangePercent":
                return b.priceChangePercent - a.priceChangePercent;
            default:
                let x = a.symbol.toLowerCase();
                let y = b.symbol.toLowerCase();
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;;
        }
    }))
});