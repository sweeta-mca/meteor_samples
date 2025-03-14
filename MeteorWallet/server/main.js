import { Meteor } from 'meteor/meteor'
import '../imports/api/ContactsPublications'
import '../imports/api/ContactsMethods'
import { ContactsCollection } from '../imports/api/ContactsCollection';


const insertContact = ({name,email,imageurl}) => ContactsCollection.insertAsync({name,email,imageurl});

Meteor.startup(async () => {
  if ((await ContactsCollection.find().countAsync()) === 0) {
    
    [
     {name:"rufino",email:"rufino@gmail.com",imageurl:"/test.png"}
    ].forEach(insertContact);
  }
});
