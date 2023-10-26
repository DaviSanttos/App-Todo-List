
const icon = document.getElementById("menu-hamburger");
const iconClose = document.getElementById("close");
let menu = document.getElementById("mobile-menu");

// function openMenu(){

//     if(icon) {
//         menu.classList.remove("hidden")
//         menu.classList.add("block");
//         // menu.classList.toggle("my");
//     } 
//     if(iconClose){
//         menu.classList.remove("block")
//         menu.classList.add("hidden")
//     }
//     // if(iconClose) {
//     //     menu.classList.toggle("my");
//     // }
// }

// function closeMenu(){
//     let menu = document.getElementById("mobile-menu");
//     if(iconClose) {
//         menu.classList.toggle("my")
//         // menu.classList.add("hidden")
//     }
// }

icon.addEventListener("click", () => {

    menu.classList.remove("anim-r");
    menu.classList.add("anim");
    menu.classList.remove("hidden");

});

iconClose.addEventListener("click", () => {

    menu.classList.remove("anim");
    menu.classList.add("anim-r");

    setTimeout(() => {
        menu.classList.add("hidden");
    }, 300);
    
});



