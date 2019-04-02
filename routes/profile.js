const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Tupper = require('../models/Tupper')

const { isLoggedIn } = require('../helpers/middlewares');

router.get('/users', isLoggedIn(), async (req, res, next) => {
  try {
    const allUsers = await User.find().populate('favorites');
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', isLoggedIn(), async (req, res, next) => {
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

router.put('/edit', isLoggedIn(), async (req, res, next) => {
  const { username, imageUrl, email } = req.body;
  const { _id } = req.session.currentUser;
  try {
    const editedUser = await User.findByIdAndUpdate(_id, { "$set": {username, imageUrl, email }}, {new: true});
    req.session.currentUser = editedUser;
    res.status(200);
    res.json(editedUser);
  } catch (error) {
    next(error);
  }
});

router.put('/favorite', isLoggedIn(), async (req, res, next) => {
  const { tupperId } = req.body;
  const { _id } = req.session.currentUser;
  try {
    const userAddFavorite = await User.findByIdAndUpdate(_id, { "$push": {favorites: tupperId}}, {new: true})
    req.session.currentUser = userAddFavorite;
    res.status(200);
    res.json({ message: 'User updated', data: { userAddFavorite } });
  } catch (error) {
    next(error);
  }
});

router.put('/undofavorite', isLoggedIn(), async (req, res, next) => {
  const { tupperId } = req.body;
  const { _id } = req.session.currentUser;
  try {
    const userUndoFavorite = await User.findByIdAndUpdate(_id, { "$pull": {favorites: tupperId} }, {new: true})
    req.session.currentUser = userUndoFavorite;
    res.status(200);
    res.json({ message: 'User updated', data: { userUndoFavorite } });
  } catch (error) {
    next(error);
  }
});

router.put('/follow', isLoggedIn(), async (req, res, next) => {
  const { otherUserId } = req.body;
  const { _id } = req.session.currentUser;
  try {
    const userFollow = await User.findByIdAndUpdate(_id, { "$push": {following: otherUserId}}, {new: true})
    const userFollowed = await User.findByIdAndUpdate(otherUserId, { "$push": {followers: _id}}, {new: true})
    req.session.currentUser = userFollow;
    res.status(200);
    res.json({ message: 'User updated', data: { userFollow, userFollowed } });
  } catch (error) {
    next(error);
  }
});

router.put('/unfollow', isLoggedIn(), async (req, res, next) => {
  const { otherUserId } = req.body;
  const { _id } = req.session.currentUser;
  try {
    const userUnfollow = await User.findByIdAndUpdate(_id, { "$pull": {following: otherUserId} }, {new: true})
    const userUnfollowed = await User.findByIdAndUpdate(otherUserId, { "$pull": {followers: _id} }, {new: true})
    req.session.currentUser = userUnfollow;
    res.status(200);
    res.json({ message: 'User updated', data: { userUnfollow, userUnfollowed } });
  } catch (error) {
    next(error);
  }
});

router.put('/rate', isLoggedIn(), async (req, res, next) => {
  const { _id, status, tupperId, rated } = req.body;
  try {
    const userRated = await User.findByIdAndUpdate(_id, { "$set": {status} }, {new: true})
    const tupperStatus = await Tupper.findByIdAndUpdate(tupperId, { "$set": { rated:!rated } }, {new: true})
    res.status(200);
    res.json({ message: 'User updated', data: { userRated, tupperStatus } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
