import {Meteor} from "meteor/meteor";
import { ContactsCollection } from "./ContactsCollection";

Meteor.methods({
    "contacts.insert"(doc){ return ContactsCollection.insertAsync(doc)}
})