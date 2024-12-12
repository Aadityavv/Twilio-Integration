import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import axios from "axios";
import 'dotenv/config';
import Twilio from "twilio";

const app = express();
const port = process.env.PORT || 4000;

app.set('view engine', 'ejs');
const saltRounds = 10;
const openweatherKey = "62fb0753edefa3493431dc7cfa992c7b";

// Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const twilioClient = Twilio(accountSid, authToken);

// Mongoose connection setup
mongoose.connect("mongodb://localhost:27017/Experiment_6")
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(`Error connecting to MongoDB: ${err.stack}`));

// Define User schema and model
const userSchema = new mongoose.Schema({
    username: String,
    phno: String,
    email: String,
    userPassword: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route for login page
app.get("/", (req, res) => res.render("login.ejs"));
app.get("/signup", (req, res) => res.render("signUP.ejs"));
app.get("/signIN", (req, res) => res.render("signIN.ejs"));

// Send OTP for sign-up
app.post("/send-otp", async (req, res) => {
    const { phno } = req.body;
    try {
        await twilioClient.verify.v2.services(verifyServiceSid)
            .verifications.create({ to: phno, channel: 'sms' });
        res.status(200).send("OTP sent successfully");
    } catch (error) {
        res.status(500).send("Failed to send OTP");
    }
});

// Verify OTP and complete sign-up
app.post("/verify-signup", async (req, res) => {
    const { name, phno, email, password, otp } = req.body;
    try {
        const verification = await twilioClient.verify.v2.services(verifyServiceSid)
            .verificationChecks.create({ to: phno, code: otp });
        if (verification.status === "approved") {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = new User({ username: name, phno, email, userPassword: hashedPassword });
            await newUser.save();
            res.redirect("/home");
        } else {
            res.status(400).send("Invalid OTP");
        }
    } catch (error) {
        res.status(500).send("Error during sign-up verification");
    }
});

// Send OTP for sign-in
app.post("/send-otp-signin", async (req, res) => {
    const { phno } = req.body;
    try {
        await twilioClient.verify.v2.services(verifyServiceSid)
            .verifications.create({ to: phno, channel: 'sms' });
        res.status(200).send("OTP sent successfully");
    } catch (error) {
        res.status(500).send("Failed to send OTP");
    }
});

// Verify OTP and complete sign-in
app.post("/verify-signin", async (req, res) => {
    const { phno, otp } = req.body;
    try {
        const verification = await twilioClient.verify.v2.services(verifyServiceSid)
            .verificationChecks.create({ to: phno, code: otp });
        if (verification.status === "approved") {
            const user = await User.findOne({ phno });
            if (user) {
                res.redirect("/home");
            } else {
                res.status(404).send("User not found");
            }
        } else {
            res.status(400).send("Invalid OTP");
        }
    } catch (error) {
        res.status(500).send("Error during sign-in");
    }
});

// Weather functionality
app.get("/home", async (req, res) => {
    // Weather fetching code remains the same
    try {
        const getLocation = await axios.get("http://ip-api.com/json/");
        const city = getLocation.data.city;
        const searchedLocation = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweatherKey}`);
        const sunriseTimestamp = searchedLocation.data.sys.sunrise * 1000;
        const sunriseDate = new Date(sunriseTimestamp);
        const sunriseStr = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunsetTimestamp = searchedLocation.data.sys.sunset * 1000;
        const sunsetDate = new Date(sunsetTimestamp);
        const sunsetStr = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const weatherMain = searchedLocation.data.weather[0].main;
        let color = "";

        if (weatherMain === "Clear") color = "rgba(255, 232, 80, 0.3)";
        else if (weatherMain === "Cloudy") color = "rgb(131,131,131,0.3)";
        else if (weatherMain === "Rain") color = "rgba(117, 182, 217, 0.8)";
        else if (weatherMain === "Drizzle" || weatherMain === "Fog" || weatherMain === "Mist") color = "rgb(172,172,172,0.3)";
        else if (weatherMain === "Snow") color = "rgb(255,255,255,0.3)";

        res.render("index", {
            city: searchedLocation.data.name,
            country: searchedLocation.data.sys.country,
            expectations: searchedLocation.data.weather[0].main,
            temp: Math.floor(searchedLocation.data.main.temp - 273.15),
            icon: searchedLocation.data.weather[0].icon,
            realTemp: Math.floor(searchedLocation.data.main.feels_like - 273.15),
            wind: searchedLocation.data.wind.speed,
            description: searchedLocation.data.weather[0].description,
            humidity: searchedLocation.data.main.humidity,
            pressure: searchedLocation.data.main.pressure,
            sunrise: sunriseStr,
            sunset: sunsetStr,
            minTemp: Math.floor(searchedLocation.data.main.temp_min - 273.15),
            maxTemp: Math.floor(searchedLocation.data.main.temp_max - 273.15),
            color: color
        });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).send("Error fetching weather data");
    }
});

// Start server
app.listen(port, () => console.log(`Listening on port ${port}`));
