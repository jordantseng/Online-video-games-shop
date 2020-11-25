import asyncHandler from 'express-async-handler';
import Event from '../models/event.js';

// @desc get all events
// @route GET /api/events
// @access PRIVATE (ADMIN ONLY)
export const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});

  const count = await Event.countDocuments();

  res.send(events);
});

export const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  res.send(event);
});

// @desc create event
// @route POST /api/events
// @access PRIVATE (ADMIN ONLY)
export const createEvent = asyncHandler(async (req, res) => {
  const event = new Event({
    title: 'sample',
    description: 'sample',
    redirectUrl: 'sample',
    image: '',
  });

  await event.save();

  res.send(event);
});

// @desc edit event
// @route PUT /api/events/:id
// @access PRIVATE (ADMIN ONLY)
export const editEvent = asyncHandler(async (req, res) => {
  const { title, description, redirectUrl } = req.body;

  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  event.title = title || event.tile;
  event.description = description;
  event.redirectUrl = redirectUrl;

  if (req.file && req.file.buffer) {
    event.image = req.file.buffer;
  } else {
    event.image = event.image;
  }

  await event.save();

  res.send(event);
});

// @desc delete product
// @route GET /api/events/:id
// @desc Private (ADMIN ONLY)
export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('event not found');
  }

  await event.remove();

  res.send(event);
});

// @desc get product image
// @route GET /api/events/:id/image
// @desc Public
export const getProductImage = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event || !event.image) {
    res.status(404);
    throw new Error('Image not found');
  } else {
    res.set('Content-Type', 'image/jpg');
    res.send(event.image);
  }
});
