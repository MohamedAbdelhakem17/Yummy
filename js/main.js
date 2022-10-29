// ================= Set variables
let meal = [];
let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userPhone = document.getElementById("userPhone");
let userAge = document.getElementById("userAge");
let userPassword = document.getElementById("userPassword");
let userRePassword = document.getElementById("userRePassword");
let searchByLetter = document.getElementById("searchByLetter");
let searchByName = document.getElementById("searchByName");

// ================= Navbar
let linkWidth = $(".links").outerWidth();
$(".navbar").css("left", `-${linkWidth}px`);
$(".toggel").click(() => {
  if ($(".navbar").css("left") == `-${linkWidth}px`) {
    $(".navbar").animate({ left: "0px" });
    $(".item1").animate({ opacity: "1", paddingTop: "20px" }, 900);
    $(".item2").animate({ opacity: "1", paddingTop: "20px" }, 1000);
    $(".item3").animate({ opacity: "1", paddingTop: "20px" }, 1100);
    $(".item4").animate({ opacity: "1", paddingTop: "20px" }, 1200);
    $(".item5").animate({ opacity: "1", paddingTop: "20px" }, 1300);
    $(".toggel").html(`<i class="fa-solid fa-times fa-2x"></i>`);
  } else {
    $(".navbar").animate({ left: `-${linkWidth}px` }, 500);
    $(".navbar .nav-link li").animate(
      { opacity: "0", paddingTop: "300px" },
      700
    );
    $(".toggel").html(`<i class="fa-solid fa-bars fa-2x"></i>`);
  }
});

