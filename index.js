require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

app.use("/public",express.static(__dirname+"/public"))

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html")
})

const fccDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: String,
    role: String,
    user_recommend: String,
    mostLike: String,
    prefer: [String],
    comment: String
});

const fccData = mongoose.model("fccData",fccDataSchema);

function datasub(param) {

    let {name,email,age,role,user_recommend,mostLike,prefer,comment} = param;
    
    if(prefer === undefined) {
        prefer = null;
    }
    else if (typeof prefer === "string") {
        prefer = [prefer];
    }

    fccData.create({
        name: name,
        email: email,
        age: age,
        role: role,
        user_recommend: user_recommend,
        mostLike: mostLike,
        prefer: prefer,
        comment: comment
    })
}

app.post("/", function(req, res) {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {datasub(req.body);}).catch((err) => console.log(err));
    res.send("<h1 style=\"text-align:center;\">response submitted</h1>");
})

app.listen(3000, () => {console.log("server started")})