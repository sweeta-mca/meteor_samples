import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';
import { TasksCollection } from '../api/TasksCollections';
import {ReactiveDict} from 'meteor/reactive-dict';


import './App.html';
import './Task.js'
import './Login.js';


const IS_LOADING_STRING = "isLoading";
const HIDE_COMPLETED_STRING = 'hideCompleted';
const getUser = () =>Meteor.user();
const isUserLogged = () => !!getUser();

const getTaskFilter =() =>{
    const user = getUser();

    const hideCompletedFilter = {isChecked : {$ne : true}};

    const userFilter = user ? {userId : user._id} : {};

    const pendingOnlyFilter = {...hideCompletedFilter, ...userFilter}
    return {userFilter, pendingOnlyFilter};
}

Template.mainContainer.onRendered( function mainContainerCreated(){
    const instance = Template.instance;
    instance.state = new ReactiveDict();
    const handler = Meteor.subscribe('tasks');   
    Tracker.autorun(() => {
       Template.instance.state.set(IS_LOADING_STRING, !handler.ready());
    });
});

Template.mainContainer.helpers({
    tasks (){     
        const instance = Template.instance;
        const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);   

        //const hideCompletedFilter = {isChecked : {$ne : true}};

        const {pendingOnlyFilter, userFilter} = getTaskFilter();
        if(!isUserLogged())
        {
            return [];
        }

        return TasksCollection.find(hideCompleted ? pendingOnlyFilter : userFilter,{sort: {createdAt: -1}}).fetch();
    },
    hideCompleted(){
        return Template.instance.state.get(HIDE_COMPLETED_STRING);
    },

    incompleteCount() {
        if(!isUserLogged()){
            return '';
        }
        const {pendingOnlyFilter} = getTaskFilter();    
        const incompleteTaskCount = TasksCollection.find(pendingOnlyFilter).count();
        return incompleteTaskCount ? `(${incompleteTaskCount})` : '';
    },
    isUserLogged() {
        return isUserLogged();
    },
    getUser() {
        return  getUser();
    },
    isLoading() {
        return Template.instance.state.get(IS_LOADING_STRING);
      }
});

Template.mainContainer.events({
"click #hide-completed-button" (event) {
    const instance = Template.instance;
    const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
    instance.state.set(HIDE_COMPLETED_STRING,!currentHideCompleted);
},
"click .user" (event){
        return Meteor.logout();
}
})


Template.form.events({
    "submit .task-form" (event) {
        event.preventDefault();
        const target = event.target;
        const text = target.text.value;

      /*  TasksCollection.insert({
            text, 
            userId: getUser()._id ,
            createdAt: new Date()
        }); */

     // Insert a task into the collection
     Meteor.call('tasks.insert', text);

        target.text.value ="";
    }
 
});