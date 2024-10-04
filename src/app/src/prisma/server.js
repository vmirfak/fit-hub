import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json());

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: 'User registered successfully!', user: { id: newUser.id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user!', error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // If successful, respond with user data or token
    res.status(200).json({ message: 'Login successful!', user });
});

app.post('/submit-feedback', async (req, res) => {
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
            },
        });
        res.status(201).json({ message: 'Feedback submitted successfully!', feedback });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ message: `Error saving feedback: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
