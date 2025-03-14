import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from './ContactsCollection';

 
// We publish the entire Links collection to all clients.
// In order to be fetched in real-time to the clients
Meteor.publish("contacts", ()=> {
    return ContactsCollection.find();
});