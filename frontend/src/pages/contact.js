import React from 'react';
import './contact.css'; // Import the contact.css file
import ContactForm from '../components/ContactForm'; // Import the ContactForm component

const ContactPage = () => {
  return (
    //<div className="bg-image">
    <div className="contact-container"> 
      {/* <h1 className="contact-header">Contact</h1> */}
      <ContactForm />
    </div>
   // </div>
  );
};

export default ContactPage;
