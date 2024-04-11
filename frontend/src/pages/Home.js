import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Home.css'; // Import the Home.css file

const Home = () => {
    return (
        <div className="home-container ">
            <div className="welcome-section">
                <div className="welcome-text">Welcome to Our Hall Booking Service</div>
                <Link to="/halls" className="book-now-btn">Book Now</Link>
            </div>
            <div className="service-section">
                <h2>Our Services</h2>
            </div>
            <div className="grid-section">
                <div className="grid-images">
                    <img src="/images/hall1.jpg" alt="Image 1" />
                    <div className="image-text">Marriage: Elegant venues for unforgettable weddings.</div>
                </div>
                <div className="grid-images">
                    <img src="/images/birthday.jpg" alt="Image 2" />
                    <div className="image-text">Birthday: Fun-filled spaces for memorable celebrations.</div>
                </div>
                <div className="grid-images">
                    <img src="/images/seminar.jpg" alt="Image 3" />
                    <div className="image-text">Seminar: Inspiring locations for productive gatherings</div>
                </div>
            </div>
            <div className="gallery-section">
                <h2>Gallery</h2>
                <div className="gallery-images">
                    <img src="/images/g-1.jpg" alt="Gallery Image 1" />
                    <img src="/images/g-2.jpg" alt="Gallery Image 2" />
                    <img src="/images/hall3.jpg" alt="Gallery Image 3" />
                </div>
            </div>
        </div>
    );
};

export default Home;

// import React from 'react';
// import './Home.css'; // Import the Home.css file

// const Home = () => {
//     return (
//         <div className="home-container">
//       <div className="welcome-text">Welcome to Our Event Planning Service</div>
     
//     </div>
//         //<div className="home-container">
//            // <h1>Welcome to our Hall Booking System</h1>
//             //<p>Discover the perfect venue for your events.</p>
//             /* <div className="hall-images">
//                 <img src="/images/hall1.jpg" alt="Hall 1" />
//                 <img src="/images/hall2.jpg" alt="Hall 2" />
//                 <img src="/images/hall3.jpg" alt="Hall 3" />
//             </div> */
//         //</div>
//     );
// };

// export default Home;