// ================= Home
// home Api
(async function getApi() {
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s`
  );
  meals = await meals.json();
  meal = meals.meals;
  showData(meal);
})();
// Info Api
async function getInfoByID(id) {
  $(".loading").fadeIn(100, function () {
    $(".loading .spinner").fadeIn(100);
  });
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  meals = await meals.json();
  meal = meals.meals;
  showInfo(meal);
  $(".loading .spinner").fadeOut(300, function () {
    $(".loading ").fadeOut(300);
  });
}

// home Display
function showData(arry) {
  let rowData = $("#rowData");
  let recipes = "";
  for (let i = 0; i < arry.length; i++) {
    recipes += `
    <div class="col-lg-3 col-md-6 col-12 p-2">
    <div onclick="getInfoByID('${arry[i].idMeal}')">
    <div class="ineer position-relative">
        <div class="img">
            <img src="${arry[i].strMealThumb}" alt="${arry[i].strMeal}" class="w-100 ">
        </div>
        <div class="text position-absolute ">
            <h2>${arry[i].strMeal}</h2>
        </div>
    </div>
    </div>
</div>
    `;
  }
  rowData.html(recipes);
}
// Info Display
function showInfo(arry) {
  let rowData = $("#rowData");
  let recipes = `
  <div class="col-lg-4 col-md-12 p-3">
  <div class="inner"> 
    <img src="${arry[0].strMealThumb}" alt="${arry[0].strMeal}" class="w-100">
    <h2 class="text-center text-white p-2">${arry[0].strMeal}</h2>
  </div>
</div>
<div class="col-lg-8 col-md-12 info-text">
  <div class="inner"> 
    <h3 class="text-white">Instructions</h3>
    <p class="text-white">${arry[0].strInstructions}</p>
    <p class="text-white"><span class="fw-bolder">Area :</span>${arry[0].strArea}</p>
    <p class="text-white"><span class="fw-bolder">Category :</span>${arry[0].strCategory}</p>
    <h4 class="text-white fs-3 fw-fw-lightert">Recipes :</h4>
    <span class="mybadge">${arry[0].strMeasure1} ${arry[0].strIngredient1}</span>
    <span class="mybadge">${arry[0].strMeasure2} ${arry[0].strIngredient2}</span>
    <span class="mybadge">${arry[0].strMeasure3} ${arry[0].strIngredient3}</span>
    <span class="mybadge">${arry[0].strMeasure4} ${arry[0].strIngredient4}</span>
    <span class="mybadge">${arry[0].strMeasure5} ${arry[0].strIngredient5}</span>
    <span class="mybadge">${arry[0].strMeasure6} ${arry[0].strIngredient6}</span>
    <span class="mybadge">${arry[0].strMeasure7} ${arry[0].strIngredient7}</span>
    <span class="mybadge">${arry[0].strMeasure8} ${arry[0].strIngredient8}</span>
    <h4 class="text-white fs-3 fw-fw-lightert">Tags :</h4>
    <h6 class="btn btn-danger"><a class="text-white" href="${arry[0].strYoutube}">Youtube</a></h6>
    <h6 class="btn btn-success"><a class="text-white" href="${arry[0].strSource}">Source</a></h6>
  </div>
</div>
  `;
  rowData.html(recipes);
}

// Area Api
$(".item3").click(function () {
  $(".home").fadeOut(200);
  $(".search").fadeOut(200);
  $(".categories").fadeOut(200);
  $(".ingredients").fadeOut(200);
  $(".contact").fadeOut(200);
  $(".area").fadeIn(500);
  areaApi();
});

async function areaApi() {
  $(".loading").fadeIn(100, function () {
    $(".loading .spinner").fadeIn(100);
  });
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  meal = await meals.json();
  showData(meal.meals.slice(0, 20));
  $(".loading .spinner").fadeOut(300, function () {
    $(".loading ").fadeOut(300);
  });
}

// function showData(arry) {
//   let rowData = $("#rowData");
//   let recipes = "";
//   for (let i = 0; i < arry.length; i++) {
//     recipes += `
//     <div class="col-md-6 col-lg-3 my-3 shadow">
//     <div class="movie shadow rounded position-relative" >
//       <div class="post text-center" onclick="apiForArea('${arry[i].strArea}')">
//         <i class="fa-solid fa-city fa-3x text-danger"></i>
//         <h2 class="text-white py-3">${arry[i].strArea}</h2>
//       </div>
//     </div>
//   </div>
//     `;
//   }
//   rowData.html(recipes);
// }



// ================= Search
$(".item1").click(function () {
  $(".home").fadeOut(200);
  $(".categories").fadeOut(200);
  $(".area").fadeOut(200);
  $(".ingredients").fadeOut(200);
  $(".contact").fadeOut(200);
  $(".search").fadeIn(500);
});
// Search By Letter Api
searchByLetter.addEventListener("input", function () {
  let letter = this.value;
  searchMealByLetter(letter);
});

async function searchMealByLetter(letter) {
  $(".loading").fadeIn(100, function () {
    $(".loading .spinner").fadeIn(100);
  });
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  meal = await meals.json();
  searchByLetterDisplay(meal.meals);
  $(".loading .spinner").fadeOut(300, function () {
    $(".loading ").fadeOut(300);
  });
}

// Search By Letter Display
function searchByLetterDisplay(arry) {
  let rowSearch = $("#rowSearch");
  let recipes = "";
  for (let i = 0; i < arry.length; i++) {
    recipes += `
      <div class="col-lg-3 col-md-6 col-12 p-2">
      <div  onclick="showInfos('${arry[i].idMeal}')">
      <div class="ineer position-relative recipe-id="${arry[i].idMeal}">
          <div class="img">
              <img src="${arry[i].strMealThumb}" alt="${arry[i].strMeal}" class="w-100 ">
          </div>
          <div class="text position-absolute ">
              <h2>${arry[i].strMeal}</h2>
          </div>
      </div>
      </div>
  </div>
      `;
  }
  rowSearch.html(recipes);
}
// Search By Name Api
searchByName.addEventListener("input", function () {
  let name = this.value;
  searchMealByName(name);
});

// Search By Name Display
function searchByNameDisplay(arry) {
  let rowSearch = $("#rowSearch");
  let recipes = "";
  for (let i = 0; i < arry.length; i++) {
    recipes += `
      <div class="col-lg-3 col-md-6 col-12 p-2">
      <div class="onclick="showInfos('${arry[i].idMeal}')"">
      <div class="ineer position-relative recipe-id="${arry[i].idMeal}">
          <div class="img">
              <img src="${arry[i].strMealThumb}" alt="${arry[i].strMeal}" class="w-100 ">
          </div>
          <div class="text position-absolute ">
              <h2>${arry[i].strMeal}</h2>
          </div>
      </div>
      </div>
  </div>
      `;
  }
  rowSearch.html(recipes);
}


// Info Display
function showInfos(arry) {
  let rowSearchINfo = $("#rowSearchINfo");
  let recipes = `
  <div class="col-lg-4 col-md-12 p-3">
  <div class="inner"> 
    <img src="${arry[0].strMealThumb}" alt="${arry[0].strMeal}" class="w-100">
    <h2 class="text-center text-white p-2">${arry[0].strMeal}</h2>
  </div>
</div>
<div class="col-lg-8 col-md-12 info-text">
  <div class="inner"> 
    <h3 class="text-white">Instructions</h3>
    <p class="text-white">${arry[0].strInstructions}</p>
    <p class="text-white"><span class="fw-bolder">Area :</span>${arry[0].strArea}</p>
    <p class="text-white"><span class="fw-bolder">Category :</span>${arry[0].strCategory}</p>
    <h4 class="text-white fs-3 fw-fw-lightert">Recipes :</h4>
    <span class="mybadge">${arry[0].strMeasure1} ${arry[0].strIngredient1}</span>
    <span class="mybadge">${arry[0].strMeasure2} ${arry[0].strIngredient2}</span>
    <span class="mybadge">${arry[0].strMeasure3} ${arry[0].strIngredient3}</span>
    <span class="mybadge">${arry[0].strMeasure4} ${arry[0].strIngredient4}</span>
    <span class="mybadge">${arry[0].strMeasure5} ${arry[0].strIngredient5}</span>
    <span class="mybadge">${arry[0].strMeasure6} ${arry[0].strIngredient6}</span>
    <span class="mybadge">${arry[0].strMeasure7} ${arry[0].strIngredient7}</span>
    <span class="mybadge">${arry[0].strMeasure8} ${arry[0].strIngredient8}</span>
    <h4 class="text-white fs-3 fw-fw-lightert">Tags :</h4>
    <h6 class="btn btn-danger"><a class="text-white" href="${arry[0].strYoutube}">Youtube</a></h6>
    <h6 class="btn btn-success"><a class="text-white" href="${arry[0].strSource}">Source</a></h6>
  </div>
</div>
  `;
  rowSearchINfo.html(recipes);
}
// ================= loading Screen
$(document).ready(function () {
  $(".loading .spinner").fadeOut(1000, () => {
    $(".loading").fadeOut(500, () => {
      $("body").css("overflow", "visible");
    });
  });
});
