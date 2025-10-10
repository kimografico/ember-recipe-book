import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RecipesDetailsController extends Controller {
  @service recipeData;
  @service router;

  @action deleteRecipe() {
    console.log('Delete recipe action triggered in controller');
    this.recipeData.deleteRecipe(this.model.id);
    this.router.transitionTo('recipes');
  }
}
