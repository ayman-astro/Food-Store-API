const search_food = () => {
    const food = document.getElementById("search").value;
    find_foods(food);
};

const find_foods = (food) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
        .then((res) => res.json())
        .then((data) => {
            display_foods(data.meals);
        })
        .catch((err) => {
            console.log(err);
        });
};

const display_foods = (foods) => {
    const container = document.getElementById("display-foods-container");

    foods.forEach(food => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
        <div class="card" style="width: 18rem;" onclick="show_details('${food.idMeal}')">
            <img src="${food.strMealThumb}" class="card-img-top" alt="${food.strMeal}">
                <div class="card-body d-flex align-items-center justify-content-center" style="height: 10rem; color: orchid;">
                    <h1 class="card-text text-center">${food.strMeal}</h1>
                </div>
            </div>
        `;

        container.appendChild(div);
    });
};

const show_details = (meal_id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`)
        .then((res) => res.json())
        .then((data) => {
            const food = data.meals[0];
            const container = document.getElementById("selected-food-container");

            const div = document.createElement("div");
            div.classList.add("card");

            div.innerHTML = `
            <div class="card" style="width: 25rem;">
                <img src="${food.strMealThumb}" class="card-img-top" alt="${food.strMeal}">
                <div class="card-body">
                    <h3>${food.strMeal}</h3>
                    <h5>Ingredients</h5>
                    <li>${food.strIngredient1}</li>
                    <li>${food.strIngredient2}</li>
                    <li>${food.strIngredient3}</li>
                    <li>${food.strIngredient4}</li>
                    <li>${food.strIngredient5}</li>
                    <li>${food.strIngredient6}</li>
                    <li>${food.strIngredient7}</li>
                    <li>${food.strIngredient8}</li>
                    <li>${food.strIngredient9}</li>
                </div>
            </div>
            `;

            container.appendChild(div);
        })
        .catch((err) => {
            console.log(err);
        });
};