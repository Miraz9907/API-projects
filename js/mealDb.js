const loadMeals = (searchtext) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchtext}`)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
}

const displayMeals = meals =>{
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';
    meals.forEach(meal =>{
        // console.log(meal);
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
        <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <p class="card-text">${meal.strInstructions.slice(0, 200)+"..."}</p>
                      <button onclick="loadMealDetails(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
                            Details
                        </button>
                    </div>
                  </div>
        `;
        mealsContainer.appendChild(mealDiv);
    })
}


const searchMeals = () =>{
    const searchField = document.getElementById("search-field").value;
    // console.log(searchField);
    loadMeals(searchField);
    searchField.value = '';

}

const loadMealDetails = idMeal =>{
    console.log(idMeal);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))

}

const displayMealDetails = meal =>{
    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
    const mealsDetailsBody = document.getElementById('mealDetailsBody');
    mealsDetailsBody.innerHTML = `
    <img class="img-fluid" src = "${meal.strMealThumb}">
    <p>${meal.strInstructions.slice(0, 200)+"..."}</p>
    `
}
loadMeals('fish');