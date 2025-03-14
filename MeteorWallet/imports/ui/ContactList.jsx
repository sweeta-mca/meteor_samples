import React from "react";
import { Contact } from './Contact';

export const ContactList = ({contacts}) => {
    return(
        <div>
            <h3>Contact List</h3>
            <ul>
            {contacts.map((con)=>(
                    <Contact key={con._id} contact={con}/>
            )) }
            </ul>
        </div>
    )
}