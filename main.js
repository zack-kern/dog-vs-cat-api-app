var homeHidden = document.querySelector(".container");
var homeButton = document.querySelector(".home-bg > button");
var duelPage = document.querySelector(".duel-page");
var catImg = document.querySelector(".cat-img");
var dogImg = document.querySelector(".dog-img");
var catURL = [];
var dogURL = [];
var resultsHeader = document.querySelector(".results-header");
var results = document.querySelector(".results");
var j = 0;
var dogArray = [];
var catArray = [];
var catString = "url('" + catURL[j] + "')";
var dogString = "url('" + dogURL[j] + "')";
var header = document.querySelector("#header");
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
  //--- handles the GET request from Cat API to create array of 5 unique cat images------
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
catImg.addEventListener("click", catButtonFunction);
function catButtonFunction() {
  catString = "url('" + catURL[j + 1] + "')";
  dogString = "url('" + dogURL[j + 1] + "')";
  catImg.style.backgroundImage = catString;
  dogImg.style.backgroundImage = dogString;
  header.textContent = j + 2;
  catArray.push(catString);
  j++;
  if (j > 4) {
    duelPage.classList.add("hidden");
    renderHome(catArray, dogArray);
  }
}
dogImg.addEventListener("click", dogButtonFunction);
function dogButtonFunction() {
  dogString = "url('" + dogURL[j + 1] + "')";
  catString = "url('" + catURL[j + 1] + "')";
  dogImg.style.backgroundImage = dogString;
  catImg.style.backgroundImage = catString;
  header.textContent = j + 2;
  dogArray.push(dogString);
  j++;
  if (j > 4) {
    duelPage.classList.add("hidden");
    renderHome(catArray, dogArray);
  }
}
function renderHome(cat, dog) {
  if (cat.length > dog.length) {
    document.body.classList.add("cats-primary-bg");
    var text = document.createTextNode("Team 'Mean Cats' Win..");
    resultsHeader.appendChild(text);
    for (var j = 0; j < cat.length; j++) {
      var div = document.createElement("div");
      div.classList.add("cat-results");
      var catPar = "url('" + catURL[j] + "')";
      div.style.backgroundImage = catPar;
      var calc = 75 / cat.length;
      div.style.height = calc + "vh";
      results.appendChild(div);
      results.classList.remove("hidden");
      if (j == cat.length - 1) {
        createRestartBtn();
      }
    }
  } else {
    document.body.classList.add("dogs-primary-bg");
    var text = document.createTextNode("Team 'Good Dogs' Win!!");
    resultsHeader.appendChild(text);
    for (var j = 0; j < dog.length; j++) {
      var div = document.createElement("div");
      div.classList.add("dog-results");
      var dogPar = "url('" + dogURL[j] + "')";
      div.style.backgroundImage = dogPar;
      var calc = 75 / dog.length;
      div.style.height = calc + "vh";
      results.appendChild(div);
      results.classList.remove("hidden");
      if (j == dog.length - 1) {
        createRestartBtn();
      }
    }
  }
}
function createRestartBtn() {
  var btn = document.createElement("button");
  results.appendChild(btn);
  var btnText = document.createTextNode("Duel Again");
  btn.classList.add("duel-again");
  btn.appendChild(btnText);
  btn.addEventListener("click", duelAgain);
}
function duelAgain() {
  location.href = "./index.html";
}
