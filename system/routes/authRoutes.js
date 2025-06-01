
const express = require('express');
const router = express.Router();
// const { register, login, getMe, updateUser, deleteUser } = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: {
            user: {
                id: 1,
                username: req.body.username,
                email: req.body.email,
                role: 'user'
            }
        }
    });
});

// Login a user
router.post('/login', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: {
            user: {
                id: 1,
                username: req.body.username,
                email: req.body.email,
                role: 'user'
            },
            token: 'mocktoken123456'
        }
    });
});

// Get current user
router.get('/me', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            user: {
                id: 1,
                username: 'testuser',
                email: 'test@example.com',
                role: 'user'
            }
        }
    });
});

module.exports = router;
