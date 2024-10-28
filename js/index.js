
'use strict'


const contentWidth = $(".content").outerWidth()
$("#sideBar").css({left:`-${contentWidth}px`})
let isShown = false


$(".menue").on("click",function(){
  if (isShown == true) {
    $("#sideBar").animate({left:`-${contentWidth}px`},500)
    $(".menue i").removeClass("fa-xmark").addClass("fa-bars")
    isShown = false

    $(document).ready(function () {
      $(".content ul li").each(function (index) {
        $(this).delay(200 * index).queue(function (next) {
          $(this).removeClass("animate");
          next();
        });
      });
    });

  }else{
    $("#sideBar").animate({left:`0px`},500)
    $(".menue i").removeClass("fa-bars").addClass("fa-xmark")
    isShown = true

    $(document).ready(function () {
      $(".content ul li").each(function (index) {
        $(this).delay(200 * index).queue(function (next) {
          $(this).addClass("animate");
          next();
        });
      });
    });
    
  }
})



const categories = $("#categories")
const area = $("#area")
const ingredients = $("#ingredients")
const contact =$("#contact")
// const contact = document.querySelector("#contact")


categories.on("click", function () {
  $("#sideBar").animate({left:`-${contentWidth}px`},500)
  $(".menue i").removeClass("fa-xmark").addClass("fa-bars")
  isShown = false
  getCategories()
});
area.on("click", function () {
  $("#sideBar").animate({left:`-${contentWidth}px`},500)
  $(".menue i").removeClass("fa-xmark").addClass("fa-bars")
  isShown = false
  getArea()
});
ingredients.on("click", function () {
  $("#sideBar").animate({left:`-${contentWidth}px`},500)
  $(".menue i").removeClass("fa-xmark").addClass("fa-bars")
  isShown = false
  getIngredients()
});

contact.on("click",function () {
  $("#sideBar").animate({left:`-${contentWidth}px`},500)
  $(".menue i").removeClass("fa-xmark").addClass("fa-bars")
  isShown = false

// $(".main-content").addClass("d-none");
$(".form-section").removeClass("d-none");
// $(".form-section").addClass("d-block");


})


// categories.on("click", function () {
  // $("#sideBar").animate({left:`-${contentWidth}px`},500)
  // $(".menue i").removeClass("fa-xmark").addClass("fa-bars")
  // isShown = false
//   getCategories()
// });


// async function fetchOneMeal() {
//   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
//   let data = await response.json()
//    return data.meals[0];
// }

// async function fetchMainContent(count = 25) {
//   let meals = []
//   for (let i = 0; i < count; i++) {
//     let meal = await fetchOneMeal()
//     meals.push(meal)    
//   }
//   displayMain(meals)  
// }

async function fetchMainContent() {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
 let data = await response.json()
 displayMain(data.meals) 
}

fetchMainContent()

function displayMain(array) {
  for (let index = 0; index < array.length; index++) {
    $(".main-content").append(
      ` <div class="col-md-3 g-4 ">
            <div class="card position-relative overflow-hidden"
            onclick="cardClick(${array[index].idMeal})">
              <div class="image w-100 rounded-2 overflow-hidden">
                <img src=${array[index].strMealThumb} alt="food image" class="w-100">
  
                <div class="head p-2 rounded-2 d-flex align-items-center">            
                <h2>${array[index].strMeal}</h2>
              </div>
              </div>
            </div>
            </div> `
    );    
  }
}

async function cardClick(mealID) {
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  let data = await respone.json();
  displayClickedCard(data.meals[0])
}

