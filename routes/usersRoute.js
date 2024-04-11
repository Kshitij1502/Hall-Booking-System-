const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
    const newUser = new User(req.body);

    try {
        const user = await newUser.save();
        res.send('User Registered successfully');
    } catch (error) {
         return res.status(400).json({ message: error.message }); // Send error message instead of entire error object
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password }); // Corrected method name to findOne

        if (user) {
            res.send(user);
        } else {
            return res.status(400).json({ message: 'Login failed' });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message }); // Send error message instead of entire error object
    }
});
router.get("/getallusers", async(req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.delete("/:userId", async(req, res) => {
    const userId = req.params.userId;
  
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.send('User deleted successfully');
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
