const billInput = document.querySelector("#bill");
const tipPercent = document.querySelectorAll(".btn");
const customTip = document.querySelector("#custom");
const numberOfPeople = document.querySelector("#person");
const reset = document.querySelector(".reset-btn");
const tipAmount = document.querySelector("#tip");
const totalAmount = document.querySelector("#total");
const errorMsg = document.querySelector(".error-msg");

let tip = 0;
let bill = 0;

reset.addEventListener("click", resetForm);
billInput.addEventListener("input", calculateTip);
numberOfPeople.addEventListener("input", calculateTip);
customTip.addEventListener("input", calculateCustomTip);

tipPercent.forEach(btn => {
    btn.addEventListener("click", (e) => {
        tip = e.target.value;
        reset.disabled = false;
        removeFocus();
        btn.classList.add("active");
        customTip.value = "";
        calculateTip();
    })
        removeFocus = () => {
        tipPercent.forEach(btn => {
            btn.classList.remove("active");
        }) 
    }
})

function calculateTip() {
    reset.disabled = false;

    bill = billInput.value;
    people = +numberOfPeople.value; 

    //если убрать +, то people === 0 не работает, надо указывать как стринг 
    //people === "0", либо people == 0.  тут не знаю, какая практика лучше

    if (people === 0) {
        errorMsg.style.display = "block";
        numberOfPeople.classList.add("input-field-error-msg");
    } else {
        numberOfPeople.classList.remove("input-field-error-msg");
        errorMsg.style.display = "none";
    }

    let amountPerPerson = bill / people;
    let tipPerPerson = (bill * tip) / people;
    let total = amountPerPerson + tipPerPerson;

    tipAmount.textContent = tipPerPerson.toFixed(2);
    totalAmount.textContent = total.toFixed(2);
}

function calculateCustomTip() {
    tip = (customTip.value / 100);

    removeFocus();

    if (customTip.value !== 0) {
        calculateTip();
    }
}

function resetForm() {
    removeFocus();
    setTimeout(() => reset.disabled = true, 300) 
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
    billInput.value = "";
    numberOfPeople.value = "";
    numberOfPeople.classList.remove("input-field-error-msg");
    errorMsg.style.display = "none";
    customTip.value = "";
};









