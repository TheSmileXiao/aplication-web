const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Review = require('../models/reviews');
const { route } = require('./movies');

router.get('/:movie', async function(req, res) {
    try {
        const reviews = await Review.find({ cont: req.params.movie }).sort({ 'reviewRate': -1 });
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/:movie', async function(req, res) {
    try {
        const user = await User.findOne({ user: req.body.user });
        const rev = await Review.findOne({ user: user._id, cont: req.params.movie });
        if(rev == null) {
            const review = new Review({
                user: user._id,
                cont: req.params.movie,
                author: req.body.user,
                comment: req.body.text,
            });
            await review.save();
            res.status(200).send(review);
        }else {
            res.status(400).send(error);
        }
    } catch(error) {
        res.status(500).send(error);
    }
})

router.put('/:rev', async function(req, res) {
    try {
        const user = await User.findOne({ user: req.body.user });
        const rev = await Review.findOne({ _id: req.params.rev, 'rates.user': user._id }, 'rates -_id');
        if(rev == null) {
            await Review.updateOne({ _id: req.params.rev }, {
                $push: {
                    rates: {
                        user: user._id,
                        rate: req.body.rate,
                    }
                },
                $inc: { reviewRate: req.body.rate }
            });
        }else {
            var aux = rev.rates.filter(rate => rate.user.equals(user._id));
            var diff = req.body.rate - aux[0].rate;
            await Review.updateOne({ _id: req.params.rev, 'rates.user': user._id }, { $set: { "rates.$.rate": req.body.rate }, $inc: { reviewRate: diff } });
        }
        res.status(200).end();
    } catch(error) {
        res.status(500).send(error);
    }
});

router.delete('/:id', async function(req, res) {
    try {
        await Review.deleteOne({ _id: req.params.id });
        res.status(200).end();
    } catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;