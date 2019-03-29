const express = require('express');
const router = express.Router();
ObjectId = require('mongodb').ObjectID;

const Tupper = require('../models/Tupper');
const User = require('../models/User');

router.get('/tuppers', async (req, res, next) => {
  try {
    const allTuppers = await Tupper.find();
    res.json(allTuppers);
  } catch (error) {
    next(error);
  }
});

router.get('/tuppers/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneTupper = await Tupper.findById(id);
    if (!oneTupper) {
      res.status(404);
      res.json({ message: 'Tupper not found' });
      return;
    }
    res.json(oneTupper);
  } catch (error) {
    next(error);
  }
});

router.get('/tuppers/categories', (req, res, next) => {
  res.status(200).json({
    message: 'This is a private message'
  });
});

router.post('/tuppers', async (req, res, next) => {
  const { name, imageUrl, category, price } = req.body;
  const { _id } = req.session.currentUser;
  const tupper = { name, imageUrl, category, price, creator:{_id} };
  if (!tupper.name || !tupper.price || !tupper.category) {
    res.status(400);
    res.json({ message: 'Make sure you include name, category and price' });
    return;
  }
  try {
    const newTupper = await Tupper.create(tupper);
    res.status(200);
    res.json(newTupper);
  } catch (error) {
    next(error);
  }
});

router.put('/tuppers/:id', async (req, res, next) => {
  const { name, category, imageUrl } = req.body;
  if (!name || !category || !imageUrl) {
    res.status(400);
    res.json({ message: 'Make sure you include all the fields' });
  }
  const { id } = req.params;
  const tupper = {
    name,
    category,
    imageUrl
  };
  try {
    const editedTupper = await Tupper.findByIdAndUpdate(id, tupper, { new: true });
    res.status(200);
    res.json({ message: 'Tupper updated', data: editedTupper });
  } catch (error) {
    next(error);
  }
});

router.put('/tuppers/:id/buy', async (req, res, next) => {
  const { available, buyerId, buyerTickets, creatorTickets, creatorId  } = req.body;
  if (!req.body) {
    res.status(400);
    res.json({ message: 'Make sure you change the status' });
  }
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  try {
    const boughtTupper = await Tupper.findByIdAndUpdate(id, { "$set": { available: !available, buyerId}}, {new: true});
    const buyerUser = await User.findByIdAndUpdate(_id, {tickets: buyerTickets}, {new: true});
    const creatorUser = await User.findByIdAndUpdate(creatorId, {tickets: creatorTickets}, {new: true});
    req.session.currentUser = buyerUser;
    res.status(200);
    res.json({ message: 'Tupper and users updated', data: {boughtTupper, buyerUser, creatorUser } });
  } catch (error) {
    next(error);
  }
});

router.delete('/tuppers/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTupper = await Tupper.findByIdAndDelete(id);
    res.status(200);
    res.json({ message: 'Tupper deleted', data: deletedTupper });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
