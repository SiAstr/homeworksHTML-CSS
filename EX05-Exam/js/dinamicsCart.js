let circleTag = document.querySelectorAll(".circle-tag");
let itemsList = document.querySelector(".items-list");
let finalPayment = document.querySelector(".final-payment")
let logoDiv = document.querySelector(".logo")
let totPrice = document.querySelector(".total-price")
let numberTag = document.querySelector(".number-tag")
let submitBtn = document.querySelector("#submitBtn")

let plantArchive = "http://localhost:3000/plants";
let forCart = [];
let finalCart = []

window.addEventListener('DOMContentLoaded', function () {
    forCart = takeItems()
    if (forCart == null) {
        forCart = [];
    }
})

fetch(plantArchive)
    .then(data => {
        return data.json();
    })
    .then(response => {
        if(forCart.length > 0){
            let counter = 0;
            response.forEach((plant) => {
                for (let i = 0; i < forCart.length; i++) {
                    if (plant.id == forCart[i]) {
                        counter++
                        createCartItem(plant, counter)
                        finalCart.push(plant)
                    }
                }
            });
        } else {
            alertEmptyCart()
            finalPayment.style.display = "none"
        }
    })
    .finally(function () {
        calculateTotal()
        cartNumberTag()
    })
    
function saveItems() {
    let forCartJSON = JSON.stringify(forCart);
    localStorage.setItem("userCart", forCartJSON)
}

function takeItems() {
    let importedCartJSON = localStorage.getItem("userCart")
    let importedCartOBJ = JSON.parse(importedCartJSON)
    return importedCartOBJ
}

function cartNumberTag() {
    circleTag.forEach(tag => {
        if (forCart.length > 0) {
            tag.style.visibility = "visible";
            tag.textContent = forCart.length
        } else {
            tag.style.visibility = "hidden";
        }
    })
}

function createCartItem(plant, counter) {
    plant.amountPurchased++;
    let itemBox = document.createElement("div");
    let item = document.createElement("div");
    let imgDiv = document.createElement("div");
    let itemImg = document.createElement("img");
    let itemName = document.createElement("div");
    let itemCounter = document.createElement("div");
    let minus = document.createElement("i");
    let quantity = document.createElement("div");
    let plus = document.createElement("i");
    let itemTotal = document.createElement("div");
    let priceDiv = document.createElement("div");
    let priceTag = document.createElement("p");
    let amount = document.createElement("span");
    let trashDiv = document.createElement("div");
    let trashIcon = document.createElement("i");
    let spacer = document.createElement("div");

    itemBox.setAttribute("class", "item-box");
    item.setAttribute("class", "item");
    imgDiv.setAttribute("class", "item-img");
    itemImg.setAttribute("src", plant.img);
    itemName.setAttribute("class", "item-name");
    itemCounter.setAttribute("class", "item-counter");
    minus.setAttribute("class", "bi bi-dash minus");
    quantity.setAttribute("class", "quantity");
    plus.setAttribute("class", "bi bi-plus plus");
    itemTotal.setAttribute("class", "item-total");
    priceDiv.setAttribute("class", "price");
    priceTag.setAttribute("class", "price-tag");
    amount.setAttribute("class", "amount");
    trashDiv.setAttribute("class", "trash-bin");
    trashIcon.setAttribute("class", "bi bi-trash");
    spacer.setAttribute("class", "spacer");

    itemName.textContent = plant.nome;
    quantity.textContent = 1;
    priceTag.textContent = "€";
    amount.textContent = plant.prezzo * Number(quantity.textContent);

    minus.addEventListener("click", function(){
        let actualValue = quantity.textContent;
        if(actualValue > 1){
            plant.amountPurchased--;
            actualValue--
            quantity.textContent = actualValue
            amount.textContent = (plant.prezzo * quantity.textContent).toFixed(2);
            calculateTotal()
        }
    })
    
    plus.addEventListener("click", function(){
        plant.amountPurchased++;
        let actualValue = quantity.textContent;
        actualValue++
        quantity.textContent = actualValue
        amount.textContent = (plant.prezzo * quantity.textContent).toFixed(2);
        calculateTotal()
    })

    trashDiv.addEventListener("click", function(){
        forCart = forCart.filter(id => id !== plant.id);
        saveItems()
        location.reload();
    })

    priceTag.appendChild(amount)
    priceDiv.appendChild(priceTag)
    itemTotal.appendChild(priceDiv)

    itemCounter.appendChild(minus)
    itemCounter.appendChild(quantity)
    itemCounter.appendChild(plus)
    
    imgDiv.appendChild(itemImg)
    trashDiv.appendChild(trashIcon)

    item.appendChild(imgDiv)
    item.appendChild(itemName)
    item.appendChild(itemCounter)
    item.appendChild(itemTotal)
    item.appendChild(trashDiv)

    itemBox.appendChild(item)

    if(counter < forCart.length){
        itemBox.appendChild(spacer)
    }
    
    itemsList.appendChild(itemBox)
}

