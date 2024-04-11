import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import { Tag, Divider } from "antd";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';




const { TabPane } = Tabs;
const user = JSON.parse(localStorage.getItem("currentUser"));
function Admin() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await axios.post('/admin', {
        token: localStorage.getItem('token'),
      });

      if (response.status !== 200) {
        throw new Error('Logout failed: ' + response.statusText);
      }

      // Handle successful logout here (e.g., clear local storage, redirect)
      localStorage.removeItem('token'); // Clear token from local storage
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
      navigate("/login"); // Redirect to login page on error
    }
  };

  // useEffect(() => {
  //   logout(); // Call logout on component mount
  // }, []);
  //   const logout = async () => {
  //       try{
  //           const res = await axios.post('/admin', {
  //               token:localStorage.getItem('token')
  //           });


  //           if(!res.status === 200)
  //           {
  //               const error = new Error(res.error)
  //               throw error;
  //           }

  //       }
  //       catch(error)
  //       {
  //           console.log(error);
  //           navigate("/login");
  //       }
  //   }
  //   useEffect (() =>{
  //     logout();
  // }, []);

  return (
    <div className="ml-3">
      <div className="d-flex justify-content-end mb-2">
        <Button type="primary" onClick={logout}>Logout</Button>
      </div>
      <h2 className="text-center m-2" style={{ fontSize: "35px" }}>Admin Panel</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <div className="row">
            <Bookings />
          </div>
        </TabPane>
        <TabPane tab="Halls" key="2">

          <div className="row">
            <Halls />
          </div>

        </TabPane>
        <TabPane tab="Add Hall" key="3">


          <Addhall />


        </TabPane>
        <TabPane tab="Users" key="4">

          <Users />

        </TabPane>
        <TabPane tab="Messages" key="5">

          <Messages />

        </TabPane>
        <TabPane tab="Reports" key="6">
          <Tabs>
            <TabPane tab="Date" key="date">
             <Date />
            </TabPane>
            <TabPane tab="Hall" key="hall">
              <Hall />
            </TabPane>
            <TabPane tab="User" key="user">
              <User />
            </TabPane>
            <TabPane tab="Confirm" key="confirm">
              <Confirm />
            </TabPane>
            <TabPane tab="Cancel" key="cancel">
              <Cancel />
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;

// export function Bookings() {
//   const [bookings, setbookings] = useState([]);
//   const [loading, setloading] = useState(false);
//   const [error, seterror] = useState(false);
//   const [success, setsuccess] = useState(false);
//   useEffect(async () => {
//     try {
//       setloading(true);
//       const data = await (
//         await axios.get("/api/bookings/getallbookings")
//       ).data;
//       setbookings(data);
//       setloading(false);
//     } catch (error) {
//       setloading(false);
//       seterror(true);
//     }
//   }, []);
export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await axios.get("/api/bookings/getallbookings");
        setBookings(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();

  }, []);
  return (
    <div className='col-md-11'>
      <h1>Bookings</h1>
      {loading ? (<Loader />) : error ? (<Error />) : (<div>

        <table className='table table-bordered table-dark'>
          <thead className='bs'>
            <tr>
              <th>Booking Id</th>
              <th>Userid</th>
              <th>Hall</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => {
              return <tr>
                <td>{booking._id}</td>
                <td>{booking.userid}</td>
                <td>{booking.hall}</td>
                <td>{booking.fromdate}</td>
                <td>{booking.todate}</td>
                <td>{booking.status}</td>
              </tr>
            })}
          </tbody>
        </table>

      </div>)}
    </div>
  )
}

