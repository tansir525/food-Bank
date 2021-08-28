document.getElementById("button").addEventListener("click", function () {
  const textinput = document.getElementById("input");
  const input = textinput.value;
  // clear data
  textinput.value = "";

  // load data
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.meals));
});

const displaySearchResult = (meals) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";

  //   if (meal.length == 0) {
  //     console.log("error");
  //   }

  meals.forEach((meal) => {
    // console.log(meal);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${
                  meal.strMealThumb
                }" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">
                        ${meal.strInstructions.slice(0, 180)}
                    </p>
                </div>
            </div>

    `;
    searchResult.appendChild(div);
  });
};

const loadMealDetail = (mealId) => {
  //   console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]));
};

const displayMealDetails = (meal) => {
  //   console.log(meal);
  const mealDetails = document.getElementById("meal-details");
  mealDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 180)}</p>
            </div>
  `;
  mealDetails.appendChild(div);
};
