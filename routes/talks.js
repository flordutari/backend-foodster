const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Talk = require('../models/Talk');
const Message = require('../models/Message');

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

router.get('/:id', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneTalk = await Talk.findById(id).populate({
      path: 'guest opener messages',
      populate: {
        path: 'creator',
        model: 'User'
      }
    });
    res.json(oneTalk);
  } catch (error) {
    next(error);
  }
})

// const event = await Event.findById(eventId).populate({
//   path: 'comments.creator escapeRoom players creator',
//   populate: {
//     path: 'user',
//     model: 'User' }
// });

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

router.post('/:id', (req, res, next) => {
  const { message } = req.body;
  const { id } = req.params;
  const { _id } = req.session.currentUser;
    const newMessage = {
      comment: message,
      creator: _id,
    };
    Message.create(newMessage)
    .then(message => {
      return Talk.findByIdAndUpdate(id, { $push: { messages: message._id } }, {new: true} )
    })
    .then(talk => {
      res.status(200);
      res.json({ talk });
    })
    .catch(next)
});

module.exports = router;
