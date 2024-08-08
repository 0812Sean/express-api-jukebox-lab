const express = require('express');
const Track = require('../models/track.js');
const router = express.Router();

// Create a track
router.post('/', async (req, res) => {
  try {
    const { title, artist } = req.body;
    const baseCoverArtUrl = 'https://www.google.com/search?tbm=isch&q=';
    const baseSoundClipUrl = 'https://www.youtube.com/results?search_query=';
    const searchParamTitle =
      title.split(' ').join('+') + '+' + artist.split(' ').join('+');

    // dynamically add cover art url
    const coverArtUrl = baseCoverArtUrl + searchParamTitle;

    // dyanmically add sound clip url
    const soundClipUrl = baseSoundClipUrl + searchParamTitle;

    const track = new Track({ title, artist, coverArtUrl, soundClipUrl });
    await track.save();
    res.status(201).json(track);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a single track
router.get('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) return res.status(404).json({ error: 'Track not found' });
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a track
router.put('/:id', async (req, res) => {
  try {
    const { title, artist } = req.body;
    const baseCoverArtUrl = 'https://www.google.com/search?tbm=isch&q=';
    const baseSoundClipUrl = 'https://www.youtube.com/results?search_query=';
    const songSearchParam =
      title.split(' ').join('+') + "+" + artist.split(' ').join('+');

    // dynamically add cover art url
    const coverArtUrl = baseCoverArtUrl + songSearchParam;

    // dyanmically add sound clip url
    const soundClipUrl = baseSoundClipUrl + songSearchParam;

    const track = await Track.findByIdAndUpdate(
      req.params.id,
      { $set: { title, artist, coverArtUrl, soundClipUrl } },
      {
        new: true,
      }
    );
    if (!track) return res.status(404).json({ error: 'Track not found' });
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a track
router.delete('/:id', async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);
    if (!track) return res.status(404).json({ error: 'Track not found' });
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
