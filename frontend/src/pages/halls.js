import React, { useState, useEffect } from "react";
import axios from "axios";
import Hall from "../components/Hall";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker } from 'antd';
import 'antd/dist/reset.css';
import moment from "moment";
const { RangePicker } = DatePicker;

function Hallscreen() {
    const [halls, setHalls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedDates, setSelectedDates] = useState(null); // Store selected dates
    const [duplicateHalls, setDuplicateHalls] = useState([]);
    const [searchkey, setsearchkey] = useState('')
    const[type , settype]=useState('all')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/api/halls/getallhalls");
                setHalls(response.data);
                setDuplicateHalls(response.data); // Set duplicatehotes state with response data
            } catch (error) {
                console.log(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Update selected dates
    // const handleDateChange = (dates) => {
    //     setSelectedDates(dates);

    //     const startDate = moment(dates[0], 'DD-MM-YYYY');
    //     const endDate = moment(dates[1], 'DD-MM-YYYY');

    //     const tempHalls = duplicateHalls.filter(hall => {
    //         let isAvailable = true;
    //         for (const booking of hall.currentbookings) {
    //             const bookingStartDate = moment(booking.fromdate, 'DD-MM-YYYY');
    //             const bookingEndDate = moment(booking.todate, 'DD-MM-YYYY');

    //             if (startDate.isBetween(bookingStartDate, bookingEndDate, undefined, '[]') ||
    //                 endDate.isBetween(bookingStartDate, bookingEndDate, undefined, '[]') ||
    //                 bookingStartDate.isBetween(startDate, endDate, undefined, '[]') ||
    //                 bookingEndDate.isBetween(startDate, endDate, undefined, '[]')) {
    //                 isAvailable = false;
    //                 break;
    //             }
    //         }
    //         return isAvailable;
    //     });

    //     setHalls(tempHalls);
    // }
   // Update selected dates
// Update selected dates
const handleDateChange = (dates) => {
    setSelectedDates(dates);

    const startDate = moment(dates[0], 'DD-MM-YYYY');
    const endDate = moment(dates[1], 'DD-MM-YYYY');

    const tempHalls = duplicateHalls.filter(hall => {
        // Check if the hall has any bookings overlapping with the selected date range
        const hasOverlappingBooking = hall.currentbookings.some(booking => {
            const bookingStartDate = moment(booking.fromdate, 'DD-MM-YYYY');
            const bookingEndDate = moment(booking.todate, 'DD-MM-YYYY');

            return (
                startDate.isBetween(bookingStartDate, bookingEndDate, undefined, '[]') ||
                endDate.isBetween(bookingStartDate, bookingEndDate, undefined, '[]') ||
                bookingStartDate.isBetween(startDate, endDate, undefined, '[]') ||
                bookingEndDate.isBetween(startDate, endDate, undefined, '[]')
            );
        });

        // Return false if the hall has any overlapping bookings, indicating it is not available
        return !hasOverlappingBooking;
    });

    setHalls(tempHalls);
}

    function filterBySearch() {
        const filteredHalls = duplicateHalls.filter(hall => {
            const isAvailable = hall.currentbookings.every(booking => {
                const bookingStartDate = moment(booking.fromdate, 'DD-MM-YYYY');
                const bookingEndDate = moment(booking.todate, 'DD-MM-YYYY');
                const startDate = selectedDates ? moment(selectedDates[0], 'DD-MM-YYYY') : null;
                const endDate = selectedDates ? moment(selectedDates[1], 'DD-MM-YYYY') : null;
    
                if (startDate && endDate) {
                    // Check if the hall is booked for any overlapping dates
                    return (
                        endDate.isBefore(bookingStartDate, 'day') ||
                        startDate.isAfter(bookingEndDate, 'day')
                    );
                }
                return true;
            });
    
            // Check if the hall name matches the search key and is available
            return hall.name.toLowerCase().includes(searchkey) && isAvailable;
        });
    
        setHalls(filteredHalls);
    }
    
  
    function filterByType(e) {
        settype(e);
        let filteredHalls = [];
    
        if (e !== 'all') {
            // Filter halls by type
            filteredHalls = duplicateHalls.filter(hall => hall.type.toLowerCase().includes(e.toLowerCase()));
        } else {
            // Show all halls if the type is 'all'
            filteredHalls = duplicateHalls;
        }
    
        // Filter out booked halls
        filteredHalls = filteredHalls.filter(hall => {
            const isAvailable = hall.currentbookings.every(booking => {
                const bookingStartDate = moment(booking.fromdate, 'DD-MM-YYYY');
                const bookingEndDate = moment(booking.todate, 'DD-MM-YYYY');
                const startDate = selectedDates ? moment(selectedDates[0], 'DD-MM-YYYY') : null;
                const endDate = selectedDates ? moment(selectedDates[1], 'DD-MM-YYYY') : null;
    
                if (startDate && endDate) {
                    // Check if the hall is booked for any overlapping dates
                    return (
                        endDate.isBefore(bookingStartDate, 'day') ||
                        startDate.isAfter(bookingEndDate, 'day')
                    );
                }
                return true;
            });
    
            return isAvailable;
        });
    
        setHalls(filteredHalls);
    }
    
    return (
       //<div className=" bg-image">
        <div className="container">
            <div className='row mt-5'>
                <div className="col-md-3">
                    <RangePicker onChange={handleDateChange} format='DD-MM-YYYY' />
                </div>
                <div className="col-md-4">
            <input
              type="text"
              className="form-control i2 m-2"
              placeholder='Search Halls'
              value={searchkey}
              onKeyUp={filterBySearch}
              onChange={(e)=>{setsearchkey(e.target.value)}}
            />
          </div>
          <div className="col-md-4">
            <select className="form-control m-2" value={type} onChange={(e)=>{filterByType(e.target.value)}} >
              <option value="all">All Category</option>
              <option value="Birthday">Birthday</option>
              <option value="Marriage">Marriage</option>
              <option value="Seminar">Seminar</option>
            </select>
          </div>
            </div>
            <div className="row justify-content-center mt-5">
                {loading ? (
                    <Loader /> // Display Loader component when loading
                ) : error ? (
                    <Error /> // Display Error component when error occurs
                ) : halls.map(hall => (
                        <div className="col-md-9 mt-2" key={hall._id}>
                            <Hall hall={hall} fromdate={selectedDates && selectedDates[0]} todate={selectedDates && selectedDates[1]} /> {/* Pass selected dates to Hall component */}
                        </div>
                    ))
                }
            </div>
        </div>
       // </div>
    );
}

export default Hallscreen;
