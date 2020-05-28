import { elements } from './base'

//Recieve typed query
export const getInput = () => elements.searchInput.value;

//Show only a limit of 17 characters of words
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((arr, cur) => {
            if(arr + cur.length <= limit) {
                newTitle.push(cur);
            }
            return arr + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`
    }

    return title;
}

// Create results/Recipe HTML
const renderRecipe = recipe => {
    const markup = `
                <li>
                    <a class="results__link results__link--active" href="#${recipe.id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;

    elements.searchResList.insertAdjacentHTML("beforeend", markup);
}

//Clear typed query
export const clearInput = () => elements.searchInput.value = '';

//Clear results field and result buttons
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

// Function to create the button
const createButton = (page, type) => {
    
    return `<button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
    <span>${type === 'prev' ? page - 1 : page + 1} ${type}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>`
}

// Function to add the buttons to the page
const renderButtons = (numOfRecipes, page, resPerPage) => {
    const pages = Math.ceil(numOfRecipes / resPerPage);

    let button;

    if(page === 1 && pages > 1) {
        //Only Buttons to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Buttons to got to previous and next pages
        button = `${createButton(page, 'next')} ${createButton(page, 'prev')}`
    } else if (page === pages && pages > 1) {
        // Only Buttons to got to previous {
        button = createButton(page, 'prev');
        }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

//Function to add the results to page
export const renderResults = (recipes, page = 1, resPerPage = 10) => {

    const start =  (page - 1) * resPerPage;
    const end = page * resPerPage;
    // Adds only resPerPage amount of results.
    recipes.slice(start, end).forEach(recipe => renderRecipe(recipe)); 

    renderButtons(recipes.length, page, resPerPage);

}