function displayClickedCard(array) {
  let ingredients = ""
  for (let i = 1; i <= 20; i++) {
    if (array[`strIngredient${i}`]) {
        ingredients += `<li class="alert alert-info cursor-text m-2 p-1 list-unstyled w-fit">${array[`strMeasure${i}`]} ${array[`strIngredient${i}`]}</li>`
    }
}

  let tags
  let tag = ""

  if (array.strTags) {
  tags = array.strTags.split(",")
  for (let i = 0; i < tags.length; i++) {
  tag+= `<li class="cursor-text alert alert-info m-2 p-1 list-unstyled w-fit">${tags[i]}</li>`  
  }
  }else{
    tags = []
  }
    $(".main-content").html(
`          <div class="col-md-4">
            <img src="${array.strMealThumb}" alt="food image" class="w-100">
            <h2>${array.strMeal}</h2>
          </div>

          <div class="col-md-8">
            <h2>instruction</h2>
            <p>${array.strInstructions}</p>
            <p class="h4 fs-2" >Area: <span class="h4">${array.strArea}</span></p>
            <p class="h4 fs-2">category: <span class="h4">${array.strCategory}</span></p>
            <div class="receipe mt-4">
              <h3>Recipes : </h3>
              <div class="ingredients ">
              <ul class="list-unstyled d-flex flex-wrap">${ingredients}</ul>
              </div>
            </div>
            <div class="tags">
              <h3>Tags:</h3>
              <div class="ingredients ">
              <ul class="list-unstyled d-flex flex-wrap">${tag}</ul>
              </div> 
            </div>
            <div class="links">
              <ul class="list-unstyled d-flex flex-wrap">
              <li class="btn btn-danger  m-2 p-1 list-unstyled w-fit">
              <a href="${array.strYoutube}" target="_blank" class="text-white">Yotube</a>
              </li>
              
              </ul>               
            </div>
          </div>`
    );    
  }

////////////////////////////////////////////////////////////////

$("#search").on("click",function () { 
  displaySearchContainer()
});
 
function displaySearchContainer(){
  $(".main-content").html("")
  $(".main-content").html(
    `<div class="col-sm-12 offset-md-2 col-md-5">
              <form class="d-flex" role="search">
                <input class="form-control me-2" id="searchByName" type="search" placeholder="Search by name" aria-label="Search">
                <button class="btn btn-outline-success" id="searchByMealName" type="button" onclick="searchMealByName($('#searchByName').val())">Search</button>
              </form>
            </div>
            <div class="col-sm-12 col-md-5">
              <form class="d-flex" role="search">
                <input class="form-control me-2" id="searchByLetter" type="search"
                oninput="searchMealByFirstLetter($('#searchByLetter').val())" placeholder="Search by first letter">
              </form>
            </div>
  
          <div class="row search-content">
            <div class="col-md-3 g-4">
  
            </div>
          </div>
    `
        ); 
}

async function searchMealByName(value){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
 let data = await response.json()
 console.log(data.meals);
 if (data.meals === null) {
   displaySearchByName([])
   console.log("no meals");
     
}else{
   displaySearchByName(data.meals)  
}
}

function displaySearchByName(array){
  for (let index = 0; index < array.length; index++) {
    $(".main-content").append(
      ` <div class="col-md-3 g-4 ">
            <div class="card position-relative overflow-hidden" onclick="cardClick(${array[index].idMeal})">
              <div class="image w-100 rounded-2 overflow-hidden">
                <img src=${array[index].strMealThumb} alt="food image" class="w-100">
  
                <div class="head p-2 rounded-2 d-flex align-items-center">            
                <h2>${array[index].strMeal}</h2>
              </div>
              </div>
            </div>
            </div> `
    );    
  }
}

//////////////////////////////////////////////////////////
async function searchMealByFirstLetter(value){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
 let data = await response.json()
 console.log(data.meals);
 if (data.meals === null) {
   displaySearchByFirstLetter([])
   console.log("no meals");
}else if(data.meals == "no data found"){
  displaySearchByFirstLetter([])
  console.log("no data found");
}
else{
  displaySearchByFirstLetter(data.meals)  
}
}

// $("#searchByLetter").on("input",
//   function () {    
//     $(".search-content").html("")
//     searchMealByFirstLetter($("#searchByLetter").val())
//   }
// );

function displaySearchByFirstLetter(array,count=25){
   for (let index = 0; index < count; index++) {
    
    $(".main-content").append(
      ` <div class="col-md-3 g-4 ">
            <div class="card position-relative overflow-hidden " onclick="cardClick(${array[index].idMeal})">
              <div class="image w-100 rounded-2 overflow-hidden">
                <img src=${array[index].strMealThumb} alt="food image" class="w-100">
  
                <div class="head p-2 rounded-2 d-flex align-items-center">            
                <h2>${array[index].strMeal}</h2>
              </div>
              </div>
            </div>
            </div> `
    );    
  }
}

/////////////////////////////////////////////////////////////////////

