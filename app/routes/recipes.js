import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RecipesRoute extends Route {
  @service store;

  async model() {
    let response = await fetch('/api/recipes.json');
    let data = await response.json();

    return data.recipes.map((recipe) => {
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
    });
  }
}
