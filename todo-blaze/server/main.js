import { Meteor } from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/TasksCollections';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

const insertTask = (taskText,user) =>{
  TasksCollection.insertAsync({ 
    text: taskText ,
    userId : user._id,
    createdAt : new Date()
  });
} 

const SEED_USERNAME = 'test';
const SEED_PASSWORD = 'test@123';

Meteor.startup(async () => {

  if(!Accounts.findUserByUsername(SEED_USERNAME))
  {
    Accounts.createUser({
      username : SEED_USERNAME,
      password : SEED_PASSWORD
    },function(error) {
      if (error) {
        console.log('Error: ' + error.reason);
      } 
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  // code to run on server at startup
  if((await TasksCollection.find().countAsync()) === 0 ){
    [
      'First Task',
      'Second Task',
      'Third Task'
    ].forEach(insertTask);
  }
});