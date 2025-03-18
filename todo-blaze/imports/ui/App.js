import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';
import { TasksCollection } from '../api/TasksCollections';
import {ReactiveDict} from 'meteor/reactive-dict';


import './App.html';
import './Task.js'
import './Login.js';
import { get } from 'jquery';


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

Template.mainContainer.onCreated( function mainContainerCreated(){
    Template.instance.state = new ReactiveDict();
})

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

        TasksCollection.insert({
            text, 
            userId: getUser()._id ,
            createdAt: new Date()
        });
        target.text.value ="";
    }
 
});