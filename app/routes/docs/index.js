import Route from '@ember/routing/route';

export default class DocsIndexRoute extends Route {
  beforeModel() {
    this.transitionTo('docs.publication');
  }
}
