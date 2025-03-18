import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/TasksCollections';


const insertTask = taskText => TasksCollection.insertAsync({ text: taskText });

Meteor.startup(async () => {
  // code to run on server at startup
  if((await TasksCollection.find().countAsync()) === 0 ){
    [
      'First Task',
      'Second Task',
      'Third Task'
    ].forEach(insertTask);
  }
});




