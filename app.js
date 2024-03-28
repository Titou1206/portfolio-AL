// récupération de l'input du burger par son selecteur css
let burger = document.querySelector(".burger")
// surveillance du click sur le burger et lance la fonction affiche menu
burger.addEventListener("click", (e) => {
	afficheMenu()
})

function afficheMenu(){
// role : affiche le menu et modifie le logo burger
// parametre : rien
// retour : rien
	// récupération du menu par son selecteur css
	let menu = document.querySelector(".menu")
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

// Dark mode
// récupération du body
let body = document.querySelector("body")
// récupération du bouton
let colorMode = document.getElementById("switch-mode")
// surveille le changement d'état du bouton
colorMode.addEventListener("change",(e)=>{
    // on change l'attribut data-theme en light ou dark en fonction de l'état
    if(colorMode.checked){
        body.setAttribute("data-theme","light")
        var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
            minZoom: 0,
            maxZoom: 20,
        })
        let iconCouleur = "white"
        afficheMap(Stadia_AlidadeSmoothDark, iconCouleur)
    }else{
        body.setAttribute("data-theme","dark")
        var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
            minZoom: 0,
            maxZoom: 20,
        })
        let iconCouleur = "black"
        afficheMap(Stadia_AlidadeSmooth, iconCouleur)
    }
})

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

// librairie leaflet - on affiche la carte
var map = L.map('map').setView([45.440138, 4.387329], 8);

var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    minZoom: 0,
    maxZoom: 20,
})
let iconCouleur = "black"
afficheMap(Stadia_AlidadeSmooth, iconCouleur)

function afficheMap(fondMap,iconCouleur){
    var myIcon = L.icon({
        iconUrl: `assets/picto/Logo-AL-developpement-web-${iconCouleur}.png`,
        iconSize: [38, 38],
        iconAnchor: [16, 16],
    });
    fondMap.addTo(map);
    L.marker([45.251463, 4.214260], {icon: myIcon}).addTo(map)
}




/* swiper */

function initSwiper(){
    /* swiper init */
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
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
        }
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
})

function createSlide(projets){
// Role : crée les slides projet dans le swiper
// parametre : projets - fichier json avec les éléments de chaque projet
// retour : rien
    let swiper = document.querySelector(".swiper-wrapper")
    swiper.innerHTML = ""
    projets.forEach(projet => {
        console.log(projet)
        let pics = recupPicto(projet.pictos)
        let libs = recupLib(projet.librairies)
        swiper.innerHTML += `<div class="swiper-slide">
            <div class="card-inner">
                <div class="card-front">
                    <h4 class="large-11 mrlauto text-center">${projet.titre}</h4>
                    <div class="projet-img mt32"><img src="assets/captures-projets/${projet.image}" alt="copie d'écran du projet mntn"></div>
                    <p class="large-11 mrlauto mt32">${projet.description}</p>
                    <div class="large-11 mrlauto flex justify-between mt32">
                        <p>${projet.date}
                        <p>...</p>        
                    </div>
                </div>
                <div class="card-back">
                    <h4 class="large-11 mrlauto text-center">${projet.type}</h4>
                    <div class="flex gap16 mt32 align-center justify-center">
                        ${pics}
                        ${libs}
                    </div>
                    <p class="large-11 mrlauto mt32 mb80">${projet.objectif}</p>
                    <a class="large-11 mrlauto flex justify-center" target="_blank" href="${projet.lien}">${projet.lien}</a>
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
