import axios from 'axios'; 

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getResults() {
        try {
        const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        this.ingredients = res.data.recipe.ingredients;
        this.image = res.data.recipe.image_url;
        this.author = res.data.recipe.publisher;
        this.url = res.data.recipe.source_url;
        this.title = res.data.recipe.title;

        console.log(res);
        } catch (error) {
            alert(error);
        }
    }
    
    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }
}