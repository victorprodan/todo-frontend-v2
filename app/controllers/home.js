import Ember from 'ember';

export default Ember.Controller.extend({

  tasks: Ember.computed(function() {
    return this.get('store').findAll('task');
  }),

  todoTasks: Ember.computed('tasks.length', function() {
    return this.get('tasks').filterBy('status','todo')
  }),
  progressTasks: Ember.computed('tasks.length', function() {
    return this.get('tasks').filterBy('status','progress')
  }),
  doneTasks: Ember.computed('tasks.length', function() {
    return this.get('tasks').filterBy('status','done')
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

    addUser(userName){
      const us = this.store.createRecord('user', {
        name: userName
      });
      us.save();
    },

    addTaskType(taskTypeName){
      const tt = this.store.createRecord('tasktype', {
        name: taskTypeName
      });
      tt.save();
    },

    addTask(taskDescription, userId, tasktypeId){
      const u = this.store.createRecord('task', {
        description: taskDescription,
        status: "todo",
        user_id: this.store.peekRecord('user', userId),
        tasktype_id: this.store.peekRecord('tasktype', tasktypeId)
      });
      u.save();
    },
    toggleModal: function() {
        this.toggleProperty('isShowingModal');
    }
  }
});
