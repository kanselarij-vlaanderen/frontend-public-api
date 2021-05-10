import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { task } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';

export default class NewsItemsTableComponent extends Component {

  @service store;

  @tracked newsItems;
  @tracked page = 0;
  @tracked size = 10;

  constructor() {
    super(...arguments);
    this.getNewsItems.perform();
  }

  @task
  *getNewsItems() {
    const filter = {};
    if (this.args.person) {
      filter['mandatees'] = {
        person: {
          ':uri:': this.args.person
        }
      }
    } else if (this.args.mandatee) {
      filter['mandatees'] = { ':uri:': this.args.mandatee }
    }

    this.newsItems = yield this.store.query('news-item',
    {
      filter: filter ,
      sort: '-date',
      page: {
        size: this.size,
        number: this.page
      }
    });
  }

  @action
  selectPage(page) {
    this.page = page;
    this.getNewsItems.perform();
  }
}

