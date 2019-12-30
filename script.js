// V 1.0
// Changelog:
// Added basic functions (+,-,*,/)
// 
// 
// 
// 
// 
// 
// 
// 
//Functional constants and variables
const add = (a,b) => { total = a+b; return total};
const subtract = (a,b) => { total = b-a; return total};
const multiply = (a,b) => { total = a*b; return total};
const divide = (a,b) => { total = b/a; return total};
const numBtns = document.querySelectorAll(".numbutton");
const operBtns = document.querySelectorAll(".operbutton");
const equalBtn = document.querySelector("equalbutton");
let displayValue = document.getElementById("numBox").value;
let operValue = 0;
let operType = 0;
let total = 0;
let operation = [];

//Button methods
numBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
        displayValue = 0;
        if (document.getElementById("numBox").value == "0") {
            document.getElementById("numBox").value = button.id;
        }
        else if (document.getElementById("numBox").value !== "0") {
            disp(button.id);
            displayValue = 0;
        }
        });
    });

operBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
        operValue = Number(document.getElementById("numBox").value);
        operType = button.id;
        operation.push(operValue,operType);
        clearDisp();
    })
})


//Operational function
function operate(operType,a,b) {
    operValue = Number(document.getElementById("numBox").value);
    operation.push(operValue);
    for (var i=0;i<operation.length;i++) {
        multIndex = operation.findIndex(checkMulti);
        divIndex = operation.findIndex(checkDiv);
        if (divIndex < multIndex && divIndex !== -1 || divIndex > multIndex && multIndex == -1) {
            opTot = divide(operation[divIndex+1],operation[divIndex-1]);
            operation.splice(divIndex-1,3,opTot);
        }
        else if (multIndex < divIndex && multIndex !== -1 || divIndex < multIndex && divIndex == -1) {
            opTot = multiply(operation[multIndex-1],operation[multIndex+1]);
            operation.splice(multIndex-1,3,opTot);
        }
        else if (multIndex == -1 && divIndex == -1) {break}
    }
    for (var i=1;i<operation.length;i+2) {
        if (operation[i] == "add") {opTot = add(operation[i-1],operation[i+1]); operation.splice(operation-1,3,opTot)}
        else if (operation[i] == "sub") {opTot = subtract(operation[i+1],operation[i-1]); operation.splice(operation-1,3,opTot);}
        else break
    }
    clearDisp();
    disp(Number(operation))
    operation=[];
} 

//Display Functions
function clearDisp() {
    document.getElementById("numBox").value = ""
}

function disp(a) {
    displayValue = a;
    document.getElementById("numBox").value += displayValue;
}

function clearAll() {
    total = 0;
    displayValue = 0;
    operType = 0;
    operValue = 0;
    operation = [];
    document.getElementById("numBox").value = "";
}

//Functions used for logical order of the operation
function checkMulti(operator) {
    return operator == "multi"
}

function checkDiv(operator) {
    return operator == "divide"
}