import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from '../components/Error';
import moment from 'moment'; // Import moment library
import Swal from 'sweetalert2'
import { Result } from 'antd';

function Booking() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { hallid, fromdate, todate } = useParams(); // Extract hallid, fromdate, and todate from URL parameters
  const [hall, setHall] = useState(null);
  let totalDays = 0;
  let totalAmount = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/halls/gethallbyid', { hallid });
        setLoading(false);
        setHall(response.data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [hallid]);

  // Format dates to exclude time
  const formattedFromDate = moment(fromdate).format('DD-MM-YYYY');
  const formattedToDate = moment(todate).format('DD-MM-YYYY');

  // Calculate total days
  try {
    const duration = moment.duration(moment(todate).diff(moment(fromdate)));
    totalDays = duration.asDays() + 1;
  } catch (error) {
    console.error("Error calculating total days:", error);
    // Handle the error appropriately (e.g., set totalDays to 0)
  }

  // Calculate total amount based on total days and rent per day
  if (totalDays > 0 && hall && hall.rentperday) {
    totalAmount = totalDays * hall.rentperday;
  }

  async function bookHall() {
    const bookingDetails = {
      hall,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalAmount, // Update to TotalAmount
      totalDays // Update to TotalDays
    };
    try {
      setLoading(true);
      await axios.post('/api/bookings/bookhall', bookingDetails);
      setLoading(false);
      Swal.fire('Congrats' , 'Your Room has booked succeessfully' , 'success').then(Result=>{
        window.location.href='/profile'
      })
    } catch (error) {
      console.error("Error booking hall:", error);
      setLoading(false);
      Swal.fire('Oops' , 'Something went wrong , please try later' , 'error')
    }
    
}


  return (
    <div className='m-5'>
      {loading ? (
        <h1><Loader /></h1>
      ) : error ? (
        <Error />
      ) : hall ? (
        <div className="row p-3 mb-5 bs" data-aos='flip-right' duration='2000'>
          <div className="col-md-6">
            <h1>{hall.name}</h1>
            <img src={hall.imageurls[0]} style={{ height: '400px' }} alt={hall.name} />
          </div>
          <div className="col-md-6">
            <div className="text-right">
              <h1><b>Booking Details</b></h1>
              <hr />
              <p><b>Name:</b> {JSON.parse(localStorage.getItem('currentUser')).name}</p>
              <p><b>From Date:</b> {formattedFromDate}</p>
              <p><b>To Date:</b> {formattedToDate}</p>
              <p><b>Max Count:</b> {hall.maxcount}</p>
            </div>
            <div className="text-right">
              <h1><b>Amount</b></h1>
              <hr />
              <p><b>Total Days:</b> {totalDays}</p>
              <p><b>Rent Per Day:</b> {hall.rentperday}</p>
              <p><b>Total Amount:</b> {totalAmount}</p>
            </div>
            <div className="mt-5">
              <button className="btn btn-primary" onClick={bookHall}>Pay Now</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Booking;


