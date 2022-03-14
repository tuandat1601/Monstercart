
const dropDownItem=document.querySelector(".dropdown");
const arrowItem=document.querySelector(".fa-chevron-right");
const navigation=document.querySelector(".navigation-container");

function addMenu(){
	navigation.classList.add("active");
}
function removeMenu(){
	navigation.classList.remove("active");
}
arrowItem.addEventListener("click",()=>{
dropDownItem.classList.toggle("active")
arrowItem.classList.toggle("active");
})