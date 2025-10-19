const vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const vendorregister = async (req, res) => {
    const { username, email, password } = req.body;
    //Gets the vendor’s username, email, and password from the signup form.
    try {
        const vendoremail = await vendor.findOne({ email });
        if (vendoremail) {
            return res.status(400).json({ message: 'Vendor email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        //The password is hashed (encrypted) using bcrypt before saving, so even if someone hacks the database, they can’t read it.
        const newVendor = new vendor({
            username,
            email,
            password: hashedPassword,
        });
        //Creates a new vendor and stores their data (with the hashed password) in MongoDB.
        await newVendor.save();
        res.status(201).json({ message: 'Vendor registered successfully' });
        console.log('Vendor registered:', newVendor);
    } catch (error) {
        res.status(500).json({ error: 'internal Server error' });
        console.error('Error registering vendor:', error);
    }   
};


const vendorlogin = async (req, res) => {
    const { email, password } = req.body;
    //Gets the email and password from the login form.
    try {
        const vendoremail = await vendor.findOne({ email });
        if (!vendoremail) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        /*It searches the database for a vendor with the given email.
            If no vendor is found, it immediately sends a 400 response (Bad Request) with an error message. */
        const isPasswordValid = await bcrypt.compare(password, vendoremail.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        /*It uses bcrypt to securely compare the entered password with the hashed password stored in the database.
            If the password doesn’t match, it again sends an error. */
        const token = jwt.sign({ vendorId: vendoremail._id }, process.env.jwt_secret, { expiresIn: '1h' });
        //If the email and password are correct, a JWT token is created. This token is like a special key that lets the vendor access protected parts of the website.and it expires in 1 hour.
        res.status(200).json({ message: 'Vendor logged in successfully', token });
        console.log('Vendor logged in:', vendoremail);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.error('Error logging in vendor:', error);
    }
};

module.exports = { vendorregister, vendorlogin };
