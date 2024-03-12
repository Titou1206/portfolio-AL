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