async function categoryClick(Name) {
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Name}`);
  let data = await respone.json();
  displayClickedCategory(data.meals)
}

function displayClickedCategory(array,count=25) {
  $(".main-content").html("")
  for (let i = 0; i < count; i++) {

    $(".main-content").append(
`<div class="col-md-3 g-4 ">
            <div class="card position-relative overflow-hidden " onclick="cardClick(${array[i].idMeal})">
              <div class="image w-100 rounded-2 overflow-hidden">
                <img src=${array[i].strMealThumb} alt="food image" class="w-100">
  
                <div class="head p-2 rounded-2 d-flex align-items-center">            
                <h2>${array[i].strMeal}</h2>
              </div>
              </div>
            </div>
            </div>
`
    ); 
  }

   
  }

async function getCategories(){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list
`)
 let data = await response.json()
 displayCategories(data.meals)  

}

function displayCategories(array,count=25){
  $(".main-content").html("")
  for (let index = 0; index < count; index++) {
    $(".main-content").append(
      ` <div class="col-md-3 g-4 ">
            <div class="card position-relative overflow-hidden" onclick="categoryClick('${array[index].strCategory}')">
              <div class="image w-100 rounded-2 overflow-hidden">
                <img src="https://cdn-icons-png.freepik.com/256/857/857681.png?semt=ais_hybrid" alt="food image" class="w-100">
  
                <div class="head-category main-bg mt-1 text-center p-2 rounded-2 d-flex align-items-center justify-content-center">            
                <h2>${array[index].strCategory}</h2>
              </div>
              </div>
            </div>
            </div> `
    );    
  }
}

///////////////////////////////////////////////////////////////

async function ingredientClick(Name) {
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Name}`);
  let data = await respone.json();
  displayClickedIngregient(data.meals)
}

function displayClickedIngregient(array,count=25) {
  $(".main-content").html("")
  for (let i = 0; i < count; i++) {

    $(".main-content").append(
`<div class="col-md-3 g-4 ">
            <div class="card position-relative overflow-hidden " onclick="cardClick(${array[i].idMeal})">
              <div class="image w-100 rounded-2 overflow-hidden">
                <img src=${array[i].strMealThumb} alt="food image" class="w-100">
  
                <div class="head p-2 rounded-2 d-flex align-items-center">            
                <h2>${array[i].strMeal}</h2>
              </div>
              </div>
            </div>
            </div>
`
    ); 
  }
  }

async function getIngredients(){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list
`)
 let data = await response.json()
 displayIngredients(data.meals)  

}

function displayIngredients(array,count=20){
  $(".main-content").html("")
  for (let index = 0; index < count; index++) {
    $(".main-content").append(
      ` <div class="col-md-3 g-4 ">
            <div class="card position-relative overflow-hidden" onclick="ingredientClick('${array[index].strIngredient}')">
              <div class="image w-100 rounded-2 overflow-hidden">
                <img src="https://cdn-icons-png.flaticon.com/512/4080/4080032.png" alt="food image" class="w-100">
  
                <div class="head p-2 rounded-2 d-flex align-items-center">            
                <h2>${array[index].strIngredient}</h2>
              </div>
              </div>
            </div>
            </div> `
    );    
  }
}

////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

async function areaClick(Name) {
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Name}`);
  let data = await respone.json();
  displayClickedArea(data.meals)
}

function displayClickedArea(array,count=25) {
  $(".main-content").html("")
  for (let i = 0; i < count; i++) {

    $(".main-content").append(
`<div class="col-md-3 g-4 ">
            <div class="card position-relative overflow-hidden " onclick="cardClick(${array[i].idMeal})">
              <div class="image w-100 rounded-2 overflow-hidden">
                <img src=${array[i].strMealThumb} alt="food image" class="w-100">
  
                <div class="head p-2 rounded-2 d-flex align-items-center">            
                <h2>${array[i].strMeal}</h2>
              </div>
              </div>
            </div>
            </div>
`
    ); 
  }

   
  }

async function getArea(){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list
`)
 let data = await response.json()
 displayArea(data.meals)  
}

