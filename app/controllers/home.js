import Ember from 'ember';

export default Ember.Controller.extend({

  tasks: Ember.computed(function() {
    return this.get('store').findAll('task');
  }),

  todoTasks: Ember.computed('tasks.length','tasks.@each.status', function() {
    return this.get('tasks').filterBy('status','todo')
  }),
  progressTasks: Ember.computed('tasks.length','tasks.@each.status', function() {
    return this.get('tasks').filterBy('status','progress')
  }),
  doneTasks: Ember.computed('tasks.length','tasks.@each.status', function() {
    return this.get('tasks').filterBy('status','done')
  }),
  tasktypes: Ember.computed(function() {
    return this.get('store').findAll('tasktype');
  }),
  users: Ember.computed(function() {
    return this.get('store').findAll('user');
  }),

  isShowingModal: false,
  showDialog: false,
  showTaskDialog: false,

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
        task.destroyRecord();
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
        user: this.store.peekRecord('user', userId),
        tasktype: this.store.peekRecord('tasktype', tasktypeId)
      });
      u.save();
      this.send("toggleModal");
    },
    toggleModal: function() {
        this.toggleProperty('isShowingModal');
    },

    addTask(taskDescription, userId, tasktypeId){
      const u = this.store.createRecord('task', {
        description: taskDescription,
        status: "todo",
        user: this.store.peekRecord('user', userId),
        tasktype: this.store.peekRecord('tasktype', tasktypeId)
      });
      u.save();
      this.send("toggleTaskDialog");
    },
    toggleTaskDialog: function() {
        this.toggleProperty('showTaskDialog');
    },


  updateStatus: function(task, ops) {
     var status = ops.target.status;
     task.set("status", status);
     task.save();
   },



   toggleDialog: function() {
       this.toggleProperty('showDialog');
   },

   updateTask(taskDescription, userId, tasktypeId){
     const a = this.store.createRecord('task', {
       description: taskDescription,
       user: this.store.peekRecord('user', userId),
       tasktype: this.store.peekRecord('tasktype', tasktypeId)
     });
     var status = ops.target.status;
     task.set("description", description);
     task.set("user", user);
     task.set("tasktype", tasktype);
     u.save();
     this.send("toggleModal");
   },
   toggleModal: function() {
       this.toggleProperty('isShowingModal');
   }

 }
});
