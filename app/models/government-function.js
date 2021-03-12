import Model, { attr } from '@ember-data/model';

export default class GovernmentFunctionModel extends Model {
  @attr() label;
  @attr() uri;

  get rdfaBindings() {
    return { // eslint-disable-line ember/avoid-leaking-state-in-ember-objects
      class: "http://www.w3.org/ns/org#Role",
      label: "http://www.w3.org/2004/02/skos/core#prefLabel",
    }
  }
}
