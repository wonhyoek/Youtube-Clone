const express = require('express');
const router = express.Router();


const { Subscriber } = require("../models/Subscribe");

const { auth } = require("../middleware/auth");

//=================================
//             Subscribe
//=================================


router.post("/subscribeNumber", (req, res) => {

    Subscriber.find({ "userTo": req.body.userTo })
    .exec((err, subscribe) => {
        if(err) return res.send(err)

        res.json({ success: true, subscribeNumber: subscribe.length  })
    })

});



router.post("/subscribed", (req, res) => {

    Subscriber.find({ "userTo": req.body.userTo , "userFrom": req.body.userFrom })
    .exec((err, subscribe) => {
        if(err) return res.send(err)

        let result = false;
        if(subscribe.length !== 0) {
            result = true
        }

        res.json({ success: true, subcribed: result  })
    })

});

router.post("/subscribe", (req, res) => {

    const subscribe = new Subscriber(req.body);

    subscribe.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        return res.json({ success: true })
    })

});


router.post("/unSubscribe", (req, res) => {

    console.log(req.body)

    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc)=>{
            if(err) return res.json({ success: false, err});
            res.json({ success: true, doc })
        })
});






module.exports = router;
