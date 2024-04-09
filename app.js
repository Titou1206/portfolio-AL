AOS.init();


// fonction loader au chargement
document.addEventListener("DOMContentLoaded", (e)=>{
    let loader = document.getElementById("loader")
    setTimeout(()=>{
        loader.classList.add("loader-hidden")
        setTimeout(()=>{
            loader.classList.add("d-none")
        }, 500)
    }, 1200)
})

// récupération de l'input du burger par son selecteur css
let burger = document.querySelector(".burger")
// surveillance du click sur le burger et lance la fonction affiche menu
burger.addEventListener("click", (e) => {
	afficheMenu()
})

// récupération du menu par son selecteur css
let menu = document.querySelector(".menu")
let liens = menu.querySelectorAll(".nav-page")
liens.forEach(lien=>{
    lien.addEventListener("click",(e)=>{
        afficheMenu()
    })
})


// Ajout d'un écouteur d'événements pour fermer le menu en dehors de celui-ci
document.addEventListener("click", (e) => {
    // Vérifier si le clic n'a pas été fait dans le menu ou le burger
    if (!menu.contains(e.target) && !burger.contains(e.target)) {
        // Fermer le menu
        removeMenu();
    }
});


function afficheMenu(){
// role : affiche le menu et modifie le logo burger
// parametre : rien
// retour : rien
	// enleve ou ajoute la class menu-ouvert
	menu.classList.toggle("menu-ouvert")
	// récupération du hero, main et footer
	let blurs = document.querySelectorAll(".menu-blur")
	// enleve ou ajoute la class blur2
	blurs.forEach(blur=>{
		blur.classList.toggle("blur2")
	})
	// recupération des 3 trait du burger
	let burgerTop = document.querySelector("span.top")
	let burgerMiddle = document.querySelector("span.middle")
	let burgerBottom = document.querySelector("span.bottom")
	// incline les trait haut et bas avec les class associé et fais s'échapper le trait du milieu
	burgerTop.classList.toggle("top-check")
	burgerMiddle.classList.toggle("middle-check")
	burgerBottom.classList.toggle("bottom-check")
}

function removeMenu(){
    // role : affiche le menu et modifie le logo burger
    // parametre : rien
    // retour : rien
        // enleve ou ajoute la class menu-ouvert
        menu.classList.remove("menu-ouvert")
        // récupération du hero, main et footer
        let blurs = document.querySelectorAll(".menu-blur")
        // enleve ou ajoute la class blur2
        blurs.forEach(blur=>{
            blur.classList.remove("blur2")
        })
        // recupération des 3 trait du burger
        let burgerTop = document.querySelector("span.top")
        let burgerMiddle = document.querySelector("span.middle")
        let burgerBottom = document.querySelector("span.bottom")
        // incline les trait haut et bas avec les class associé et fais s'échapper le trait du milieu
        burgerTop.classList.remove("top-check")
        burgerMiddle.classList.remove("middle-check")
        burgerBottom.classList.remove("bottom-check")
    }





// switch access
// récupération du bouton access
let switchAccess = document.getElementById("switch-access")
// récupération de l'image à changer
let btnAccess = document.getElementById("button-access")
// on surveille le changement sur le switch
switchAccess.addEventListener("change",(e)=>{
    // on change le datastyle et l'image affiché en fonction
    if(switchAccess.checked){
        body.setAttribute("data-style","access")
        btnAccess.classList.add("p-access-checked")
    }else{
        body.setAttribute("data-style","normal")
        btnAccess.classList.remove("p-access-checked")
    }
})

/* swiper */

function initSwiper(){
    /* swiper init */
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        // Default parameters
        slidesPerView: 1,
        spaceBetween: 20,
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 320px
            760: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // when window width is >= 480px
            1300: {
                slidesPerView: 3,
                spaceBetween: 40
            },
            // when window width is >= 640px
            1800: {
                slidesPerView: 4,
                spaceBetween: 50
            }
        },
        pagination: {
            el: '.swiper-pagination',
        },
    });
}

/* projets dynamique */
fetch("projets.json")
.then(ret=>{
    return ret.json()
})
.then(projets=>{
    createSlide(projets)
    initSwiper()
    flipCard()
})


function createSlide(projets){
// Role : crée les slides projet dans le swiper
// parametre : projets - fichier json avec les éléments de chaque projet
// retour : rien
    let swiper = document.querySelector(".swiper-wrapper")
    swiper.innerHTML = ""
    projets.forEach(projet => {
        let pics = recupPicto(projet.pictos)
        let libs = recupLib(projet.librairies)
        swiper.innerHTML += `<div class="swiper-slide">
            <div class="card-inner">
                <div class="card-front">
                    <div>
                        <h4 class="large-11 mrlauto text-center">${projet.titre}</h4>
                        <div class="projet-img mt32"><img src="assets/captures-projets/${projet.image}" alt="copie d'écran du projet ${projet.titre}"></div>
                        <p class="large-11 mrlauto mt32">${projet.description}</p>
                    </div>
                    <div class="large-11 mrlauto flex justify-between mt32">
                        <p>${projet.date}
                        <p class="cta-card">+</p>        
                    </div>
                </div>
                <div class="card-back">
                    <div>
                        <h4 class="large-11 mrlauto text-center">${projet.type}</h4>
                        <div class="flex gap16 mt32 align-center justify-center">
                            ${pics}
                            ${libs}
                        </div>
                        <p class="large-11 mrlauto mt32 mb80">${projet.objectif}</p>
                    </div>
                    <a class="large-11 mrlauto flex justify-center" target="_blank" href="${projet.lien}">- Voir le projet -</a>
                </div>
            </div>
        </div>`
    });
}


