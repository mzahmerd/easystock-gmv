exports.formatMoney = function(
    amount,
    decimalCount = 0,
    decimal = ".",
    thousands = ","
) {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(
            (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
        ).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
            negativeSign +
            (j ? i.substr(0, j) + thousands : "") +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount ?
                decimal +
                Math.abs(amount - i)
                .toFixed(decimalCount)
                .slice(2) :
                "")
        );
    } catch (e) {
        console.log(e);
    }
};

exports.convertDate = function(str) {
    try {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
    } catch (error) {
        console.log(error);
    }

    return [day, mnth, date.getFullYear()].join("-");
};