function displayArea(array,count=25){

 $(".main-content").html("")
  for (let index = 0; index < count; index++) {
    $(".main-content").append(
      ` <div class="col-md-3 g-4 ">
            <div class="card position-relative overflow-hidden" onclick="areaClick('${array[index].strArea}')">
              <div class="image w-100 rounded-2 overflow-hidden">
                <img src="https://cdn-icons-png.flaticon.com/512/9746/9746676.png" alt="food image" class="w-100">
  
                <div class="areaHead p-2 rounded-2 d-flex align-items-center justify-content-center">            
                <h2>${array[index].strArea}</h2>
              </div>
              </div>
            </div>
            </div> `
    );    
  }
}

////////////////////////////////////////////////////////////////
let $userName = $("#userName");
let $userEmail = $("#userEmail");
let $userPhone = $("#userPhone");
let $userAge = $("#userAge");
let $userPass = $("#userPass");
let $userRepass = $("#userRepass");
let $submitBtn = $("#submit");

$userName.on("input", function () {
  if (validation($userName, nameRegex)) {
    $userName.next().addClass("d-none").removeClass("d-block");
  } else {
    $userName.next().removeClass("d-none").addClass("d-block");
  }
});

$userEmail.on("input", function () {
  if (validation($userEmail, emailRegex)) {
    $userEmail.next().addClass("d-none").removeClass("d-block");
  } else {
    $userEmail.next().removeClass("d-none").addClass("d-block");
  }
});

$userAge.on("input", function () {
  if (validation($userAge, ageRegex)) {
    $userAge.next().addClass("d-none").removeClass("d-block");
  } else {
    $userAge.next().removeClass("d-none").addClass("d-block");
  }
});

$userPhone.on("input", function () {
  if (validation($userPhone, numberRegex)) {
    $userPhone.next().addClass("d-none").removeClass("d-block");
  } else {
    $userPhone.next().removeClass("d-none").addClass("d-block");
  }
});

$userPass.on("input", function () {
  if (validation($userPass, passRegex)) {
    $userPass.next().addClass("d-none").removeClass("d-block");
  } else {
    $userPass.next().removeClass("d-none").addClass("d-block");
  }
});

$userRepass.on("input", function () {
  if ($userRepass.val() === $userPass.val()) {
    $userRepass.next().addClass("d-none").removeClass("d-block");
  } else {
    $userRepass.next().removeClass("d-none").addClass("d-block");
  }
});

$userName.on("blur", function () {
  validation($userName, nameRegex);
  check();
});

$userEmail.on("blur", function () {
  validation($userEmail, emailRegex);
  check();
});

$userAge.on("blur", function () {
  validation($userAge, ageRegex);
  check();
});

$userPhone.on("blur", function () {
  validation($userPhone, numberRegex);
  check();
});

$userPass.on("blur", function () {
  validation($userPass, passRegex);
  check();
});

$userRepass.on("blur", function () {
  check();
});

let nameRegex = /^([a-zA-Z]){1,}([a-zA-Z0-9_\s]+)$/;
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let numberRegex = /^(\+2){0,1}01[0125][0-9]{8}$/;
let ageRegex = /^[1-9][0-9]?$|^100$/;
let passRegex = /^([a-zA-Z]){1,}([a-zA-Z0-9]{3,})$/;

function validation($element, regex) {
  return regex.test($element.val());
}

function match() {
  return $userRepass.val() === $userPass.val();
}

function check() {
  if (
    validation($userName, nameRegex) &&
    validation($userEmail, emailRegex) &&
    validation($userAge, ageRegex) &&
    validation($userPhone, numberRegex) &&
    validation($userPass, passRegex) &&
    match()
  ) {
    $submitBtn.removeAttr("disabled");
  } else {
    console.log("faaaaaaaaaaaaaaaaaaalse");
  }
}

$submitBtn.on("click", function () {
  $userName.val("");
  $userEmail.val("");
  $userPhone.val("");
  $userAge.val("");
  $userPass.val("");
  $userRepass.val("");
});

jQuery(function () {
  $(".loading").fadeOut(1500,function() {
    $("body").css({overflow:"auto"});    
  });
})



///////////////////////////////////////////////////////////////

// let userName = document.querySelector("#userName")
// let userEmail = document.querySelector("#userEmail")
// let userPhone = document.querySelector("#userPhone")
// let userAge = document.querySelector("#userAge")
// let userPass = document.querySelector("#userPass")
// let userRepass = document.querySelector("#userRepass")

