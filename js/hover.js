document.addEventListener("DOMContentLoaded", function(){
	var cursor =document.querySelector(".cursor");
	var links = document.querySelectorAll("a");
	
	var cus = document.querySelector(".cursor");
		document.addEventListener("mousemove", (e)=>{
			cus.style.cssText ="left:"+e.clientX+"px;top:"+e.clientY+"px"
		})
	for(let i =0; i<links.length;i++){
		let self = links[i];
		self.addEventListener("mouseover", function(){
			cursor.classList.add("cursor--link");
		})
		self.addEventListener("mouseout", function(){
			cursor.classList.remove("cursor--link");
		})
	}
})