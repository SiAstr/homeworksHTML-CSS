let sliderPiece = document.querySelector(".slider-piece");
let plantGallery = document.querySelector(".plant-gallery")
let circleTag = document.querySelectorAll(".circle-tag");
let cartDesk = document.querySelector(".cart-nav-desktop");
let cartSide = document.querySelector(".cart-nav-side");
let cartMobile = document.querySelector(".cart-nav-mobile");
let cartMainBtn = document.querySelector(".button-to-cart");


let plantArchive = "http://localhost:3000/plants";
let plantImgs = [];
let interval = 1400;
let forCart = [];

sliderPiece.setAttribute("src", "../assets/plants-photo/Serpens.avif");

window.addEventListener('DOMContentLoaded', function(){
    forCart = takeItems()
    if(forCart == null){
        forCart = [];
    }
})


fetch(plantArchive)
    .then(data => {
        return data.json();
    })
    .then(response => {
        response.forEach(plant => {
            plantImgs.push(plant.img);
            createPlantCard(plant);
        });
        setInterval(randomizeSliderPlants, interval);
    })
    .finally(function(){
        cartNumberTag()
    })

    let lastRandomIndex = -1;

    function randomizeSliderPlants() {
        if (plantImgs.length > 1) {
            let random;
            do {
                random = Math.floor(Math.random() * plantImgs.length);
            } while (random === lastRandomIndex);
    
            lastRandomIndex = random;
            sliderPiece.setAttribute("src", plantImgs[random]);
        } else if (plantImgs.length === 1) {
            sliderPiece.setAttribute("src", plantImgs[0]);
        }
    }

function createPlantCard(plant){
    let plantCard = document.createElement("div");
    let plantCardInner = document.createElement("div");
    let plantImgBox = document.createElement("div");
    let plantImg= document.createElement("img");
    let plantTexBox = document.createElement("div");
    let textBox = document.createElement("div");
    let plantName = document.createElement("h5");
    let plantFamily = document.createElement("p");
    let plantPrice = document.createElement("p");
    let plantAmount = document.createElement("span");
    let plantDescr = document.createElement("p");
    let plantButtonDiv = document.createElement("div");
    let plantButtonCta = document.createElement("div");
    let plantAlert = document.createElement("p");

    plantCard.setAttribute("class", "plant-card")
    plantCardInner.setAttribute("class", "plant-card-inner")
    plantImgBox.setAttribute("class", "plant-img-box")
    plantImg.setAttribute("class", "plant-img")
    plantImg.setAttribute("src", plant.img)
    plantTexBox.setAttribute("class", "plant-text-box")
    textBox.setAttribute("class", "text-box")
    plantName.setAttribute("class", "p-name")
    plantFamily.setAttribute("class", "p-family")
    plantPrice.setAttribute("class", "p-price")
    plantAmount.setAttribute("class", "p-amount")
    plantDescr.setAttribute("class", "p-descr")
    plantButtonDiv.setAttribute("class", "p-button-div")
    plantAlert.setAttribute("class", "p-alert")
    plantButtonCta.setAttribute("class", "p-cta add")

    
    plantName.textContent = plant.nome;
    plantFamily.textContent = plant.family;
    plantPrice.textContent = "Price: €";
    plantAmount.textContent = plant.prezzo;
    plantDescr.textContent = plant.shortDescr;
    plantButtonCta.textContent = "Add to Cart";
    plantAlert.textContent = "Element added!"

    for(let i = 0; i < forCart.length; i++){
        // forCart[i]
        if(plant.id == forCart[i]){
            if(plantButtonCta.classList.contains("add")){
                plantAlert.style.visibility = "visible";
                plantButtonCta.classList.remove("add");
                plantButtonCta.classList.add("remove");
                plantButtonCta.textContent = "Remove item";
            }
        }
    }

    plantButtonCta.addEventListener("click", function(){
        if(plantButtonCta.classList.contains("add")){
            plantAlert.style.visibility = "visible";
            plantButtonCta.classList.remove("add");
            plantButtonCta.classList.add("remove");
            plantButtonCta.textContent = "Remove item";
            forCart.push(plant.id)
        } else {
            plantAlert.style.visibility = "hidden";
            plantButtonCta.classList.remove("remove");
            plantButtonCta.classList.add("add");
            plantButtonCta.textContent = "Add to Cart";

            forCart = forCart.filter(id => id !== plant.id)
        }

        cartNumberTag()
    })
    
    plantCardInner.appendChild(plantImgBox)
    plantCardInner.appendChild(plantTexBox)
    
    plantImgBox.appendChild(plantImg)
    plantTexBox.appendChild(textBox)
    plantTexBox.appendChild(plantPrice)
    
    textBox.appendChild(plantName)
    textBox.appendChild(plantFamily)
    
    plantPrice.appendChild(plantAmount)

    plantButtonDiv.appendChild(plantButtonCta)
    plantButtonDiv.appendChild(plantAlert)
    
    plantCard.appendChild(plantCardInner)
    plantCard.appendChild(plantDescr)
    plantCard.appendChild(plantButtonDiv)

    plantGallery.appendChild(plantCard)
}

function cartNumberTag(){
    circleTag.forEach(tag =>{
        if(forCart.length > 0){
            tag.style.visibility = "visible";
            tag.textContent = forCart.length
        } else {
            tag.style.visibility = "hidden";
        }
    })
}

function saveItems(){
    let forCartJSON = JSON.stringify(forCart);
    localStorage.setItem("userCart", forCartJSON)
}

function takeItems(){
    let importedCartJSON = localStorage.getItem("userCart")
    let importedCartOBJ = JSON.parse(importedCartJSON)
    return importedCartOBJ
}


cartDesk.addEventListener("click", saveItems);
cartSide.addEventListener("click", saveItems);

cartMobile.addEventListener("click", function(){
    saveItems();
    window.location.href = "./cart.html";
});

cartMainBtn.addEventListener("click", function(){
    saveItems();
    window.location.href = "./cart.html";   
});

