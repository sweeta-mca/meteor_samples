import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './TasksCollections';

Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});