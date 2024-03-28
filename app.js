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
        var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        })
        let iconCouleur = "white"
        afficheMap(Stadia_AlidadeSmoothDark, iconCouleur)
    }else{
        body.setAttribute("data-theme","dark")
        var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
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

var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
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
    let barreLeaflet = document.querySelector(".leaflet-control-attribution")
    barreLeaflet.classList.add("d-none")
    let btnLeaflet = document.querySelector(".leaflet-control-zoom")
    btnLeaflet.classList.add("d-none")
}




/* swiper */

function initSwiper(){
    /* swiper init */
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
    
        // If we need pagination
        pagination: {
        el: '.swiper-pagination',
        },
    
        // Navigation arrows
        navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        },
        // Default parameters
        width: 320,
        slidesPerView: 1,
        spaceBetween: 20,
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 320px
            750: {
                width: 660,
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 480px
            1300: {
                width: 1050,
                slidesPerView: 3,
                spaceBetween: 30
            },
            // when window width is >= 640px
            1700: {
                width: 1400,
                slidesPerView: 4,
                spaceBetween: 40
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
                    <h4 class="text-center">${projet.titre}</h4>
                    <div class="projet-img mt32"><img src="assets/captures-projets/${projet.image}" alt="copie d'écran du projet mntn"></div>
                    <p class="mt32">${projet.description}</p>
                    <div class="flex justify-between mt32">
                        <p>${projet.date}
                        <p>...</p>        
                    </div>
                </div>
                <div class="card-back">
                    <h4>${projet.type}</h4>
                    <div class="flex  gap16 mt32 align-center">
                        ${pics}
                        ${libs}
                    </div>
                    <p class="mt32 mb80">${projet.objectif}</p>
                    <a target="_blank" href="${projet.lien}">${projet.lien}</a>
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