function recupPicto(elements){
// parcours : les elements d'un projet pour les mettre dans une chaine de caractère
// paramtre : elements - le tableau d'elements du projet
// return : elts - la chaine de caractère a rentrer dans le HTML
    let elts = ""
    elements.forEach(element => {
        elts += `<div class="picto ${element}"></div>`
    })
    return elts
}

function recupLib(elements){
    // parcours : les elements d'un projet pour les mettre dans une chaine de caractère
    // paramtre : elements - le tableau d'elements du projet
    // return : elts - la chaine de caractère a rentrer dans le HTML
        let elts = ""
        elements.forEach(element => {
            elts += `<p class="p-comp">${element}</p>`
        })
        return elts
    }



function flipCard(){    
// role : retourne les carte projets au clic
// parametres : aucun
// retour : aucun
    let swiperSlides = document.querySelectorAll(".swiper-slide")
    swiperSlides.forEach(swiperSlide =>{
        let cardInner = swiperSlide.querySelector(".card-inner")
        swiperSlide.addEventListener("click", (e)=>{
            cardInner.classList.toggle("flip-card")
        })
    })
}



/*
function afficheMap(fondMap,iconCouleur){
    var myIcon = L.icon({
        iconUrl: `assets/picto/Logo-AL-developpement-web-${iconCouleur}.png`,
        iconSize: [38, 38],
        iconAnchor: [16, 16],
    });
    L.marker([45.251463, 4.214260], {icon: myIcon}).addTo(map)
    fondMap.addTo(map);
}
*/

// Dark mode
// récupération du body
let body = document.querySelector("body")
// récupération du bouton
let colorMode = document.getElementById("switch-mode")

// librairie leaflet - on affiche la carte
var map = L.map('map').setView([45.466671, 4.55], 8);
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
}).addTo(map);
//colorMode.checked = true
var myIcon = L.icon({
    iconUrl: `assets/picto/Logo-AL-developpement-web-black.png`,
    iconSize: [38, 38],
    iconAnchor: [16, 16],
});
L.marker([45.241701, 4.235366], {icon: myIcon}).addTo(map)
//afficheMap(Stadia_AlidadeSmooth, iconCouleur)







// surveille le changement d'état du bouton
colorMode.addEventListener("change",(e)=>{
    // on change l'attribut data-theme en light ou dark en fonction de l'état
    if(colorMode.checked){
        body.setAttribute("data-theme","light")
        var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);
        var myIcon = L.icon({
            iconUrl: `assets/picto/Logo-AL-developpement-web-white.png`,
            iconSize: [38, 38],
            iconAnchor: [16, 16],
        });
        L.marker([45.241701, 4.235366], {icon: myIcon}).addTo(map)
    }else{
        body.setAttribute("data-theme","dark")
        var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);
        var myIcon = L.icon({
            iconUrl: `assets/picto/Logo-AL-developpement-web-black.png`,
            iconSize: [38, 38],
            iconAnchor: [16, 16],
        });
        L.marker([45.241701, 4.235366], {icon: myIcon}).addTo(map)
    }
})

/*
    //dark mode test
    function isDarkMode(){
        return globalThis.matchMedia?.("(prefers-color-scheme.dark)").matches ?? false;
    }
    if(isDarkMode()){
        body.setAttribute("data-theme","dark")
        colorMode.checked = false
        var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
            minZoom: 0,
            maxZoom: 20,
        }).addTo(map)
        //let iconCouleur = "black"
        //afficheMap(Stadia_AlidadeSmooth, iconCouleur)
        var myIcon = L.icon({
            iconUrl: `assets/picto/Logo-AL-developpement-web-black.png`,
            iconSize: [38, 38],
            iconAnchor: [16, 16],
        });
        L.marker([45.251463, 4.214260], {icon: myIcon}).addTo(map)
    }else{
        body.setAttribute("data-theme","light")
        colorMode.checked = true
        var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
            minZoom: 0,
            maxZoom: 20,
        }).addTo(map)
        //let iconCouleur = "black"
        //afficheMap(Stadia_AlidadeSmooth, iconCouleur)
        var myIcon = L.icon({
            iconUrl: `assets/picto/Logo-AL-developpement-web-white.png`,
            iconSize: [38, 38],
            iconAnchor: [16, 16],
        });
        L.marker([45.251463, 4.214260], {icon: myIcon}).addTo(map)
    }
*/


let lumiere = document.querySelector(".lumiere")
window.addEventListener("mousemove", (e)=> {
    lumiere.style.left = e.clientX + "px"
    lumiere.style.top = e.clientY + "px"
})


