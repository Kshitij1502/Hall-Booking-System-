const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment"); // Import moment library
const Hall = require("../models/hall")
router.post("/bookhall", async (req, res) => {
    try {
        const {
            hall,
            userid,
            fromdate,
            todate,
            totalAmount,
            totalDays
        } = req.body;

        // Validate required fields
        if (!hall || !userid || !fromdate || !todate || !totalAmount || !totalDays) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Create a new booking object
        const newBooking = new Booking({
            userid,
            hall: hall.name,
            hallid: hall._id,
            totalDays: totalDays,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            totalAmount: totalAmount,
            transactionId: "1234",
        });

        // Save the new booking
        const booking = await newBooking.save();

        const halltemp = await Hall.findOne({ _id: hall._id });

        halltemp.currentbookings.push({ bookingid: booking._id,
             fromdate: moment(fromdate).format("DD-MM-YYYY"), 
             todate: moment(todate).format("DD-MM-YYYY"),
             userid : userid,
             status : booking.status
        });

        await halltemp.save()
        // Respond with success message
        res.send('Hall Booked Successfully');
    } catch (error) {
        // Log the error for debugging
        console.error("Error booking hall:", error);

        // Respond with error message
        return res.status(500).json({ error: "An error occurred while booking the hall" });
    }
});

// router.post("/getbookingsbyuserid", async (req, res) => {

//     const userid = req.body.userid;

//     try {
//         const bookings = await Booking.find({ userid });
//         res.send(bookings); // Send the bookings as response
//     } catch (error) {
//         return res.status(400).json({ error });
//     }
// });
router.post("/getuserbookings", async (req, res) => {
    const { userid } = req.body;
    try {
      const bookings = await Booking.find({ userid: userid }).sort({ _id: -1 });
      res.send(bookings);
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });

  router.post("/canclebooking",async (req, res) => {

    const {bookingid , hallid}= req.body

    try {
        const bookingitem = await Booking.findOne({_id : bookingid})
        bookingitem.status = 'cancelled'
        await bookingitem.save()

        const hall = await Hall.findOne({_id : hallid})

        const bookings = hall.currentbookings

        const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)
        hall.currentbookings = temp
        await hall.save()


        res.send('Your Booking Cancelled successfully')
    } catch (error) {
        return res.status(400).json({error})
    }

  })
  router.get("/getallbookings", async (req, res) => {
    try {
      const bookings = await Booking.find({});
      res.send(bookings);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });

  router.get("/getAvailability", async (req, res) => {
    try {
      // Fetch all bookings from the database
      const bookings = await Booking.find({});
      
      // Extract available and booked dates from the bookings
      const availableDates = [];
      const bookedDates = [];
      bookings.forEach((booking) => {
        const fromDate = new Date(booking.fromdate);
        const toDate = new Date(booking.todate);
        const currentDate = new Date(fromDate);
        while (currentDate <= toDate) {
          if (booking.status === "booked") {
            bookedDates.push(currentDate.toISOString().split("T")[0]);
          } else if (booking.status === "cancelled") {
            // Handle cancelled bookings if needed
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
  
      // Respond with available and booked dates
      res.json({ availableDates, bookedDates });
    } catch (error) {
      // Handle errors
      console.error("Error fetching availability:", error);
      res.status(500).json({ error: "An error occurred while fetching availability" });
    }
  });

  router.get('/date-booking-report', async (req, res) => {
    try {
      const dateBookings = await Booking.aggregate([
        {
          $project: {
            bookingDate: { $dateFromString: { dateString: '$fromdate', format: '%d-%m-%Y' } }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$bookingDate' } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);
      res.json(dateBookings);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

router.get('/hall-booking-report', async (req, res) => {
  try {
    const hallBookings = await Booking.aggregate([
      {
        $group: {
          _id: '$hall',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'halls',
          localField: '_id',
          foreignField: '_id',
          as: 'hallDetails'
        }
      },
      {
        $project: {
          hallName: { $arrayElemAt: ['$hallDetails.name', 0] },
          count: 1
        }
      }
      
    ]);
    res.json(hallBookings);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});


router.get('/user-booking-report', async (req, res) => {
  try {
    const userBookings = await Booking.aggregate([
      {
        $group: {
          _id: '$userid',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users', // Assuming your users collection is named 'users'
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $project: {
          userName: { $arrayElemAt: ['$userDetails.name', 0] || "Unknown User" },
          count: 1
        }
      }
    ]);
    res.json(userBookings);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

router.get('/confirmed-bookings', async (req, res) => {
  try {
    const confirmedBookings = await Booking.find({ status: 'booked' });
    res.json(confirmedBookings);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

router.get('/cancel-booking-report', async (req, res) => {
  try {
    const confirmedBookings = await Booking.find({ status: 'cancelled' });
    res.json(confirmedBookings);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});


module.exports = router;
