import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;
const prisma = new PrismaClient();

app.use(cors({
    origin: 'http://localhost:5173', // Update the origin to match your frontend URL
}));
app.use(express.json());

// Register User
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUserByEmail = await prisma.user.findUnique({ where: { email } });
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'Email already in use!' });
        }

        const existingUserByUsername = await prisma.user.findUnique({ where: { username } });
        if (existingUserByUsername) {
            return res.status(400).json({ message: 'Username already in use!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            },
        });
        res.status(201).json({ message: 'User registered successfully!', user: { id: newUser.id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user!', error: error.message });
    }
});


// Login User
app.post('/login', async (req, res) => {
    const { username, password } = req.body; // Ensure you're extracting username

    console.log('Login request body:', req.body); // Log the incoming request

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required!' });
    }

    try {
        // Look for the user by username
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error during login!', error: error.message });
    }
});

// Middleware to verify JWT token for protected routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

    if (!token) return res.sendStatus(401); // No token found

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user; // Add user info to the request
        next(); // Proceed to the next middleware/route handler
    });
};

// Submit Feedback (Protected Route)
app.post('/submit-feedback', authenticateToken, async (req, res) => {
    const { fullName, emailAddress, feedbackMessage, rating, category } = req.body;

    try {
        // Insert feedback into the database
        const feedback = await prisma.feedback.create({
            data: {
                fullName,
                emailAddress,
                feedbackMessage,
                rating,
                category,
                userId: req.user.userId, // Associate feedback with the logged-in user
            },
        });
        res.status(201).json({ message: 'Feedback submitted successfully!', feedback });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ message: `Error saving feedback: ${error.message}` });
    }
});

// Server Listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
