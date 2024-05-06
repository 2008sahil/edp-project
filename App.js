const express = require('express');
const app = express();
const PORT = 4000;
const dotenv = require("dotenv");

dotenv.config();

const cors=require("cors")
const Redis = require("ioredis");
const redisUri = process.env.Env
const publisher = new Redis(redisUri);
const path = require("path");
app.use(cors())
// Set up a route to handle button clicks
app.get('/publish', (req, res) => {
    console.log("request aai")
    // Call the publishLog function when the route is accessed
    publishLog("button pressed");
    res.send('Message sent to Redis');
});
app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname,'./Code.html'))
})



const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});    
app.get('/',(req,res)=>{
    res.send("app is running")
})

// Function to publish log to Redis
function publishLog(log) {
    publisher.publish(`logs:edp`, JSON.stringify({ log }));
}
