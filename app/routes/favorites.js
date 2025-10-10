import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class FavoritesRoute extends Route {
  @service recipeData;
  @service store;

  async model() {
    await this.recipeData.loadRecipes();
    let favoritesIds = this.recipeData.getFavorites();
    return favoritesIds.map((id) => this.store.peekRecord('recipe', id));
  }
}
