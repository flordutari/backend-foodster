const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneUser = await User.findById(id);
    if (!oneUser) {
      res.status(404);
      res.json({ message: 'User not found' });
      return;
    }
    res.json(oneUser);
  } catch (error) {
    next(error);
  }
});

router.put('/favorite', async (req, res, next) => {
  const { tupperId } = req.body;
  const { _id } = req.session.currentUser;
  try {
    const userAddFavorite = await User.findByIdAndUpdate(_id, { "$push": {favorites: tupperId}}, {new: true})
    res.status(200);
    res.json({ message: 'User updated', data: { userAddFavorite } });
    req.session.currentUser = userAddFavorite;
  } catch (error) {
    next(error);
  }
});

router.put('/undofavorite', async (req, res, next) => {
  const { tupperId } = req.body;
  const { _id } = req.session.currentUser;
  try {
    const userUndoFavorite = await User.findByIdAndUpdate(_id, { "$pull": {favorites: tupperId} })
    req.session.currentUser = userUndoFavorite;
    res.status(200);
    res.json({ message: 'Tupper and users updated', data: { userUndoFavorite } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
