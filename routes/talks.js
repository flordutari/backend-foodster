const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const User = require('../models/User');
const Talk = require('../models/Talk');

const { isLoggedIn } = require('../helpers/middlewares');

router.get('/all', isLoggedIn(), async (req, res, next) => {
  const { _id } = req.session.currentUser;
  try {
    const allMineTalks = await Talks.findMany({ opener: _id, guest:_id});
    res.json(allMineTalks);
  } catch (error) {
    next(error);
  }
});

router.post('/new', async (req, res, next) => {
  const { guestId } = req.body;
  console.log(guestId)
  const { _id } = req.session.currentUser;
  try {
    const newTalk = new Talk({
      guest: ObjectId(guestId),
      opener: _id,
    });
    return newTalk.save()
    .then(() => {
      res.status(200).json(newTalk);
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
