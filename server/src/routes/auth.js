import express from 'express';
import { register, login, logout, profile, updateProfile } from '../controllers/authController.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', profile);
router.put('/update', updateProfile);
router.get('/users', async (req, res) => {
  try {
    const users = await users.find(); // Fetch all users from the database
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

export default router;