export function Halls() {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await axios.get("/api/halls/getallhalls");
        setHalls(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();

  }, []);

  const handleUpdateClick = (hallId) => {
    // Redirect to the Update page with the hall ID
    window.location.href = `/update/${hallId}`;
  };
  

  const handleDelete = async (hallId) => {
    try {
      const response = await axios.delete(`/api/halls/${hallId}`);
      if (response.status === 200) {
        setHalls(halls.filter(hall => hall._id !== hallId));
        Swal.fire('Success', 'Hall deleted successfully', 'success');
      } else {
        throw new Error('Delete request failed');
      }
    } catch (error) {
      console.error('Error deleting hall:', error);
      Swal.fire('Error', 'Failed to delete hall', 'error');
    }
  };
  // export function Halls() {
  //   const [halls, sethalls] = useState([]);
  //   const [loading, setloading] = useState(false);
  //   const [error, seterror] = useState(false);
  //   const [success, setsuccess] = useState(false);
  //   useEffect(async () => {
  //     try {
  //       setloading(true);
  //       const data = await (
  //         await axios.get("/api/halls/getallhalls")
  //       ).data;
  //       sethalls(data);
  //       setloading(false);
  //     } catch (error) {
  //       setloading(false);
  //       seterror(true);
  //     }
  //   }, []);

  return (
    <div className="col-md-11">
      <h1>Halls</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <table className="table table-bordered table-dark">
            <thead className="bs">
              <tr>
                <th>Hall Name</th>
                <th>Type</th>
                <th>Rent Per day</th>
                <th>Hall Id</th>
                <th>Max Count</th>
                <th>Phone Number</th>
                <th>Actions</th> {/* Add column for actions */}
              </tr>
            </thead>
            <tbody>
              {halls.map((hall, index) => (
                <tr key={index}>
                  <td>{hall.name}</td>
                  <td>{hall.type}</td>
                  <td>{hall.rentperday}</td>
                  <td>{hall._id}</td>
                  <td>{hall.maxcount}</td>
                  <td>{hall.phonenumber}</td>
                  <td>
                  {/* <button onClick={() => handleUpdateClick(hall._id)}>Update</button> */}
            <Button type="danger" onClick={() => handleDelete(hall._id)}>Delete</Button>
          </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

//     return (
//         <div className='col-md-11'>
//             <h1>Halls</h1>
//             {loading ? (<Loader/>) : error ? (<Error/>) : (<div>

//                    <table className='table table-bordered table-dark'>
//                        <thead className='bs'>
//                            <tr>
//                                <th>Hall Name</th>
//                                <th>Type</th>
//                                <th>Rent Per day</th>
//                                <th>Hall Id</th>
//                                 <th>Max Count</th>
//                                <th>Phone Number</th>
//                            </tr>
//                        </thead>
//                        <tbody>
//                            {halls.map((hall, index) => (
//  <tr key={index}> {/* Assign a unique key to each tr element */}
//                                    <td>{hall.name}</td>
//                                    <td>{hall.type}</td>
//                                    <td>{hall.rentperday}</td>
//                                    <td>{hall._id}</td>
//                                    <td>{hall.maxcount}</td>
//                                    <td>{hall.phonenumber}</td>
//                                </tr>
//                            ))}
//                        </tbody>
//                    </table>

//             </div>)}
//         </div>
//     )
// }



export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/getallusers');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();

  }, []);
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`/api/users/${userId}`);
      if (response.status === 200) {
        // Filter out the deleted user from the state
        setUsers(users.filter(user => user._id !== userId));
        Swal.fire('Success', 'User deleted successfully', 'success');
      } else {
        throw new Error('Delete request failed');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire('Error', 'Failed to delete user', 'error');
    }
  };

  return (
    <div className='row'>
      {loading && (<Loader />)}

      <div className="col-md-10">
        <table className='table table-bordered table-dark'>
          <thead className='bs'>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>isAdmin</th>
              <th>Action</th> {/* Add column for action */}
            </tr>
          </thead>
          <tbody>
            {users && (users.map(user => {
              return <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td>
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            }))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// export function Addhall() {
//   const [hall, sethall] = useState("");
//   const [rentperday, setrentperday] = useState();
//   const [maxcount, setmaxcount] = useState();
//   const [description, setdescription] = useState("");
//   const [phonenumber, setphonenumber] = useState("");
//   const [type, settype] = useState("");
//   const [image1, setimage1] = useState("");
//   const [image2, setimage2] = useState("");
//   const [image3, setimage3] = useState("");
//   async function addHall()
//   {
//       const hallobj = {
//         hall , 
//           rentperday, maxcount ,description ,phonenumber ,type ,image1 ,image2 ,image3
//       }
//       try {
//           const result = await axios.post('/api/halls/addhall' , hallobj)
//       } catch (error) {

//       }
//   }
//   return (
//     <div className="row">

//         <div className="col-md-5">
//           <input
//             type="text"
//             className="form-control mt-1"
//             placeholder="name"
//             value={room}
//             onChange={(e) => {
//               sethall(e.target.value);
//             }}
//           />

//           <input
//             type="text"
//             className="form-control mt-1"
//             placeholder="rentperday"
//             value={rentperday}
//             onChange={(e) => {
//               setrentperday(e.target.value);
//             }}
//           />

//           <input
//             type="text"
//             className="form-control mt-1"
//             placeholder="maxcount"
//             value={maxcount}
//             onChange={(e) => {
//               setmaxcount(e.target.value);
//             }}
//           />

//           <input
//             type="text"
//             className="form-control mt-1"
//             placeholder="description"
//             value={description}
//             onChange={(e) => {
//               setdescription(e.target.value);
//             }}
//           />

//           <input
//             type="text"
//             className="form-control mt-1"
//             placeholder="phonenumber"
//             value={phonenumber}
//             onChange={(e) => {
//               setphonenumber(e.target.value);
//             }}
//           />

//         </div>

//         <div className="col-md-6">
//         <input
//             type="text"
//             className="form-control mt-1"
//             placeholder="type"
//             value={type}
//             onChange={(e) => {
//               settype(e.target.value);
//             }}
//           />
//         <input
//             type="text"
//             className="form-control mt-1"
//             placeholder="Image url 1"
//             value={image1}
//             onChange={(e) => {
//               setimage1(e.target.value);
//             }}
//           />
//           <input
//             type="text"
//             className="form-control mt-1"
//             placeholder="Image url 2"
//             value={image2}
//             onChange={(e) => {
//               setimage2(e.target.value);
//             }}
//           />
//           <input
//             type="text"
//             className="form-control mt-1"
//             placeholder="Image url 3"
//             value={image3}
//             onChange={(e) => {
//               setimage3(e.target.value);
//             }}
//           />
//           <div className='mt-1 text-right'>
//           <button className="btn btn-primary" onClick={addHall}>ADD HALL</button>
//           </div>
//         </div>

//     </div>
//   );
// }

export function Addhall() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [name, setname] = useState('');
  const [rentperday, setrentperday] = useState();
  const [maxcount, setmaxcount] = useState();
  const [description, setdescription] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [type, settype] = useState();
  const [imageurl1, setimageurl1] = useState();
  const [imageurl2, setimageurl2] = useState();
  const [imageurl3, setimageurl3] = useState();

  async function addHall() {
    const newhall = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1, imageurl2, imageurl3]
    }
    try {
      setLoading(true);
      const result = await (await axios.post('/api/halls/addhall', newhall)).data
      console.log(result)
      setLoading(false)
      Swal.fire('congrats', "New Hall Added Successfully", 'success').then(result => {
        window.location.href = '/home'
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
      Swal.fire('OOps', 'Somethings went wrong', 'error')
    }
  }
  return (
    <div className="row">

      <div className="col-md-5">
        {loading && <Loader />}
        <input
          type="text"
          className="form-control mt-1"
          placeholder="hall name"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="rentperday"
          value={rentperday}
          onChange={(e) => {
            setrentperday(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="maxcount"
          value={maxcount}
          onChange={(e) => {
            setmaxcount(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="phonenumber"
          value={phonenumber}
          onChange={(e) => {
            setphonenumber(e.target.value);
          }}
        />

      </div>

      <div className="col-md-6">
        <input
          type="text"
          className="form-control mt-1"
          placeholder="type"
          value={type}
          onChange={(e) => {
            settype(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image url 1"
          value={imageurl1}
          onChange={(e) => {
            setimageurl1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image url 2"
          value={imageurl2}
          onChange={(e) => {
            setimageurl2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image url 3"
          value={imageurl3}
          onChange={(e) => {
            setimageurl3(e.target.value);
          }}
        />
        <div className='mt-1 text-right'>
          <button className="btn btn-primary" onClick={addHall}>ADD HALL</button>
        </div>
      </div>

    </div>
  );
}
export function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/messages/getallmessages');
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteMessage = async (messageId) => {
    try {
      const response = await axios.delete(`/api/messages/${messageId}`);
      if (response.status === 200) {
        // Filter out the deleted message from the state
        setMessages(messages.filter(message => message._id !== messageId));
        Swal.fire('Success', 'Message deleted successfully', 'success');
      } else {
        throw new Error('Delete request failed');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      Swal.fire('Error', 'Failed to delete message', 'error');
    }
  };

  return (
    <div className="row">
      {loading && <Loader />}
      {!loading && !error && (
        <div className="col-md-10">
          <h2>Messages</h2>
          <table className="table table-bordered table-dark">
            <thead className="bs">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Action</th> {/* Add column for action */}
              </tr>
            </thead>
            <tbody>
              {messages.map(message => (
                <tr key={message._id}>
                  <td>{message._id}</td>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.message}</td>
                  <td>
                    <button onClick={() => deleteMessage(message._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {error && <Error />}
    </div>
  );
}
export function Date() {
  const [dateBookingReportData, setDateBookingReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make an HTTP GET request to fetch the date booking report data
    axios.get('/api/bookings/date-booking-report')
      .then(response => {
        // Handle the successful response
        const data = response.data;
        setDateBookingReportData(data);
        setLoading(false);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching date booking report:', error);
        setError(error);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <div>
      <h2>Date Booking Report</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message="Failed to fetch date booking report" />
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Bookings</th>
            </tr>
          </thead>
          <tbody>
            {dateBookingReportData.map(item => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
}

export function Hall() {
  const [hallBookingReportData, setHallBookingReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchHallBookingReport = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/bookings/hall-booking-report');
        setHallBookingReportData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hall booking report:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchHallBookingReport();
  }, []);

  return (
    <div>
      <h2>Hall Booking Report</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message="Failed to fetch hall booking report" />
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Hall Name</th>
              <th>Bookings</th>
            </tr>
          </thead>
          <tbody>
            {hallBookingReportData.map(item => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export function User() {
  const [userBookingReportData, setUserBookingReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserBookingReport = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/bookings/user-booking-report');
        setUserBookingReportData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user booking report:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchUserBookingReport();
  }, []);

  return (
    <div>
      <h2>User Booking Report</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message="Failed to fetch user booking report" />
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Bookings</th>
            </tr>
          </thead>
          <tbody>
            {userBookingReportData.map(item => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export function Confirm() {
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchConfirmedBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/bookings/confirmed-bookings');
        setConfirmedBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching confirmed bookings:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchConfirmedBookings();
  }, []);

  return (
    <div>
      <h2>Confirmed Bookings</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message="Failed to fetch confirmed bookings" />
      ) : confirmedBookings.length === 0 ? (
        <p>No confirmed bookings available.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Hall Name</th>
              <th>User ID</th>
              <th>From Date</th>
              <th>To Date</th>
            </tr>
          </thead>
          <tbody>
            {confirmedBookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.hall}</td>
                <td>{booking.userid}</td>
                <td>{booking.fromdate}</td>
                <td>{booking.todate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export function Cancel() {
  const [canceledBookings, setCanceledBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCanceledBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/bookings/cancel-booking-report');
        setCanceledBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching canceled bookings:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchCanceledBookings();
  }, []);

  return (
    <div>
      <h2>Canceled Bookings</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message="Failed to fetch canceled bookings" />
      ) : canceledBookings.length === 0 ? (
        <p>No canceled bookings available.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Hall Name</th>
              <th>User ID</th>
              <th>From Date</th>
              <th>To Date</th>
            </tr>
          </thead>
          <tbody>
            {canceledBookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.hall}</td>
                <td>{booking.userid}</td>
                <td>{booking.fromdate}</td>
                <td>{booking.todate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}