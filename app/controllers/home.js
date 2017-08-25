import Ember from 'ember';

export default Ember.Controller.extend({

  tasks: Ember.computed(function() {
    return this.get('store').findAll('task');
  }),
  newTask: Ember.computed(function() {
    return this.store.createRecord('task');
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

  selectedTask: null,
  newUser: null,
  newTaskType: null,

  showDialog: false,
  showTaskDialog: false,
  showAnimatedDialog: false,
  showTaskTypeDialog: false,
  showUserDialog: false,

  actions: {

    toggleUserDialog() {
      this.toggleProperty('showUserDialog');
    },

    deleteuser(userid) {
      let store = this.get('store');
      store.findRecord('user', userid, { backgroundReload: false }).then(function(user) {
      user.deleteRecord();
      user.get('isDeleted');
      user.save();
      });
      this.send('toggleUserDialog');
    },

    toggleTaskTypeDialog() {
      this.toggleProperty('showTaskTypeDialog');
    },

    deletetasktype(tasktypeid) {
      let store = this.get('store');
      store.findRecord('tasktype', tasktypeid, { backgroundReload: false }).then(function(tasktype) {
      tasktype.deleteRecord();
      tasktype.get('isDeleted');
      tasktype.save();
      });
      this.send('toggleTaskTypeDialog');
    },

    toggleAnimatedDialog() {
      this.toggleProperty('showAnimatedDialog');
    },

    deleteTask(taskid) {
        let store = this.get('store');
        store.findRecord('task', taskid, { backgroundReload: false }).then(function(task) {
        task.destroyRecord();
      });
      this.send('toggleAnimatedDialog');
    },

    addUser(newUser) {
      const us = this.store.createRecord('user', {
        name: newUser
      });
      us.save();
      this.set('newUser', '');
    },

    addTaskType(newTaskType) {
      const tt = this.store.createRecord('tasktype', {
        name: newTaskType
      });
      tt.save();
      this.set('newTaskType', '');
    },
    // addUser(userName){
    //   const us = this.store.createRecord('user', {
    //     name: userName
    //   });
    //   us.save();
    // },

    // addTaskType(taskTypeName){
    //   const tt = this.store.createRecord('tasktype', {
    //     name: taskTypeName
    //   });
    //   tt.save();
    // },

    addTask(task){
       task.set('status', "todo");
       task.save();
       this.send('toggleTaskDialog');
       this.set('newTask', this.store.createRecord('task'));
     },

    // addTask(taskDescription, userId, tasktypeId){
    //   const u = this.store.createRecord('task', {
    //     description: taskDescription,
    //     status: "todo",
    //     user: this.store.peekRecord('user', userId),
    //     tasktype: this.store.peekRecord('tasktype', tasktypeId)
    //   });
    //   u.save();
    //   this.send("toggleTaskDialog");
    // },

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

     setSelectedTask(task) {
       this.set('selectedTask', task)
       this.toggleProperty('showDialog');
     },

 }
});
