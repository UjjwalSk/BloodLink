const router = require("express").Router();
const { User, BloodBank } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register

router.post("/:handle", async (req, res) => {
    try {
        // validation
        const handle = req.params.handle;
        const existingUser = handle == "bank" ?
            await BloodBank.findOne({ phone: req.body.phone }) :
            await User.findOne({ phone: req.body.phone });
        if (existingUser)
            return res.status(400).json({
                errorMessage: "An account with this email already exists.",
            });

        // hash the password

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        req.body.password = passwordHash;
        // save a new user account to the db

        const newUser = handle == "bank" ? new BloodBank(req.body) : new User(req.body);
        const savedUser = await newUser.save();

        // sign the token
        const token = jwt.sign({ user: savedUser._id, type: handle }, process.env.JWT_SECRET);

        // send the token in a HTTP-only cookie

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// log in

router.post("/login/:handle", async (req, res) => {
    try {
        const { phone, password } = req.body;
        const handle = req.params.handle;
        const existingUser = await (handle == "bank" ? BloodBank.findOne({ phone: phone }) : User.findOne({ phone: phone }));
        if (!existingUser)
            return res.status(401).json({ errorMessage: "Wrong username or password." });
        const passwordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!passwordCorrect)
            return res.status(401).json({ errorMessage: "Wrong username or password." });

        // sign the token

        const token = jwt.sign(
            {
                user: existingUser._id,
                type: handle
            },
            process.env.JWT_SECRET
        );

        // send the token in a HTTP-only cookie

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            .send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/logout", (req, res) => {
    res
        .cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .send();
    console.log("Logged Out")
});

router.get("/loggedIn", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json({ auth: false });
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await (verified.type == "bank" ? BloodBank : User).findOne({ _id: verified.user }, { password: 0, donations: 0, requests: 0, stock: 0, __v: 0 });
        console.log("logged in")
        res.send({ auth: true, user: user });
    } catch (err) {
        console.log(err);
        res.json({ auth: false });
    }
});

module.exports = router;
