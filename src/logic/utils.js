export function getArrAverage(arr) {
    if(arr.length > 0) {
        const sum = arr.reduce(function (a, b) {
            return a + b;
        });
        return sum / arr.length;
    }
}
export function getArrMax(arr) {
    if(arr.length > 0) {
        return arr.reduce(function (a, b) {
            return Math.max(a, b);
        });
    }
}
export function getArrMin(arr) {
    if(arr.length > 0) {
        return arr.reduce(function (a, b) {
            return Math.min(a, b);
        });
    }
}
export function joinAllValues(arr, keys) {
    let joinedValues = [];
    keys.forEach((key) => {
        joinedValues = joinedValues.concat(arr.map((obj) => obj[key]));
    });
    return joinedValues;
}

/**
 * Add commas to a number bigger than 999, and short float number to 2 numbers after the dot.
 * @param num
 * @returns {string}
 */
export function formatNumber (num) {
    let shortNum = num % 1 === 0 ? num : num.toFixed(2);
    return shortNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Add commas to a number bigger than 999, and short float number to 2 numbers after the dot.
 * @param num
 * @returns {string}
 */
export function shortDecimal (num) {
    if(!isNaN(num)) {
        let shortNum = num % 1 === 0 ? num : num.toFixed(2);
        return parseFloat(shortNum);
    }
}

