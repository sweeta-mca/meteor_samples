import React, { useState } from "react";
import { ContactsCollection } from "../api/ContactsCollection";

export const ContactForm = () => {
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [imageurl, setImageurl] = useState('');

    const save = async (e) =>{
        e.preventDefault();
        
        await Meteor.callAsync("contacts.insert",{name,email,imageurl});

        resetForm();
    }

    function resetForm()
    {
        setName('');
        setEmail('');
        setImageurl('');        
    }

    return (
        <form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
        </div>
        <div>
          <label htmlFor="imageurl">Image URL</label>
          <input type="text" name='imageurl' id='imageurl' onChange={(e)=>{setImageurl(e.target.value)}} value={imageurl}/>
        </div>
        <div>
          <button type="button" onClick={save}>
            Save Contact
          </button>
        </div>
      </form>
    )
}