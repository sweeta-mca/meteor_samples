import {Template} from "meteor/templating";
import {TasksCollection} from "../api/TasksCollections.js"
import "./Task.html";

Template.task.events({
    'click .toggle-checked'(){
        TasksCollection.update(this._id, {
            $set : {isChecked : !this.isChecked}
        });
    },

    'click .delete' (){
        if(this.isChecked){
            TasksCollection.remove(this._id)
        }
       
    }
})