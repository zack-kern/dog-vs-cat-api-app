var homeHidden = document.querySelector(".container");
var homeButton = document.querySelector(".home-bg > button");
var duelPage = document.querySelector(".duel-page");
var catImg = document.querySelector(".cat-img");
var dogImg = document.querySelector(".dog-img");
var catURL = [];
var dogURL = [];
var resultsHeader = document.querySelector(".results-header");
var results = document.querySelector(".results");
homeButton.addEventListener("click", homeButtonFunction);
function homeButtonFunction() {
  // -- handles the duel button event listener which hides the home page and reveals the first image page
  duelPage.classList.remove("hidden");
  homeHidden.classList.add("hidden");
  // renderPage(catURL, dogURL);
}
var catImages = $.ajax({
  url: "https://api.thecatapi.com/v1/images/search?limit=10",
  method: "GET",
  success: catURLGet,
  error: errorC,
});
var dogImages = $.ajax({
  url: "https://dog.ceo/api/breeds/image/random/10",
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
  console.log(dogImages);
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
var dogArray = [];
var catArray = [];
var header = document.querySelector("#header");
catImg.addEventListener("click", catButtonFunction);
function catButtonFunction() {
  var catString = "url('" + catURL[j] + "')";
  var dogString = "url('" + dogURL[j] + "')";
  catImg.style.backgroundImage = catString;
  dogImg.style.backgroundImage = dogString;
  header.textContent = j + 1;
  catArray.push(catString);
  j++;
  if (j > 5) {
    duelPage.classList.add("hidden");
    renderHome(catArray, dogArray);
  }
}
dogImg.addEventListener("click", dogButtonFunction);
function dogButtonFunction() {
  var dogString = "url('" + dogURL[j] + "')";
  var catString = "url('" + catURL[j] + "')";
  dogImg.style.backgroundImage = dogString;
  catImg.style.backgroundImage = catString;
  header.textContent = j + 1;
  dogArray.push(dogString);
  j++;
  if (j > 5) {
    duelPage.classList.add("hidden");
    renderHome(catArray, dogArray);
  }
}
function renderHome(cat, dog) {
  if (cat.length > dog.length) {
    results.classList.add("cats-primary-bg");
    var text = document.createTextNode("Team 'Mean Cats' Win..");
    resultsHeader.appendChild(text);
  } else {
    results.classList.add("dogs-primary-bg");
    var text = document.createTextNode("Team 'Good Dogs' Win!!");
    resultsHeader.appendChild(text);
    for (var i = 0; i < dog.length; i++) {
      console.log(dog[i]);
      var div = document.createElement("div");
      div.style.backgroundImage = dog[i];
      results.appendChild(div);
    }
  }
}
