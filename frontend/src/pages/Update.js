import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const { hallId } = useParams();
  const [hall, setHall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchHall = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/halls/${hallId}`);
        setHall(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hall:', error);
        setError(true);
        setLoading(false);
      }
    };
  
    fetchHall();
  }, [hallId]);

  const updateHall = async (hallId, updatedData) => {
    try {
      const response = await axios.put(`/api/halls/updatehall/${hallId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating hall:', error);
      throw error; // Rethrow the error for handling in the caller
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    try {
      await updateHall(hallId, {
        name: document.getElementById('name').value,
        type: document.getElementById('type').value,
        rentperday: document.getElementById('rentperday').value,
        maxcount: document.getElementById('maxcount').value,
        description: document.getElementById('description').value,
        phonenumber: document.getElementById('phonenumber').value,
        imageurl1: document.getElementById('imageurl1').value,
        imageurl2: document.getElementById('imageurl2').value,
        imageurl3: document.getElementById('imageurl3').value,
      });
      console.log('Hall updated successfully');
      // Redirect to the updated hall's page or any other desired page
      window.location.href = `/hall/${hallId}`;
    } catch (error) {
      console.error('Error updating hall:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching hall</div>;

  return (
    <div>
      <h1>Update Hall</h1>
      <form onSubmit={handleUpdate}>
        {hall && (
          <>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" defaultValue={hall.name} /><br />
    
            <label htmlFor="type">Type:</label>
            <input type="text" id="type" defaultValue={hall.type} /><br />
    
            <label htmlFor="rentperday">Rent Per Day:</label>
            <input type="text" id="rentperday" defaultValue={hall.rentperday} /><br />
    
            <label htmlFor="maxcount">Max Count:</label>
            <input type="text" id="maxcount" defaultValue={hall.maxcount} /><br />
    
            <label htmlFor="description">Description:</label>
            <textarea id="description" defaultValue={hall.description} /><br />
    
            <label htmlFor="phonenumber">Phone Number:</label>
            <input type="text" id="phonenumber" defaultValue={hall.phonenumber} /><br />
    
            <label htmlFor="imageurl1">Image URL 1:</label>
            <input type="text" id="imageurl1" defaultValue={hall.imageurl1} /><br />
    
            <label htmlFor="imageurl2">Image URL 2:</label>
            <input type="text" id="imageurl2" defaultValue={hall.imageurl2} /><br />
    
            <label htmlFor="imageurl3">Image URL 3:</label>
            <input type="text" id="imageurl3" defaultValue={hall.imageurl3} /><br />
            </>
        )}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Update;




// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Update = () => {
//   const { hallId } = useParams();
//   const [hall, setHall] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchHall = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`/api/halls/updatehall/${hallId}`);
//         setHall(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching hall:', error);
//         setError(true);
//         setLoading(false);
//       }
//     };

//     fetchHall();
//   }, [hallId]);

//   const handleUpdate = async (event) => {
//     event.preventDefault(); // Prevent default form submission behavior
    
//     try {
//       const updatedHall = {
//         name: document.getElementById('name').value,
//         type: document.getElementById('type').value,
//         rentperday: document.getElementById('rentperday').value,
//         maxcount: document.getElementById('maxcount').value,
//         description: document.getElementById('description').value,
//         phonenumber: document.getElementById('phonenumber').value,
//         imageurl1: document.getElementById('imageurl1').value,
//         imageurl2: document.getElementById('imageurl2').value,
//         imageurl3: document.getElementById('imageurl3').value,
//       };
  
//       await axios.put(`/api/halls/updatehall/${hallId}`, updatedHall);
//       console.log('Hall updated successfully');
//       // Redirect to the updated hall's page or any other desired page
//       window.location.href = `/hall/${hallId}`;
//     } catch (error) {
//       console.error('Error updating hall:', error);
//       // Handle error, e.g., show an error message to the user
//     }
//   };
  

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching hall</div>;

//   return (
//     <div>
//       <h1>Update Hall</h1>
//       <form onSubmit={handleUpdate}>
//         <label htmlFor="name">Name:</label>
//         <input type="text" id="name" defaultValue={hall.name} /><br />
  
//         <label htmlFor="type">Type:</label>
//         <input type="text" id="type" defaultValue={hall.type} /><br />
  
//         <label htmlFor="rentperday">Rent Per Day:</label>
//         <input type="text" id="rentperday" defaultValue={hall.rentperday} /><br />
  
//         <label htmlFor="maxcount">Max Count:</label>
//         <input type="text" id="maxcount" defaultValue={hall.maxcount} /><br />
  
//         <label htmlFor="description">Description:</label>
//         <textarea id="description" defaultValue={hall.description} /><br />
  
//         <label htmlFor="phonenumber">Phone Number:</label>
//         <input type="text" id="phonenumber" defaultValue={hall.phonenumber} /><br />
  
//         <label htmlFor="imageurl1">Image URL 1:</label>
//         <input type="text" id="imageurl1" defaultValue={hall.imageurl1} /><br />
  
//         <label htmlFor="imageurl2">Image URL 2:</label>
//         <input type="text" id="imageurl2" defaultValue={hall.imageurl2} /><br />
  
//         <label htmlFor="imageurl3">Image URL 3:</label>
//         <input type="text" id="imageurl3" defaultValue={hall.imageurl3} /><br />
  
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
//   };  

// export default Update;
