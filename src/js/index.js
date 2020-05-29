import Search from './models/Search';
import Recipe from './models/Recipe'
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchViews';

/*** Global state of app ***/
/*  -Search Object
    -Current Recipe Object
    -Shopping List object
    -Liked Object
*/

const state = {}

const controlSearch = async () => {
    // 1) Get query from view 
    const query = searchView.getInput()

    if (query) {
        // 2) Create new search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI For Results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI 
        searchView.renderResults(state.search.result); 
        clearLoader();
    }
} 

// Submit form event listener
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

//Pagination button event listener
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');

    if(btn) {
        const goto = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goto);
    }
})


/* Recipe Model */

