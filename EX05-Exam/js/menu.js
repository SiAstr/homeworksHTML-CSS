let openBtn = document.querySelector("#openMenu");
let closeBtn = document.querySelector("#closeMenu");
let mobileMenu = document.querySelector(".mobile-nav")
let mobileMenuLinks = document.querySelectorAll(".mobile-nav a")


openBtn.addEventListener("click", function(){
    mobileMenu.style.right = "0";
    bloccaScroll()
})

closeBtn.addEventListener("click", function(){
    mobileMenu.style.right = "-60%";
    sbloccaScroll()

})

mobileMenuLinks.forEach(link => {
    link.addEventListener("click", function(){
        mobileMenu.style.right = "-60%";
        sbloccaScroll()

    })
})


function bloccaScroll() {
    document.body.style.overflow = 'hidden';
  }
  
function sbloccaScroll() {
    document.body.style.overflow = 'auto';
  }
