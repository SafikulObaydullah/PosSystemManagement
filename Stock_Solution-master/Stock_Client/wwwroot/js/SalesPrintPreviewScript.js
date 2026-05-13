//var CloseInvoiceBottomModal = function () {
//    $(".TopToBottomModal").animate({
//        top: -window.innerHeight
//    }, 500);
//    setTimeout(function () {
//        $(".TopToBottomModal").hide();
//        $(".TopToBottomModal .ContentsDiv").html("")
//    }, 510);
//}

//function cancelAndReload() {
//    // show loader
//    const loader = document.createElement("div");
//    loader.classList.add("loader");
//    document.body.appendChild(loader);

//    // close modal after a delay
//    setTimeout(function () {
//        CloseInvoiceBottomModal();
//        // remove loader
//        document.body.removeChild(loader);
//        // reload page
//        window.location.reload();
//    }, 1000);
//}

    const number = parseFloat(document.getElementById("number").value);
    function convertToWords(num) {
            const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];

    if (num === 0) return "zero";

    if (num < 0) return "minus " + convertToWords(Math.abs(num));

    let words = "";
            if (num >= 1000000) {
        words += convertToWords(Math.floor(num / 1000000)) + " million ";
    num %= 1000000;
            }
            if (num >= 1000) {
        words += convertToWords(Math.floor(num / 1000)) + " thousand ";
    num %= 1000;
            }
            if (num >= 100) {
        words += convertToWords(Math.floor(num / 100)) + " hundred ";
    num %= 100;
            }
            if (num >= 20) {
        words += tens[Math.floor(num / 10)] + " ";
    num %= 10;
            }
            if (num >= 10) {
        words += teens[num - 10];
    return words;
            }
            if (num > 0) {
        words += ones[num];
            }
    return words.trim();
        }
    if (Number.isInteger(number)) {
            const words = convertToWords(number);
    document.getElementById("words").textContent = words + " Kina only";
        } else {
            const wholeNumber = Math.floor(number);
    const decimal = (number - wholeNumber).toFixed(2);
    const words = convertToWords(wholeNumber) + " Kina " + convertToWords(decimal.substring(2)) + " Toea only";
    document.getElementById("words").textContent = words;
        }


