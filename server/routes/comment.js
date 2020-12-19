const express = require('express');
const router = express.Router();
const Comment = require("../models/Comment");

const { auth } = require("../middleware/auth");



router.post("/saveComment", (req, res) => {

   const comment = new Comment(req.body) 

    comment.save((err, comment ) => {
        if(err) return res.json({ success:false, err})

        Comment.find({ '_id': comment._id })
        .populate('writer')
        .exec((err, result) => {
            if(err) return res.json({ success:false, err })
            return res.json({ success:true, result })
        })

    })

});


router.post("/getComments", (req, res) => {

    Comment.find({ "videoId": req.body.videoId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.send(err)
            res.json({ success: true, comments })
        })
});






module.exports = router;