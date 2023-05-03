const { error } = require("console");

/* -------- REGEX SECTION -------- */
const pattern = {
    MATH : "mathExp",
    DATE : "dateExp",
    ADD : "addExp",
    DEL : "deleteExp",
    UNKNOWN : "unknownExp"
}

const regex = {
    mathExprRegex : /^(\d+|\([^\(\)]*\))(?:\s*[+\-*/]+\s*(\d+|\([^\(\)]*\))|\s*[+\-*/]\s*[+\-*/]+?\s*(\d+|\([^\(\)]*\)))*$/,
    dateRegex : /^(0?[1-9]|[12][0-9]|3[01])\|(0?[1-9]|1[012])\|\d{4}$/,
    addRegex : /(.*tambah\s*pertanyaan)\s*(.*?)\s*dengan\s*jawaban\s*(.*)/i,
    delRegex : /(.*hapus\s*pertanyaan)\s*(.*)/i
}

function standarizeQuestions(input) { // standarisasi input
    /* STANDARISASIKAN INPUT */
    // lowercase input
    input = input.toLowerCase();

    // hapus space berlebihan di input
    input = input.trim();

    // ganti tanda-tanda spesial
    input = input.replace(/[^+*/\-'^()"?|\w\s]|_/g, ""); // tanda-tanda yang diperbolehkan: +, -, /, *, ^, ', ", ?, |

    /* MASUKKAN DAFTAR PERTANYAAN */
    let listOfQuestions = [];

    /* PISAHKAN PERTANYAAN */
    const arrayOfQuestions = input.split("?").map((element) => element.trim()); // daftar pertanyaan

    // hapus pertanyaan kosong terakhir, karena pertanyaan dipisahkan dengan ?, maka pertanyaan seperti siapa presiden indonesia yang pertama? "akan di split menjadi siapa presiden indonesia yang pertama" dan ""
    if (arrayOfQuestions[arrayOfQuestions.length-1] == "" && arrayOfQuestions.length != 1) {
        arrayOfQuestions.pop();
    }

    for (let i = 0; i < arrayOfQuestions.length; i++) {
        listOfQuestions.push(findPattern(arrayOfQuestions[i])); // cari pattern dari setiap pertanyaan
    }

    return listOfQuestions;
}

function findPattern(question) { // mencari pattern yang cocok untuk pertanyaan
    if (isItUnknown(question)) {
        return [question, pattern.UNKNOWN, null];
    } else if (isItDate(question)) {
        return [question.replace(regex.dateRegex, "{date}"), pattern.DATE, question.match(regex.dateRegex)[0]];
    } else if (isItMath(question)) {
        return [question.replace(regex.mathExprRegex, "{math}"), pattern.MATH, question.match(regex.mathExprRegex)[0]];
    } else if (isItAdd(question)) {
        return [question.replace(regex.addRegex, "{add}"), pattern.ADD, question.match(regex.addRegex)[0]];
    } else {
        return [question.replace(regex.delRegex, "{del}"), pattern.DEL, question.match(regex.delRegex)[0]];
    }
}

function isItMath(question) {
    return regex.mathExprRegex.test(question);
}

function isItDate(question) {
    return regex.dateRegex.test(question);
}

function isItAdd(question) {
    return regex.addRegex.test(question);
}

function isItDelete(question) {
    return regex.delRegex.test(question);
}

function isItUnknown(question) {
    let ctr = 0;
    if (isItDate(question)) {
        ctr++;
    }

    if (isItMath(question)) {
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
/* -------- END OF REGEX SECTION -------- */


/* -------- KMP SECTION -------- */
function kmp(input, data) {
    let inputLength = input.length;
    
    let k = 0;
    let found = false;
    let foundidx = null;
    while (k < data.length && !found) {
        let dataLength = data[k][0].length;

        // cek apakah panjangnya sama
        if (inputLength != dataLength) {
            k++;
        } else {
            let b = computeBorder(input);
    
            let i = 0;
            let j = 0;
    
            while (i < dataLength) {
                if (input[j] == data[k][0][i]) {
                    if (j == inputLength - 1) {
                        found = true;
                        foundidx = k;
                    }
    
                    i++;
                    j++;
                } else if (j > 0) {
                    j = b[j-1];
                } else {
                    i++;
                }
            }
            k++;
        }
    }
    return [found, foundidx];
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
/* -------- END OF KMP SECTION -------- */


/* -------- BM SECTION -------- */
function bm(input, data) {
    let last = buildLast(input);
    let inputLength = input.length;

    let k = 0;
    let found = false;
    let foundidx = null;
    while (k < data.length && !found) {
        let dataLength = data[k][0].length;
        let i = inputLength-1;
        if (i > dataLength-1) {
            k++;
        } else {
            let j = inputLength-1;
            do {
                if (input[j] == data[k][0][i]){
                    if (j == 0) {
                        found = true;
                        foundidx = k;
                    }
                    else {
                        i--;
                        j--;
                    }
                } else {
                    let lo = last[data[k][0][i]];
                    i = i + inputLength - Math.min(j, 1+lo);
                    j = inputLength - 1;
                }
            } while (i <= dataLength-1 && !found);
            k++;
        }
    }
    return [found, foundidx];
}

function buildLast(pattern) {
    let last = [];
    for (let i = 0; i < 128; i++) {
        last[i] = -1;
    }

    for (let i = 0; i < pattern.length; i++) {
        last[pattern[i]] = i;
    }

    return last;
}
/* -------- END OF BM SECTION -------- */


/* -------- LEVENSHTEIN SECTION -------- */
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
/* -------- END OF LEVENSHTEIN SECTION -------- */


/* -------- CALCULATOR & DATE SECTION -------- */
const calculationError = {
    mathError : "Sintaks tidak valid",
    dateError : "Tanggal tidak valid"
}

// fungsi untuk melakukan perhitungan matematika
function calculate(number) {
    try {
        const result = eval(number);
        return result;
    } catch {
        return calculationError.mathError;
    }
}

// fungsi untuk melakukan perhitungan hari dari input tanggal
function getDayFromDate(datestring) {
    // input berupa DD/MM/YYYY
    const [day, month, year] = datestring.split("|");
    const daysList = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const standardizedDate = new Date(year, month-1, day);

    if (standardizedDate.getDay() !== undefined) {
        return daysList[standardizedDate.getDay()];
    } else {
        return calculationError.dateError;
    }
}
/* -------- END OF CALCULATOR & DATE SECTION -------- */


/* -------- FINDING PROPER RESPONSES SECTION -------- */
// fungsi untuk mencari pertanyaan yang exact match menggunakan kmp/bm
function findResponses(input, KMP, data) {
    // nanti masukin proses ngambil daftar pertanyaan dan response dari query terus masukin ke data
    /* INSERT HERE */

    const listOfQuestions = standarizeQuestions(input);
    console.log("pertanyaan", listOfQuestions);

    let listOfResponses = [];

    for (let i = 0; i < listOfQuestions.length; i++) {
        let [exact, index] = [null, null];
        if (KMP) {
            [exact, index] = kmp(listOfQuestions[i][0], data);
        } else {
            [exact, index] = bm(listOfQuestions[i][0], data);
        }

        if (exact) {
            listOfResponses[i] = generateResponse(listOfQuestions[i], data, index); // ambil response dari hasil query dan masukkan ke daftar respons            
        } else {
            listOfResponses[i] = null;
        }
    }

    // berikan solusi
    for (let i = 0; i < listOfResponses.length; i++) {
        if (listOfResponses[i] == null) {
            listOfResponses[i] = findClosestSolution(listOfQuestions[i], data);
        }
    }

    console.log(listOfResponses);
}

// fungsi untuk mencari pertanyaan ketika tidak ada yang exact match
function findClosestSolution(question, data) {
    let rank = [];

    for (let i = 0; i < data.length; i++) {
        rank.push([i, (data[i][0].length-levenshtein(question[0], data[i][0]))/data[i][0].length]);
    }

    rank.sort((a, b) => (b[1] - a[1]));

    // cek apakah ada yang mirip > 90%
    if (rank[0][1] >= 0.9) {
        return generateResponse(question, data, rank[0][0]); // generate response untuk pertanyaan yang >= 90% mirip
    } else {
        // generate 3 pertanyaan termirip
        let solutions = "Pertanyaan tidak ditemukan di database.\nBerikut pertanyaan yang mirip:\n";
        for (let i = 0; i < rank.length && i < 3; i++) {
            solutions = solutions.concat(i+1);
            solutions = solutions.concat(". ");
            solutions = solutions.concat(data[rank[i][0]][0]);
            solutions = solutions.concat("\n");
        }
        return solutions;
    }
}

// fungsi untuk melakukan kalkulasi untuk pertanyaan seperti kalkulator, tanggal, dll
function generateResponse(question, data, idx) {
    let solutions = "";
    if (question[1] == pattern.MATH) {
        if (calculate(question[2]) == calculationError.mathError) {
            solutions = solutions.concat(calculationError.mathError);
        } else {
            solutions = solutions.concat(data[idx][1]);
            solutions = solutions.concat(calculate(question[2]));
        }
    } else if (question[1] == pattern.DATE) {
        if (getDayFromDate(question[2]) == calculationError.dateError) {
            solutions = solutions.concat(calculationError.dateError);
        } else {
            solutions = solutions.concat(data[idx][1]);
            solutions = solutions.concat(getDayFromDate(question[2]));
        }
    } else if (question[1] == pattern.ADD) {
        // // TODO: query masuk database
        // if (exists) {
        //     // update
        // } else {
        //     // insert
        // }
        solutions = 1; // sementara
    } else if (question[1] == pattern.DEL) {
        // // TODO: query delete dari database
        // if (exists) {
        //     // delete
        // } else {
        //     solutions = solutions.concat("Tidak ada pertanyaan tersebut di database");
        // }
        solutions = 2; // sementara
    } else {
        solutions = solutions.concat(data[idx][1]);
    }
    return solutions;
}
/* -------- END OF FINDING PROPER RESPONSES SECTION -------- */




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
    calculate,
    getDayFromDate,
    findResponses,
    findClosestSolution,
    generateResponse
}

// /* TESTING PURPOSES */
// let data = [["ques1", "solusi1"], ["ques2", "solusi2"], ["ques3", "solusi3"], ["ques4", "solusi4"], ["{date}", "hari "], ["{math}", "hasil "]];
// findResponses("(1 - -1)*2?", true, data);