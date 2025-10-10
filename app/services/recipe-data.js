import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class RecipeDataService extends Service {
  @service store;

  async loadRecipes() {
    let storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    let isInitialized = localStorage.getItem('recipes-initialized') === 'true';

    const addRecipeToStore = (recipe) => {
      let existingRecipe = this.store.peekRecord('recipe', recipe.id);
      if (!existingRecipe) {
        return this.store.createRecord('recipe', {
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        });
      }
      return existingRecipe;
    };

    if (!isInitialized) {
      let response = await fetch('/api/recipes.json');
      let data = await response.json();

      if (data && data.recipes) {
        let allRecipes = [...storedRecipes, ...data.recipes];
        localStorage.setItem('recipes', JSON.stringify(allRecipes));
        localStorage.setItem('recipes-initialized', 'true');

        return allRecipes.map(addRecipeToStore);
      }
    } else {
      return storedRecipes.map(addRecipeToStore);
    }

    return [];
  }

  async saveRecipe(recipe) {
    let storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    storedRecipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(storedRecipes));
  }

  deleteRecipe(recipeId) {
    let storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    let filteredRecipes = storedRecipes.filter(
      (recipe) => recipe.id !== recipeId,
    );
    localStorage.setItem('recipes', JSON.stringify(filteredRecipes));

    let existingRecipe = this.store.peekRecord('recipe', recipeId);
    if (existingRecipe) {
      existingRecipe.unloadRecord();
    }

    let favorites = this.getFavorites();
    if (favorites.includes(recipeId)) {
      let filteredFavorites = favorites.filter((id) => id !== recipeId);
      localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
    }
  }

  generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }

  getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }

  isFavorite(recipeId) {
    let favorites = this.getFavorites();
    return favorites.includes(recipeId);
  }

  toggleFavorite(recipeId, isFavorite) {
    let favorites = this.getFavorites();
    if (isFavorite) {
      if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
      }
    } else {
      favorites = favorites.filter((id) => id !== recipeId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
