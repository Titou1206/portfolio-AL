let body = document.querySelector("body")
let colorMode = document.getElementById("switch-mode")
colorMode.addEventListener("change",(e)=>{
    console.log("yoyo")
    if(colorMode.checked){
        body.setAttribute("data-theme","light")
    }else{
        body.setAttribute("data-theme","dark")
    }
})

let switchAccess = document.getElementById("switch-access")
let btnAccess = document.getElementById("button-access")
switchAccess.addEventListener("change",(e)=>{
    if(switchAccess.checked){
        body.setAttribute("data-style","access")
        btnAccess.classList.add("p-access-checked")
    }else{
        body.setAttribute("data-style","normal")
        btnAccess.classList.remove("p-access-checked")
    }
})