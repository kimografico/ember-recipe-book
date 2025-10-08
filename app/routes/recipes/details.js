import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RecipesDetailsRoute extends Route {
  @service store;

  async model(params) {
    return this.store.peekRecord('recipe', params.recipe_id);
  }
}
