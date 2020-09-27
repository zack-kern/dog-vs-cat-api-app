var homeHidden = document.querySelector(".container");
var homeButton = document.querySelector(".home-bg > button");
var catImg = document.querySelector(".cat-img");
var dogImg = document.querySelector(".dog-img");
var catURL = [];
var dogURL = [];
homeButton.addEventListener("click", homeButtonFunction);
function homeButtonFunction() {
  // -- handles the duel button event listener which hides the home page and reveals the first image page
  homeHidden.classList.add("hidden");
  // renderPage(catURL, dogURL);
}
var catImages = $.ajax({
  url: "https://api.thecatapi.com/v1/images/search?limit=4",
  method: "GET",
  success: catURLGet,
  error: errorC,
});
var dogImages = $.ajax({
  url: "https://dog.ceo/api/breeds/image/random/4",
  method: "GET",
  success: dogURLGet,
  error: errorD,
});
function catURLGet() {
  //--- handles the GET request from Cat API to create array of cat images------
  var arr;
  for (var i = 0; i < 4; i++) {
    arr = catImages.responseJSON[i].url;
    catURL.push(arr);
  }
  console.log(catURL);
  function catAppend(catURL) {
    var string = "url('" + catURL[0] + "')";
    catImg.style.backgroundImage = string;
  }
  catAppend(catURL);
  console.log(catURL);
}
function dogURLGet() {
  //--- handles the GET request from Dog API to create array of dog images------
  dogURL = dogImages.responseJSON.message;
  console.log(dogURL);
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

var catButton = document.querySelector(".cat-img");
catButton.addEventListener("click", catButtonFunction);
function catButtonFunction() {}
