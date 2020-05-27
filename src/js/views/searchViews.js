import { elements } from './base'

export const getInput = () => elements.searchInput.value;

const renderRecipe = recipe => {
    const markup = `
                <li>
                    <a class="results__link results__link--active" href="#${recipe.id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;

    elements.searchResList.insertAdjacentHTML("beforeend", markup);
}

export const clearInput = () => elements.searchInput.value = '';

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
}

export const renderResults = recipes => {
    recipes.forEach(recipe => renderRecipe(recipe));
}