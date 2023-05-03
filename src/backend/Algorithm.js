const pattern = {
    MATH : "mathExp",
    DATE : "dateExp",
    ADD : "addExp",
    DEL : "deleteExp",
    UNKNOWN : "unknownExp"
}

function standarizeQuestions(input) { // standarisasi input
    /* STANDARISASIKAN INPUT */
    // lowercase input
    input = input.toLowerCase();

    // hapus space berlebihan di input
    input = input.trim();

    // ganti tanda-tanda spesial
    input = input.replace(/[^+*/\-'^"?\w\s]|_/g, ""); // tanda-tanda yang diperbolehkan: +, -, /, *, ^, ', ", ?

    /* MASUKKAN DAFTAR PERTANYAAN */
    let listOfQuestions = [];
    listOfQuestions.push([input, pattern.UNKNOWN, null]);

    /* PISAHKAN PERTANYAAN */
    const arrayOfQuestions = input.split("?").map((element) => element.trim()); // daftar pertanyaan

    for (let i = 0; i < arrayOfQuestions.length; i++) {
        listOfQuestions.push(findPattern(arrayOfQuestions[i])); // cari pattern dari setiap pertanyaan
    }

    return listOfQuestions;
}

function findPattern(question) { // mencari pattern yang cocok untuk pertanyaan
    const mathExprRegex = /^(\d+|\([^\(\)]*\))(?:\s*[\+\-\*\/]\s*(\d+|\([^\(\)]*\)))*$/;
    const dateRegex = /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    const addRegex = /(.*tambah\s*pertanyaan)\s*(.*?)\s*dengan\s*jawaban\s*(.*)/i;
    const delRegex = /(.*hapus\s*pertanyaan)\s*(.*)/i;

    if (isItUnknown(question)) {
        return [question, pattern.UNKNOWN, null];
    } else if (isItMath(question)) {
        return [question.replace(mathExprRegex, "{math}"), pattern.MATH, question.match(mathExprRegex)[0]];
    } else if (isItDate(question)) {
        return [question.replace(dateRegex, "{date}"), pattern.DATE, question.match(dateRegex)[0]];
    } else if (isItAdd(question)) {
        return [question.replace(addRegex, "{add}"), pattern.ADD, question.match(addRegex)[0]];
    } else {
        return [question.replace(delRegex, "{del}"), pattern.DEL, question.match(delRegex)[0]];
    }
}

function isItMath(question) {
    const mathExprRegex = /^(\d+|\([^\(\)]*\))(?:\s*[\+\-\*\/]\s*(\d+|\([^\(\)]*\)))*$/;
    return mathExprRegex.test(question);
}

function isItDate(question) {
    const dateRegex = /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return dateRegex.test(question);
}

function isItAdd(question) {
    const addRegex = /^(tambah)\s.+?\s(pertanyaan)$/;
    return addRegex.test(question);
}

function isItDelete(question) {
    const delRegex = /hapus pertanyaan/;
    return delRegex.test(question);
}

function isItUnknown(question) {
    let ctr = 0;
    if (isItMath(question)) {
        ctr++;
    }

    if (isItDate(question)) {
        ctr++;
    }

    if (isItAdd(question)) {
        ctr++;
    }

    if (isItDelete(question)) {
        ctr++;
    }

    return ctr != 1;
}

function kmp(input, data) {
    let inputLength = input.length;
    let dataLength = data.length;

    // cek apakah panjangnya sama
    if (inputLength != dataLength) {
        return [false, null];
    }

    let b = computeBorder(input);

    let i = 0;
    let j = 0;

    while (i < dataLength) {
        if (input[j] == data[i][0]) {
            if (j == inputLength - 1) {
                return [true, i];
            }

            i++;
            j++;
        } else if (j > 0) {
            j = b[j-1];
        } else {
            i++;
        }
    }

    return [false, null];
}

function computeBorder(pattern) {
    let b = [pattern.length];
    b[0] = 0;

    let patternLength = pattern.length;
    let j = 0;
    let i = 1;

    while (i < patternLength) {
        if (pattern[j] == pattern[i]) {
            b[i] = j + 1;
            i++;
            j++;
        } else if (j > 0) {
            j = b[j-1];
        } else {
            b[i] = 0;
            i++;
        }
    }

    return b;
}

function bm(input, data) {
    let last = buildLast(input);
    let dataLength = data.length;
    let inputLength = input.length;

    // cek apakah tidak mungkin exact match
    if (dataLength != inputLength) {
        return false;
    }

    let i = inputLength - 1;

    if (i > dataLength - 1) {
        return [false, null];
    }

    let j = inputLength - 1;
    do {
        if (input[j] == data[i][0]) {
            if (j == 0) {
                return [true, i];
            } else {
                i--;
                j--;
            }
        } else {
            let lo = last[data[i][0]];
            i = i + m - Math.min(j, lo+1);
            j = m - 1;
        }
    } while (i <= n - 1);


    return [false, null];
}

function levenshtein(input, data) {
    const m = input.length;
    const n = data.length;

    const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(null));

    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
        if (input[i - 1] === data[j - 1][0]) {
            dp[i][j] = dp[i - 1][j - 1];
        } else {
            dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
        }
    }

    return dp[m][n];
}

