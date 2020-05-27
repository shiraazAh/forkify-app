import Search from './models/Search';

/*** Global state of app ***/
/*  -Search Object
    -Current Recipe Object
    -Shopping List object
    -Liked Object
*/

const state = {}

const controlSearch = async () => {
    // 1) Get query from view 
    const query = 'pizza' //TODO

    if (query) {
        // 2) Create new search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI For Results

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI 
        console.log(state.search.result)
    }
} 

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

