import React from 'react';
import './about.css'; // Import the corresponding CSS file

function AboutPage() {
  return (
    <div className="about-page-container">
      <header>
        <h1>About Hall Booking</h1>
      </header>
      <section className="about-content">
        <div className="about-image">
          <img src="https://img.freepik.com/free-vector/vector-hall-banquet-wedding-interior-ballroom-with-tables-chairs-feast-celebration_1441-2354.jpg?t=st=1710535944~exp=1710539544~hmac=eda696e9c0d30860d8f84076fc3c65fa26a62362fe99dd3cd7e4939502e18622&w=900" />
        </div>
        <div className="our-promise">
          <b>
          <h2>Our Promise</h2>
          <p>We believe in providing our customers with the best possible service and are committed to making your event a lasting memorable experience by offering full-service planning packages so that you can enjoy every moment.</p>
          </b>
        </div>
      </section>
      {/* <footer>
        <p>3007 Ferry Promenade Street San Francisco CA 94107</p>
        <p>Tel: 213.555.1234</p>
        <p>Email: info@site.com</p>
      </footer> */}
    </div>
  );
}

export default AboutPage;
