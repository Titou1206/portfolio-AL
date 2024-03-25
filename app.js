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
        let fondMap = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        })
        let iconCouleur = "white"
        afficheMap(fondMap, iconCouleur)
    }else{
        body.setAttribute("data-theme","dark")
        let fondMap = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        })
        let iconCouleur = "black"
        afficheMap(fondMap, iconCouleur)
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

let fondMap = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        })
        let iconCouleur = "black"
        afficheMap(fondMap, iconCouleur)

function afficheMap(fondMap,iconCouleur){
    var myIcon = L.icon({
        iconUrl: `./assets/Logo-AL-developpement-web-${iconCouleur}.png`,
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



