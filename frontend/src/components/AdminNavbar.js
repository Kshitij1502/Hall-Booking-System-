import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { RiHome2Line, RiCalendarEventLine, RiContactsLine, RiInformationLine } from 'react-icons/ri'; // Icons from react-icons
import './Navbar.css'; // Create this CSS file for styling

const AdminNavbar = () => {

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/login';
    }

    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">
                Hall Booking Admin
            </Link>
            <Link to="/" className="nav-link">
                <RiHome2Line /> Home
            </Link>
            <Link to="/bookings" className="nav-link">
                <RiCalendarEventLine /> Bookings
            </Link>
            <Link to="/halls" className="nav-link">
                <RiCalendarEventLine /> Halls
            </Link>
            <Link to="/add-hall" className="nav-link">
                <RiCalendarEventLine /> Add Hall
            </Link>
            <Link to="/users" className="nav-link">
                <RiContactsLine /> Users
            </Link>
            {localStorage.getItem('currentUser') ? (
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-user" aria-hidden="true"></i> {JSON.parse(localStorage.getItem('currentUser')).name}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link className="dropdown-item" to="/profile">Profile</Link>
                        <button className="dropdown-item" onClick={logout}>Logout</button>
                    </div>
                </div>
            ) : (
                <>
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </>
            )}
        </nav>
    );
};

export default AdminNavbar;
