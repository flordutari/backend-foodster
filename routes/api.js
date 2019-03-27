const express = require('express');
const router = express.Router();

const Tupper = require('../models/Tupper');

// const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');

router.get('/tuppers', async (req, res, next) => {
  // const { username } = req.query;
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
  // const { username } = req.query;
  try {
    const oneTupper = await Tupper.findById(id);
    if (!oneTupper) {
      res.status(404);
      res.json({ message: 'Tuppers not found' });
      return;
    }
    res.json(oneTupper);
  } catch (error) {
    next(error);
  }
});

router.post('/tuppers', async (req, res, next) => {
  const tupper = req.body;
  if (!tupper.name || !tupper.category || !tupper.imageUrl) {
    res.status(400);
    res.json({ message: 'Make sure you include name, category and image' });
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
