import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr(),
  status: DS.attr(),
  user: DS.belongsTo('user', {async: true}),
  tasktype: DS.belongsTo('tasktype', {async: true}),
  createdAt: DS.attr('date', {
      defaultValue() { return new Date(); }
    }),
  updatedAt: DS.attr('date', {
      defaultValue() { return new Date(); }
    })
});
