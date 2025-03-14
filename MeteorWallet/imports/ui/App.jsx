import React from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';

import { ContactsCollection } from "../api/ContactsCollection";
import{useTracker,useSubscribe} from 'meteor/react-meteor-data';

export const App = () => {

  const isLoading = useSubscribe("contacts");
  const contacts = useTracker(() => ContactsCollection.find({}).fetch());

  /*if(isLoading)
  {
     return <div>Loading .......</div>
  }  */

  return(
  <div>
    <h1>E-Wallet</h1>
    <ContactForm />
    <ContactList contacts={contacts}/>
  </div>
)};
