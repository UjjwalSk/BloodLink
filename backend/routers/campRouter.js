const router = require("express").Router();
const auth = require("../middleware/auth");
const { Camp } = require("../models/models");

router.post("/", auth, async (req, res) => {
    try {
        req.body.bankId = req.user;
        req.body.donors = [];
        const newCamp = new Camp(req.body);
        await newCamp.save();
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/:state?/:district?", auth, async (req, res) => {
    try {
        let query = {};
        if (req.params.state) {
            query.state = req.params.state;
            query.district = req.params.district;
        } else {
            query.bankId = req.user;
        }
        const data = await Camp.find(query).populate('bankId', '-_id -__v -password -requests -donations -stock').populate({
            path: "donors._id",
            select: '-__v -password'
        });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/allCamps/:state/:district/:date", async (req, res) => {
    try {
        if (req.params.date) {
            const data = await Camp.find({
                state: req.params.state,
                district: req.params.district,
                date: new Date(req.params.date)
            }, { donors: 0, _id: 0 }).populate("bankId","-_id -password -donations -requests -stock +name");
            res.json(data);
        } else{
            res.json({});
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.put("/:id/:userId?", auth, async (req, res) => {
    try {
        if (req.params.userId) {
            await Camp.update(
                {
                    _id: req.params.id,
                    donors: { $elemMatch: { _id: req.params.userId, status: 0 } }
                },
                { $set: { "donors.$.units": req.body.units, "donors.$.status": 1 } }
            )
        } else {
            if (await Camp.find({
                _id: req.params.id,
                donors: { $elemMatch: { _id: req.user } }
            }) != []) {
                await Camp.updateOne(
                    { _id: req.params.id },
                    { $push: { donors: { _id: req.user } } }
                );
            }
        }
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
})

module.exports = router;