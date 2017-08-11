import Ember from 'ember';

export default Ember.Controller.extend({
  tasks: Ember.computed(function() {
    return this.get('store').findAll('task');
  }),
  users: Ember.computed(function() {
    return this.get('store').findAll('user');
  }),
  tasktypes: Ember.computed(function() {
    return this.get('store').findAll('tasktype');
  }),

  actions: {
      deletetask(taskid) {
        let store = this.get('store');
        store.findRecord('task', taskid, { backgroundReload: false }).then(function(task) {
        task.deleteRecord();
        task.get('isDeleted');
        task.save();
      });
    },

    deleteuser(userid) {
      let store = this.get('store');
      store.findRecord('user', userid, { backgroundReload: false }).then(function(user) {
      user.deleteRecord();
      user.get('isDeleted');
      user.save();
      });
    },

    deletetasktype(tasktypeid) {
      let store = this.get('store');
      store.findRecord('tasktype', tasktypeid, { backgroundReload: false }).then(function(tasktype) {
      tasktype.deleteRecord();
      tasktype.get('isDeleted');
      tasktype.save();
      });
    }
  }
});
