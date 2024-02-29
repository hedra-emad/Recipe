


var links = document.querySelectorAll('.navbar .nav-link');
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        getRecipes(e.target.innerHTML);
    })

}

var posts = [];

function displayData() {
    var cols = '';
    for (var i = 0; i < posts.length; i++) {
        cols += `
            <div class="col-md-3">
                <div class="post">
              <img src='${posts[i].image_url}' class="w-100 r-image">
                    <h3>${posts[i].title}</h3>
                    <a target="_blank" href="${posts[i].source_url}" class="btn btn-info">Source</a>
                    <a onclick="getDetails(${posts[i].recipe_id})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning">Details</a>
                </div>
            </div>
            `
        document.getElementById('postData').innerHTML = cols;

    }
}


async function getRecipes(meal) {

    var response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    var recipe = await response.json();
    posts = recipe.recipes;
    displayData();


}


async function getDetails(recipeId) {
    var response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
    var recipeInfo = await response.json();
    var recipeInfo = recipeInfo.recipe;

    var recipe=`
    <img src='${recipeInfo.image_url}' class="w-100 r-image">
    <h3 class="titleco">${recipeInfo.title}</h3>
    `
    document.getElementById('recipeData').innerHTML=recipe;
}

getRecipes('pizza');


/* function getRecipes(meal){
    var httpRequest = new XMLHttpRequest();
 httpRequest.open('GET', `https://forkify-api.herokuapp.com/api/search?q=${meal}`);
 httpRequest.send();
  httpRequest.addEventListener('readystatechange', function () {
    if (httpRequest.readyState == 4) {
        posts = JSON.parse(httpRequest.response).recipes;
       displayData();
    }
 })
 }
 */










