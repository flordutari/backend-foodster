const express = require('express');
const router = express.Router();

const Tupper = require('../models/Tupper');
const User = require('../models/User');

router.get('/tuppers', async (req, res, next) => {
  try {
    const allTuppers = await Tupper.find();
    if (!allTuppers.length) {
      res.status(404);
      res.json({ message: 'Tuppers not found' });
      return;
    }
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

router.put('/tuppers/transaction/:id', async (req, res, next) => {
  const { available, owner, tickets } = req.body;
  if (!req.body) {
    res.status(400);
    res.json({ message: 'Make sure you change the status' });
  }
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  try {
    const editedBoughtTupper = await Tupper.findByIdAndUpdate(id, { "$set": { available: !available, owner}}, {new: true});
    const editedUser = await User.findByIdAndUpdate(_id, {tickets}, {new: true});
    res.status(200);
    res.json({ message: 'Tupper and user updated', data: {editedBoughtTupper, editedUser } });
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
