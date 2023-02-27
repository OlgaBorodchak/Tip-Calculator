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
let people = 0;


customTip.addEventListener("input", calculateCustomTip);
reset.addEventListener("click", resetForm);


billInput.addEventListener("input", () => {
    reset.disabled = false;
    bill = billInput.value;
    if (bill > 0 && people > 0) {
        calculateTip();
    }
});


tipPercent.forEach(btn => {
    btn.addEventListener("click", (e) => {
        tip = e.target.value;
        reset.disabled = false;
        removeFocus();
        btn.classList.add("active");
        customTip.value = "";

        if (bill > 0 && people > 0) {
            calculateTip();
        }
    })
        removeFocus = () => {
        tipPercent.forEach(btn => {
            btn.classList.remove("active");
        }) 
    }
})


numberOfPeople.addEventListener("input", () => {
    reset.disabled = false;
    people = numberOfPeople.value; 

    if (people == 0) {
        errorMsg.style.display = "block";
        numberOfPeople.classList.add("input-field-error-msg");
    } else {
        numberOfPeople.classList.remove("input-field-error-msg");
        errorMsg.style.display = "none";
    }
    calculateTip()
});


function calculateTip() {

    let amountPerPerson = bill / people;
    let tipPerPerson = (bill * tip) / people;
    let total = amountPerPerson + tipPerPerson;

    tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;
}


function calculateCustomTip() {
    reset.disabled = false;

    tip = (customTip.value / 100);

    removeFocus();

    if (customTip.value !== 0) {
        calculateTip();
    }
}


function resetForm() {
    removeFocus();
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
    billInput.value = "";
    numberOfPeople.value = "";
    customTip.value = "";
    numberOfPeople.classList.remove("input-field-error-msg");
    errorMsg.style.display = "none";
    setTimeout(() => reset.disabled = true, 300)
};