// let submitBtn = document.querySelector("#submit")
// console.log(userName.nextElementSibling.classList.remove("d-none"));

// userName.addEventListener("input",function () {
//   if (validation(userName,nameRegex)){
//     userName.nextElementSibling.classList.add("d-none")
//     userName.nextElementSibling.classList.remove("d-block")
//   }else{
//     userName.nextElementSibling.classList.remove("d-none")
//     userName.nextElementSibling.classList.add("d-block")
//   }
// })
// userEmail.addEventListener("input",function () {
//   if (validation(userEmail,emailRegex)){
//     userEmail.nextElementSibling.classList.add("d-none")
//     userEmail.nextElementSibling.classList.remove("d-block")
//   }else{
//     userEmail.nextElementSibling.classList.remove("d-none")
//     userEmail.nextElementSibling.classList.add("d-block")
//   }
// })
// userAge.addEventListener("input",function () {
//   if (validation(userAge,ageRegex)){
//     userAge.nextElementSibling.classList.add("d-none")
//     userAge.nextElementSibling.classList.remove("d-block")
//   }else{
//     userAge.nextElementSibling.classList.remove("d-none")
//     userAge.nextElementSibling.classList.add("d-block")
//   }
// })

// userPhone.addEventListener("input",function () {
//   if (validation(userPhone,numberRegex)){
//     userPhone.nextElementSibling.classList.add("d-none")
//     userPhone.nextElementSibling.classList.remove("d-block")
//   }else{
//     userPhone.nextElementSibling.classList.remove("d-none")
//     userPhone.nextElementSibling.classList.add("d-block")
//   }
// })
// userPass.addEventListener("input",function () {
//   if (validation(userPass,passRegex)){
//     userPass.nextElementSibling.classList.add("d-none")
//     userPass.nextElementSibling.classList.remove("d-block")
//   }else{
//     userPass.nextElementSibling.classList.remove("d-none")
//     userPass.nextElementSibling.classList.add("d-block")
//   }
// })
// userRepass.addEventListener("input",function () {
//   if (userRepass.value === userPass.value){
//     userRepass.nextElementSibling.classList.add("d-none")
//     userRepass.nextElementSibling.classList.remove("d-block")
//   }else{
//     userRepass.nextElementSibling.classList.remove("d-none")
//     userRepass.nextElementSibling.classList.add("d-block")
//   }
// })


// ////
// userName.addEventListener("blur",function () {
//   validation(userName,nameRegex)  
//   check()
//  })




// userEmail.addEventListener("blur",function () {
//   validation(userEmail,emailRegex)  
//   check()

// })
// userAge.addEventListener("blur",function () {
//   validation(userAge,ageRegex)  
//   check()

// })
// userPhone.addEventListener("blur",function () {
//   validation(userPhone,numberRegex)
//   check()
  
// })
// userPass.addEventListener("blur",function () {
//   validation(userPass,passRegex)  
//   check()
// })


// userRepass.addEventListener("blur",function () {
//   check()
// })


// let nameRegex = /^([a-zA-Z]){1,}([a-zA-Z0-9_\s]+)$/
// let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
// let numberRegex = /^(\+2){0,1}01[0125][0-9]{8}$/
// let ageRegex = /^[1-9][0-9]?$|^100$/
// let passRegex = /^([a-zA-Z]){1,}([a-zA-Z0-9]{3,})$/


// function validation(element,regex) {
//   if (regex.test(element.value)) {
//     return true;
    
//   }else{
//     return false
//   }
// }

// function match() {
//   if (userRepass.value === userPass.value) {
//     return true
//   }else{
//     return false
//   }
// }
// function check() {
//   if (validation(userName,nameRegex) 
//   &&  validation(userEmail,emailRegex)  
//   &&  validation(userAge,ageRegex)  
//   &&  validation(userPhone,numberRegex)  
//   &&  validation(userPass,passRegex) 
//   && match() 
//   ) {
//   submitBtn.removeAttribute("disabled")
//   }else{
//     console.log("faaaaaaaaaaaaaaaaaaalse");
//   }
// }

// submitBtn.addEventListener("click",function () {
//   userName.value = ""
//   userEmail.value =""
//   userPhone.value=""
//   userAge.value=""
//   userPass.value=""
//   userRepass.value =""
// })


