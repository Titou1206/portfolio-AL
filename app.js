let colorMode = document.getElementById("color-mode")
let body = document.querySelector("body")
console.log("yo")
colorMode.addEventListener("checked",(e)=>{
    console.log("yoyo")
    body.style.backgroundColor = "var(--background-light)"
})