const router = require("express").Router();
const auth = require("../middleware/auth");
const { User, BloodBank, Donations, Requests, Camp } = require("../models/models");

router.post("/:handle", auth, async (req, res) => {
    try {
        const filter = req.params.handle == "bank" ? {} : { password: 0, requests: 0, donations: 0, stock: 0, __v: 0 };
        const banks = await BloodBank.find(req.body, filter);
        res.json(banks);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/allBanks/:state/:district", async (req, res) => {
    try {
        const banks = await BloodBank.find({ state: req.params.state, district: req.params.district }, { password: 0, _id: 0, donations: 0, requests: 0, stock: 0 });
        res.json(banks);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.put("/updateStock", auth, async (req, res) => {
    try {
        const prevStock = await BloodBank.findOne({ _id: req.user }, { stock: 1 });
        await BloodBank.updateOne(
            { _id: req.user },
            { $set: { ["stock." + req.body.bloodGroup]: prevStock.stock[req.body.bloodGroup] + req.body.units } }
        )
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.put("/deleteStock", auth, async (req, res) => {
    try {
        const prevStock = await BloodBank.findOne({ _id: req.user }, { stock: 1 });
        if (prevStock.stock[req.body.bloodGroup] < req.body.units) {
            res.status(404).send("Not enough blood");
        } else {
            await BloodBank.updateOne(
                { _id: req.user },
                { $set: { ["stock." + req.body.bloodGroup]: prevStock.stock[req.body.bloodGroup] - req.body.units } }
            )
            res.status(200).send();
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/getStock", auth, async (req, res) => {
    try {
        const data = await BloodBank.findOne(
            { _id: req.user },
            { _id: 0, stock: 1 }
        )
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.put("/donations", auth, async (req, res) => {
    try {
        Donations.updateOne({ _id: req.body.id }, { status: req.body.status }, (err, user) => {
            if (err) {
                res.status(404).send("Donation not found");
            } else {
                res.status(200).send("Status updated");
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.put("/requests", auth, async (req, res) => {
    try {
        Requests.updateOne({ _id: req.body.id }, { status: req.body.status }, (err, user) => {
            if (err) {
                res.status(404).send("Request not found");
            } else {
                res.status(200).send("Status updated");
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/donations", auth, async (req, res) => {
    try {
        const data = await Donations.find({ bankId: req.user }).populate('userId', '-__v -password -requests -donations -stock');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/requests", auth, async (req, res) => {
    try {
        const data = await Requests.find({ bankId: req.user }).populate('userId', '-__v -password -requests -donations -stock');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.put("/", auth, async (req, res) => {
    try {
        console.log(req.user);
        BloodBank.updateOne({ _id: req.user }, req.body, (err, user) => {
            if (err) {
                res.status(404).send("BloodBank not found");
            } else {
                res.status(200).send("BloodBank updated");
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;