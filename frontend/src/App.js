import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hallscreen from './pages/halls';
import ContactPage from './pages/contact';
import HomePage from './pages/Home';
import AboutPage from './pages/about';
import Booking from './pages/Booking';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Update from './pages/Update';
import Footer from "./components/Footer";
import Scroll from "./components/SmoothScroll";
import Calendar from './pages/calendar'; 


const App = () => {
    return (
        <Router>
            <AppContent />
            <Scroll />
        </Router>
    );
};

const AppContent = () => {
    const location = useLocation();
    const pathsWithoutNavbar = ["/login", "/Register", "/admin" , `/update/${location.pathname.split('/').pop()}`];
    const hideNavbar = pathsWithoutNavbar.includes(location.pathname);
    const pathsWithoutFooter = ["/login", "/Register", "/admin", `/update/${location.pathname.split('/').pop()}`];
    const hideFooter = pathsWithoutFooter.includes(location.pathname);
    return (
        <div className="App">
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/update/:id" element={<Update />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/halls" element={<Hallscreen />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/book/:hallid/:fromdate/:todate" element={<Booking />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            {!hideFooter && <Footer />}
        </div>
    );
};

export default App;
