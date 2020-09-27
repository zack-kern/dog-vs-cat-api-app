var homeHidden = document.querySelector(".container");
var homeButton = document.querySelector(".home-bg > button");
var duelPage = document.querySelector(".duel-page");
var catImg = document.querySelector(".cat-img");
var dogImg = document.querySelector(".dog-img");
var catURL = [];
var dogURL = [];
homeButton.addEventListener("click", homeButtonFunction);
function homeButtonFunction() {
  // -- handles the duel button event listener which hides the home page and reveals the first image page
  duelPage.classList.remove("hidden");
  homeHidden.classList.add("hidden");
  // renderPage(catURL, dogURL);
}
var catImages = $.ajax({
  url: "https://api.thecatapi.com/v1/images/search?limit=5",
  method: "GET",
  success: catURLGet,
  error: errorC,
});
var dogImages = $.ajax({
  url: "https://dog.ceo/api/breeds/image/random/5",
  method: "GET",
  success: dogURLGet,
  error: errorD,
});
function catURLGet() {
  //--- handles the GET request from Cat API to create array of 32 unique cat images------
  var arr;
  for (var i = 1; i < 6; i++) {
    arr = catImages.responseJSON[i - 1].url;
    catURL.push(arr);
  }
  function catAppend(catURL) {
    var string = "url('" + catURL[0] + "')";
    catImg.style.backgroundImage = string;
  }
  catAppend(catURL);
}
function dogURLGet() {
  //--- handles the GET request from Dog API to create array of 32 unique dog images------
  dogURL = dogImages.responseJSON.message;
  function dogAppend(dogURL) {
    var string = "url('" + dogURL[0] + "')";
    dogImg.style.backgroundImage = string;
  }
  dogAppend(dogURL);
}
function errorC() {
  console.error("Couldn't get cat image");
}
function errorD() {
  console.error("Couldn't get dog image");
}
var j = 1;
var winArray = [];
var loseArray = [];
var header = document.querySelector("#header");
catImg.addEventListener("click", catButtonFunction);
function catButtonFunction() {
  var catString = "url('" + catURL[j] + "')";
  var dogString = "url('" + dogURL[j] + "')";
  catImg.style.backgroundImage = catString;
  dogImg.style.backgroundImage = dogString;
  header.textContent = j + 1;
  j++;
  if (j > 5) {
    duelPage.classList.add("hidden");
  }
}
dogImg.addEventListener("click", dogButtonFunction);
function dogButtonFunction() {
  var dogString = "url('" + dogURL[j] + "')";
  var catString = "url('" + catURL[j] + "')";
  dogImg.style.backgroundImage = dogString;
  catImg.style.backgroundImage = catString;
  console.log(dogURL);
  console.log(dogURL[j]);
  header.textContent = j + 1;
  j++;
  if (j > 5) {
    duelPage.classList.add("hidden");
  }
}
