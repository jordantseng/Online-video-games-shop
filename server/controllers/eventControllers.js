import asyncHandler from 'express-async-handler';
import sharp from 'sharp';
import Event from '../models/event.js';

// @desc get all events
// @route GET /api/events
// @access PRIVATE (ADMIN ONLY)
export const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).select('-image');

  res.send(events);
});

// @desc get event
// @route GET /api/events/:id
// @access PRIVATE (ADMIN ONLY)
export const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).select('-image');

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
// @route PATCH /api/events/:id
// @access PRIVATE (ADMIN ONLY)
export const editEvent = asyncHandler(async (req, res) => {
  const { redirectUrl } = req.body;

  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  event.redirectUrl = redirectUrl;

  if (req.file && req.file.buffer) {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 1200, height: 560 })
      .png()
      .toBuffer();

    event.image = buffer;
  }

  await event.save();

  res.send({ redirectUrl: event.redirectUrl });
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
    res.set('Content-Type', 'image/png');
    res.send(event.image);
  }
});
