import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr(),
  status: DS.attr(),
  user: DS.belongsTo('user'),
  tasktype: DS.belongsTo('tasktype')
});
