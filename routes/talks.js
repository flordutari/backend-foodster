const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// const User = require('../models/User');
const Talk = require('../models/Talk');

const { isLoggedIn } = require('../helpers/middlewares');

router.get('/mines', isLoggedIn(), async (req, res, next) => {
  const { _id } = req.session.currentUser;
  try {
    const allMyTalks = await Talk.find({ $or: [ { opener: _id }, { guest: _id } ] } );
    res.json(allMyTalks);
  } catch (error) {
    next(error);
  }
});

router.post('/new', async (req, res, next) => {
  const { guestId } = req.body;
  const { _id } = req.session.currentUser;
  try {
    const newTalk = new Talk({
      guest: guestId,
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
