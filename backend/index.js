const express=require("express");
const jwt=require("jsonwebtoken");
const app=express();
const JWT_SECRET="rk1243"
app.use(express.json());

const user=[]

function auth(req,res,next){
    const token=req.header.token;
    const decodedata=jwt.verify(token,JWT_SECRET);
    if (decodedata.username){

        req.username=decodedata.username;
        next()
    }else{
        res.json({
            msg:"fuck off"
        })
    }
}

function logger(req,res,next){
    console.log(req.method +"request came")
        next()
}

app.get("/",function(req,res){
    res.sendfile("./index.html");

})
app.post("/signup",function(req,res){
    const username=req.body.username
    const  password=req.body.password

    user.push({
        username:username,
        password:password

    })

    res.json({
        msg:"you are signed in"
    })

})
app.post("/signin", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;

    for (let i = 0; i < user.length; i++) {
        if (user[i].username === username && user[i].password === password) {
            foundUser = user[i]; // Store the found user
            break; // Exit the loop when user is found
        }
    }

    if (!foundUser) {
        res.status(401).json({
            msg: "User does not exist"
        });
        return;
    } else {
        const token = jwt.sign({
            username: foundUser.username // Use foundUser instead of 'i'
        }, JWT_SECRET);

        res.json({
            token: token
        });
    }
});





// app.get("/me", (req, res) => {
//     const token = req.headers.authorization;
//     const userDetails = jwt.verify(token, JWT_SECRET);

//     const username =  userDetails.username;
//     const user = users.find(user => user.username === username);

//     if (user) {
//         res.send({
//             username: user.username
//         })
//     } else {
//         res.status(401).send({
//             message: "Unauthorized"
//         })
//     }
// })
app.get("/me", (req, res) => {
    const token = req.headers.token; // Correct the way token is accessed
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }

    try {
        const userDetails = jwt.verify(token, JWT_SECRET);
        const username = userDetails.username;
        const foundUser = user.find((u) => u.username === username); // Correct array name to 'user'

        if (foundUser) {
            res.json({
                username: foundUser.username,
                password: foundUser.password
            });
        } else {
            res.status(401).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Token verification failed", error });
    }
});











app.get("/todo",logger,auth,function(req,res){
    const token=req.headers.token;
    const decodedata=jwt.verify(token,JWT_SECRET);
    // const decodedata=jwt.decode(token);
    const currentuser=req.username

    if (decodedata.username){
        let founduser=null;

        for (let i=0;i<user.length;i++){
            if(user[i].username==currentuser){
                founduser=user[i];
            }
        
        res.json({
            username:founduser.username,
            password:founduser.password
        })

    }
}

})


app.post("/todo",logger,auth,function(req,res){


})


app.delete("/todo",logger,auth,function(req,res){


})

app.listen(3000);