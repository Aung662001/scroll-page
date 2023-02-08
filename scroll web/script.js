let text = document.querySelector(".text");
let hill1 = document.querySelector("#hill1");
let hill2 = document.querySelector("#hill2");
let hill3 = document.querySelector("#hill3");
let hill4 = document.querySelector("#hill4");
let hill5 = document.querySelector("#hill5");
let leaf = document.querySelector("#leaf");
let tree = document.querySelector("#tree");

window.addEventListener("scroll", () => {
  let value = window.scrollY;
  text.style.marginTop = value * 1.5 + "px";
  hill1.style.top = value * 1.5 + "px";
  hill2.style.top = value * 0.8 + "px";
  hill3.style.top = value * 0.6 + "px";
  hill4.style.top = value * 0.4 + "px";
  tree.style.top = value * 0.4 + "px";
  leaf.style.left = value * 0.4 + "px";

  console.log(value);
});
