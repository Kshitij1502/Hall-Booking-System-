import React, { useEffect, useState } from 'react'
import { Tabs } from "antd";
import axios from 'axios';
import Error from "../components/Error";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { Tag, Divider } from 'antd';
const user = JSON.parse(localStorage.getItem('currentUser'))
const { TabPane } = Tabs;
function Profile() {
    return (
        <div className="mt-5 ml-3">
            <Tabs defaultActiveKey="1">
                <TabPane tab="My Profile" key="1">
                    <div className="row">
                        <div className="col-md-6 bs m-2 p-3">
                            <h1>Name : {user.name}</h1>
                            <h1>Email : {user.email}</h1>
                            {/* <h1>Admin Access : {user.isAdmin ? "Yes" : "No"}</h1>
                            <div className='text-right'>
                                <button className='btn btn-primary'>Get Admin Access</button>
                            </div> */}
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <h1>

                        <MyOrders />
                    </h1>
                </TabPane>
            </Tabs>

        </div>
    );
}

export default Profile;


export function MyOrders() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axios.post('api/bookings/getuserbookings', { userid: user._id });
                setBookings(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        }

        fetchData();
    }, [user._id]);


    async function cancelBooking(bookingid, hallid) {

        try {
            setLoading(true)
            const result = (await axios.post("/api/bookings/canclebooking", { bookingid, hallid })).data
            console.log(result)
            setLoading(false)
            Swal.fire('Congrats', 'Your Room has cancelled succeessfully', 'success').then(result => {
                window.location.href = '/profile'
            })
        } catch (error) {
            console.log(error)
            Swal.fire('Oops', 'Something went wrong', 'error').then(result => {
                window.location.href = '/profile'
            })
            setLoading(false)
        }

    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6 my-auto">
                    {loading && (<Loader />)}
                    {error && (<Error />)}
                    {bookings && (bookings.map(booking => (
                        <div key={booking._id}>
                            <h1>{booking.hall}</h1>
                            <p>BookingId : {booking._id}</p>
                            <p>TransactionId : {booking.transactionId}</p>
                            <p><b>Check In : </b>{booking.fromdate}</p>
                            <p><b>Check Out : </b>{booking.todate}</p>
                            <p><b>Amount : </b> {booking.totalAmount}</p>
                            <p><b>Status</b> : {booking.status == 'booked' ? (<Tag color="green">Confirmed</Tag>) : (<Tag color="red">Cancelled</Tag>)}</p>
                            {booking.status !== 'cancelled' && (<div className="text-right">
                                <button class='btn btn-primary' onClick={() => cancelBooking(booking._id, booking.hallid)}>Cancle Booking</button>

                            </div>)}
                        </div>
                    )))}
                </div>
            </div>
        </div>
    );
}

// export const MyOrders = () => {
//    // const [mybookings, setmybookings] = useState([]);
//    // const [loading, setloading] = useState(false);
//    // const [error, seterror] = useState(false);
//    // const [success, setsuccess] = useState(false);
//     useEffect(async () => {
//       try {
//         //setloading(true);
//         const data = await (
//           await axios.post("/api/bookings/getuserbookings", {
//             userid: JSON.parse(localStorage.getItem("currentUser"))._id,
//           })
//         ).data;
//        // setmybookings(data);
//        // setloading(false);
//       } catch (error) {
//        // setloading(false);
//        // seterror(true);
//       }
//     }, []);
