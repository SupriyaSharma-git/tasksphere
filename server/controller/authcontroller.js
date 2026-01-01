import User from "../models/task.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key_here";

const signup = async (req, res) => {
    try {
        const { name, email, password, task } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already present" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, task });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "1h" });

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });

    } catch (error) {
        console.log("Error occurred : ", error);
        return res.status(500).json({ error: "Server error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User of this email is not present" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" })
        res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.log("Error occurred : ", error);
        return res.status(500).json({ error: "Server error" });
    }
}

const getMyTask = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: "User not Found" });
        }
        res.status(200).json({ tasks: user.task })
    } catch (error) {
        console.log("Error occurred : ", error);
        return res.status(500).json({ error: "Server error" });
    }
}

const addTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { mytask } = req.body;
        const user = await User.findById(userId);
        if (!userId) {
            return res.status(400).json({ message: "User not Found" });
        }
        user.task.push({ mytask });
        await user.save();
        res.status(200).json({ message: "Task added successfully", tasks: user.task });
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ error: "Server error" });
    }
}

const updateTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { taskId } = req.params;
        const { mytask } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not Found" });
        }
        const task = user.task.id(taskId);
        if (!task) {
            return res.status(400).json({ message: "Task not Found" });
        }
        task.mytask = mytask;
        await user.save();
        res.status(200).json({ message: "Task updated successfully", tasks: user.task });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Server error" });
    }
}

const deleteTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { taskId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not Found" });
        }
        user.task = user.task.filter(t => t._id.toString() !== taskId);
        await user.save();
        res.status(200).json({ message: "Task deleted", tasks: user.task })
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export { signup, login, getMyTask, addTask, updateTask, deleteTask };