function alertEmptyCart(){
    let alertDiv = document.createElement("div")
    let alertMessage = document.createElement("p")
    let alertLinkSpan = document.createElement("span")
    let alertLink = document.createElement("a")

    alertDiv.setAttribute("class", "alert-empty")
    alertLink.setAttribute("href", "./index.html")
    alertMessage.textContent = "You Cart is Empty, please return to the "
    alertLink.textContent = "Main Page!"
    alertLink.style.borderBottom ="2px solid #00000096"

    alertLinkSpan.appendChild(alertLink)
    alertMessage.appendChild(alertLinkSpan)
    alertDiv.appendChild(alertMessage)
    itemsList.appendChild(alertDiv)
}

logoDiv.addEventListener("click", function(){
    window.location.href = "./index.html";   
})




function calculateTotal(){
    let prices = document.querySelectorAll(".amount");
    let quantities = document.querySelectorAll(".quantity");
    let total = 0;
    let howMuch = 0;
    
    prices.forEach(price =>{
        total += Number(price.textContent)
    })

    quantities.forEach(quantity =>{
        howMuch += Number(quantity.textContent)
    })
    
    total = total.toFixed(2);
    
    numberTag.textContent = howMuch
    totPrice.textContent =  total;
    return total;
}




function storeData() {

    let p_name = nameInput.value
    let p_surname = surnameInput.value
    let p_address = addressInput.value
    let p_pCode = postalCodeInput.value
    let p_city = cityInput.value
    let p_email = emailInput.value
    let p_cardN = cardNumberInput.value
    let p_expDate = expirDateInput.value
    let p_code = cvvInput.value
    let p_CardOwner = cardHolderNameInput.value
    let p_billAddress = billingAddressInput.value
    
    
    let purchase = {
        id: p_name+p_surname+p_code,
        personalInfo : {
            name: p_name,
            surname: p_surname,
            address: p_address,
            postalCode: p_pCode,
            city: p_city,
            email: p_email
        },
        
        paymentInfo : {
            cardNumber: p_cardN,
            expiryDate: p_expDate,
            cvvCode: p_code,
            cardOwnerName: p_CardOwner,
            billingAddress: p_billAddress,
            total : calculateTotal()
        },
        
        itemsPurchased: finalCart
    }
    
    
    fetch("http://localhost:3000/purchases",{
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(purchase)
    })
    .then(data => {
        return data.json()
    })
}


// GESTIONE PAGAMENTO

// Selettori per i dati di spedizione
let nameInput = document.querySelector('#name');
let surnameInput = document.querySelector('#surname');
let addressInput = document.querySelector('#address');
let postalCodeInput = document.querySelector('#postalCode');
let cityInput = document.querySelector('#city');
let emailInput = document.querySelector('#email');

// Selettori per i dati di pagamento
let cardNumberInput = document.querySelector('#cardNumber');
let expirDateInput = document.querySelector('#expirDate');
let cvvInput = document.querySelector('#cvv');
let cardHolderNameInput = document.querySelector('#cardHolderName');
let billingAddressInput = document.querySelector('#billingAddress');

// Seleziono TUTTI gli input
let inputs = document.querySelectorAll('form input');

submitBtn.addEventListener('click', function(event) {
    let isEmpty = false;
    
    inputs.forEach(input => {
        if(input.value.trim() === ''){
            isEmpty = true;
        }
    });

    if(isEmpty) {
        alert('Please fill out all fields before submitting the form.');
        event.preventDefault();
        event.stopImmediatePropagation();    
    } else {
        let emailInput = document.querySelector('#email');
        let emailValue = emailInput.value.trim();
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailValue)) {
            alert('Please enter a valid email address.');
            event.preventDefault();
            return;
        }

        let expirDateInput = document.querySelector('#expirDate');
        let expirDateValue = expirDateInput.value.trim();
        let currentYear = new Date().getFullYear();
        let expirYear = parseInt(expirDateValue.split('/')[1], 10) + 2000;

        if (isNaN(expirYear) || expirYear < currentYear) {
            alert('Please enter a valid expiration date.');
            event.preventDefault();
        } else {
            storeData();
            localStorage.removeItem("userCart")
            window.location.href = "./index.html"
            alert("Thank you for your Purchase!");
        }
    }
});
