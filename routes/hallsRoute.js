const express = require("express");
const router = express.Router();
const Hall = require("../models/hall");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/getallhalls", async (req, res) => {
    try {
        const halls = await Hall.find();
        res.json(halls); // Sending JSON response with the retrieved halls
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' }); // Changed status code to 500 for server error
    }
});

router.post("/gethallbyid", async (req, res) => {
    const hallid = req.body.hallid;

    try {
        const hall = await Hall.findOne({ _id: hallid });
        if (!hall) {
            return res.status(404).json({ message: 'Hall not found' }); // Added handling for hall not found
        }
        res.json(hall); // Sending JSON response with the retrieved hall
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' }); // Changed status code to 500 for server error
    }
});
// router.post("/addhall", async (req, res) => {
//     const { hall, rentperday, maxcount, description, phonenumber, type, image1, image2, image3 } = req.body;
  
//     const newhall = new Hall({
//       name: hall,
//       rentperday,
//       maxcount,
//       description,
//       phonenumber,
//       type,
//       imageurls: [imageurl1, imageurl2, imageurl3],
//       currentbookings: []
//     });
  
//     try {
//       await newhall.save(); // Corrected from newroom.save() to newhall.save()
//       res.send('New Hall Added Successfully');
//     } catch (error) {
//       return res.status(400).json({ error });
//     }
//   });

router.post("/addhall", async (req, res) => {
  
  try {
    const newhall= new Hall(req.body)
    await newhall.save(); // Corrected from newroom.save() to newhall.save()
    res.send('New Hall Added Successfully');
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// router.get("/updatehall/:hallId", async (req, res) => {
//   const { hallId } = req.params;

//   try {
//       const updatedHall = await Hall.findByIdAndUpdate(hallId, req.body, { new: true });
//       if (!updatedHall) {
//           return res.status(404).json({ message: 'Hall not found' });
//       }
//       res.json(updatedHall);
//   } catch (error) {
//       res.status(500).json({ message: 'Something went wrong' });
//   }
// });
router.get('/halls/:hallId', async (req, res) => {
  const { hallId } = req.params;
  try {
    const hall = await Hall.findById(hallId);
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    res.json(hall);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Update hall data route
router.put('/updatehall/:hallId', authMiddleware.authenticateToken, async (req, res) => {
  const { hallId } = req.params;

  try {
    const updatedHall = await Hall.findByIdAndUpdate(hallId, req.body, { new: true });
    if (!updatedHall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    res.json(updatedHall);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

router.delete("/:hallId", async (req, res) => {
  const hallId = req.params.hallId;

  try {
      const deletedHall = await Hall.findByIdAndDelete(hallId);
      if (!deletedHall) {
          return res.status(404).json({ message: 'Hall not found' });
      }
      res.send('Hall deleted successfully');
  } catch (error) {
      return res.status(400).json({ message: error.message });
  }
});


module.exports = router;
