import Ember from 'ember';

export default Ember.Controller.extend({

  todoTasks: Ember.computed('tasks', function() {
    return this.get('store').peekAll('task').filterBy('status','todo')
  }),
  progressTasks: Ember.computed('tasks', function() {
    return this.get('store').peekAll('task').filterBy('status','progress')
  }),
  doneTasks: Ember.computed('tasks', function() {
    return this.get('store').peekAll('task').filterBy('status','done')
  }),
  tasktypes: Ember.computed(function() {
    return this.get('store').findAll('tasktype');
  }),

  users: Ember.computed(function() {
    return this.get('store').findAll('user');
  }),
  isShowingModal: false,
  actions: {

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
    },


    deleteTask(taskid) {
        let store = this.get('store');
        store.findRecord('task', taskid, { backgroundReload: false }).then(function(task) {
        task.deleteRecord();
        task.get('isDeleted');
        task.save();
      });
    },

    addTask(taskDescription, userId, tasktypeId){
      let store = this.get('store');
      const task = this.store.createRecord('task', {
        description: taskDescription,
        user_id: userId,
        tasktype_id: tasktypeId
      });
      task.save();
    },

    toggleModal: function() {
        this.toggleProperty('isShowingModal');
    }
  }
});
