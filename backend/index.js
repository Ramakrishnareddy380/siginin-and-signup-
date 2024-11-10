


const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "rk1243";
app.use(express.json());

const users = []; // Changed from `user` to `users` for clarity

// Middleware for authentication
function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Token not provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    try {
        const decodedData = jwt.verify(token, JWT_SECRET);
        req.username = decodedData.username;
        next();
    } catch (err) {
        res.status(403).json({ msg: "Invalid token" });
    }
}


// Middleware for logging
function logger(req, res, next) {
    console.log(req.method + " request received");
    next();
}

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/signup", function (req, res) {
    const { username, password } = req.body;
    users.push({ username, password });
    res.json({ msg: "You are signed up" });
});

app.post("/signin", function (req, res) {
    const { username, password } = req.body;
    const foundUser = users.find(u => u.username === username && u.password === password);

    if (!foundUser) {
        return res.status(401).json({ msg: "User does not exist" });
    }

    const token = jwt.sign({ username: foundUser.username }, JWT_SECRET);
    res.json({ token });
});

app.get("/me", auth, (req, res) => {
    const foundUser = users.find(u => u.username === req.username);
    
    if (foundUser) {
        res.json({ username: foundUser.username, password: foundUser.password });
    } else {
        res.status(401).json({ message: "User not found" });
    }
});

app.get("/todo", logger, auth, function (req, res) {
    const foundUser = users.find(u => u.username === req.username);

    if (foundUser) {
        res.json({ username: foundUser.username, password: foundUser.password });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.post("/todo", logger, auth, function (req, res) {
    res.json({ message: "TODO created" });
});

app.delete("/todo", logger, auth, function (req, res) {
    res.json({ message: "TODO deleted" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
