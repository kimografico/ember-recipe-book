import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class RecipeModel extends Model {
  //   @attr('number') id;
  @attr('string') title;
  @attr('string') description;
  @attr('string') ingredients;
  @attr('string') instructions;
}
