import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'; // Import Moment.js for date formatting
import './Calendar.css'; // Import CSS for styling

const Calendar = () => {
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    axios.get('/api/bookings/getallbookings')
      .then(response => {
        const data = response.data;
        const booked = data.map(booking => ({
          fromDate: moment(booking.fromdate, 'DD-MM-YYYY').format('YYYY-MM-DD'), // Convert date format
          toDate: moment(booking.todate, 'DD-MM-YYYY').format('YYYY-MM-DD'), // Convert date format
          hallName: booking.hall // Adjust the key path if needed
        }));
        setBookedDates(booked);
      })
      .catch(error => console.error('Error fetching booked dates:', error));
  }, []);

  return (
    <div className="calendar-container">
      <h2>Booked Dates</h2>
      <table className="calendar-table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Hall Name</th>
          </tr>
        </thead>
        <tbody>
          {bookedDates.map((booking, index) => (
            <tr key={index}>
              <td>{booking.fromDate}</td>
              <td>{booking.toDate}</td>
              <td>{booking.hallName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