// fungsi untuk melakukan pembulatan perkalian seperti (0,33333...) * 3 agar menjadi 1
function properlyRoundCalculation(number) {
    if (Math.abs(number - 1) < 0.001) {
        return Math.round(number);
    }

    return number;
}

// fungsi untuk melakukan perhitungan hari dari input tanggal
function getDayFromDate(datestring) {
    // input berupa DD-MM-YYYY
    const daysList = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const dateComponents = datestring.split('-');
    const standardizedDate = new Date(`${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}`);
    const result = daysList[standardizedDate.getDay()];

    return result;
}

function findResponses(input, KMP, data) {
    // nanti masukin proses ngambil daftar pertanyaan dan response dari query terus masukin ke data
    /* INSERT HERE */

    const listOfQuestions = standarizeQuestions(input);

    let listOfResponses = [data.length];


    for (let i = 0; i < listOfQuestions.length; i++) {
        let [exact, index] = [null, null];
        if (KMP) {
            [exact, index] = kmp(listOfQuestions[i][0], data);
        } else {
            [exact, index] = bm(listOfQuestions[i][0], data);
        }

        if (exact) {
            listOfResponses[i] = data[i][1]; // ambil response dari hasil query dan masukkan ke daftar respons
        } else {
            listOfResponses[i] = null;
        }
    }

    // berikan solusi
    for (let i = 0; i < listOfResponses.length; i++) {
        if (listOfResponses[i] == null) {
            listOfResponses[i] = generateSolution(listOfQuestions[i], data);
        }
    }

    console.log("solusi", listOfResponses);
}

function generateSolution(question, data) {
    let rank = [];

    for (let i = 0; i < data.length; i++) {
        rank.push([i, (data[i][0].length-levenshtein(question[0], data[i][0]))/data[i][0].length]);
    }

    rank.sort((a, b) => (b[1] - a[1]));

    // cek apakah ada yang mirip > 90%
    console.log(rank);
    if (rank[0][1] >= 0.9) {
        return "solusi"; // return solusi, liat querynya ntar harusnya data[i][0]
    } else {
        return "solusi123";
    }
}

let data = [["ques1", "solusi1"], ["ques2", "solusi2"], ["ques3", "solusi3"], ["ques4", "solusi4"]];
findResponses("ques", true, data);

module.exports = {
    standarizeQuestions,
    findPattern,
    isItMath,
    isItDate,
    isItAdd,
    isItDelete,
    isItUnknown,
    kmp,
    computeBorder,
    bm,
    levenshtein,
    properlyRoundCalculation,
    getDayFromDate,
    findResponses,
    generateSolution
}
