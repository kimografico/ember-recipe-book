import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RecipeShortOverview extends Component {
  @tracked isExpanded = false;

  @action
  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
