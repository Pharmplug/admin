
const currenciesSymbol = require('currencies-symbol');


export const symbol = (amt: any) => {
    console.log(currenciesSymbol.symbol("Nigeria")); //&#8358;
    // This will return '&#8358;' which is ₦.
    let symb = currenciesSymbol.symbol("Nigeria")
    return `${symb}${amt}`
}
