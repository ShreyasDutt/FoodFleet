import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post("/createuser", [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            password: securedPassword,
            location: req.body.location,
        });
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post("/loginuser",[
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userdata = await User.findOne({email});
      if (!userdata){
            return res.status(400).json({ error:"Invalid email or password" });
      }
        const passwdCompare = await bcrypt.compare(req.body.password,userdata.password);

      if (!passwdCompare) {
          return res.status(400).json({ error:"Invalid email or password" });
      }
            const data = {
                user:{
                    id:userdata.id
                }
            }
        const authSecret = "your_very_secret_key";
        // eslint-disable-next-line no-undef
            const authtoken = jwt.sign(data,authSecret)
          return res.json({ message: true,authtoken:authtoken});

    } catch (error) {
        console.error(error);
    }
})

export default router;
