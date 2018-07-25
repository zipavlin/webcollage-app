const path = require('path');
const { Router, json } = require('express');
const Joi = require('joi');
const axios = require('axios');
const mongo = require('express-mongo-db');
const { ObjectId } = require('mongodb');
const normalize = require('./normalizeWorkItems');
const thumbnail = require('./makeThumbnail');
const secrets = require('./secrets');

const router = Router();

const payloadSchema = Joi.object().keys({
  title: Joi.string().allow(null),
  author: Joi.string().allow(null),
  items: Joi.array().min(1).required().items(
    Joi.object().keys({
      width: Joi.number().required(),
      height: Joi.number().required(),
      x: Joi.number().required(),
      y: Joi.number().required(),
      clip: Joi.array().required().allow([]).items(
        Joi.array().items(
          Joi.number().required(),
          Joi.number().required()
        )
      ),
      angle: Joi.number().required(),
      childWidth: Joi.number().required(),
      childHeight: Joi.number().required(),
      childX: Joi.number().required(),
      childY: Joi.number().required(),
      url: Joi.string().required(),
      state: Joi.string().allow(null)
    })
  )
});

router.use(mongo(`mongodb://${secrets.mongo.user}:${secrets.mongo.pass}@${secrets.mongo.name}`));
router.use(json());

// root api route -> nothing is there
router.get('/api', (req, res) => {
  res.status(404).json({
    code: 404,
    status: 'error',
    error: 'This route does not do anything. Use GET api/list to get a paginated list of collages (id, thumbnail), GET api/get{id} to get collage data or POST api/save.',
    payload: null
  });
});
// check if url can be embedded in iframe
router.get('/api/url/:url?', async (req, res) => {
  if (!req.params.url) {
    res.status(404).json({
      code: 404,
      status: 'error',
      error: 'Url parameter missing. Use api/url/:url',
      payload: null
    });
  }
  else {
    const url = decodeURIComponent(req.params.url);
    const response = await axios.head(url);
    if (response.headers.headers['x-frame-options'] || response.headers.headers['X-Frame-Options']) {
      res.status(403).json({
        code: 403,
        status: 'forbidden',
        error: null,
        payload: null
      });
    }
    else {
      res.status(200).json({
        code: 200,
        status: 'success',
        error: null,
        payload: null
      });
    }
  }
});
// get paginated works
router.get('/api/works/:page?', async (req, res) => {
  const page = req.params.page || 0;
  const amount = 12;
  try {
    const count = await req.db.collection('posts').count({});
    const posts = await req.db.collection('posts').find({}, {
      sort: {created_at: -1},
      skip: page * amount,
      limit: amount,
      fields: {_id: 1, thumbnail: 1, author: 1, title: 1} // this should be renamed to 'projection' in newer version
    }).toArray();
    res.json({
      code: 200,
      status: 'success',
      error: null,
      payload: {
        count,
        hasPrev: page >= 2,
        hasNext: count - ((page + 1) * amount) > 0,
        posts
      }
    });
  }
  catch (err) {
    res.json({
      code: 500,
      status: 'error',
      error: err,
      payload: null
    });
  }
});
// get work details
router.get('/api/work/:id?', async (req, res) => {
  if (!req.params.id) {
    res.status(404).json({
      code: 404,
      status: 'error',
      error: 'Id parameter missing. Use api/work/:id',
      payload: null
    });
  }
  else {
    try {
      const payload = await req.db.collection('posts').findOne({_id: new ObjectId(req.params.id)});
      res.status(200).json({
        code: 200,
        status: 'success',
        error: null,
        payload
      });
    }
    catch (err) {
      res.status(500).json({
        code: 500,
        status: 'error',
        error: err,
        payload: null
      });
    }
  }
});
// save work
router.post('/api/work', async (req, res) => {
  const payload = req.body;
  const { err } = Joi.validate(payload, payloadSchema);
  // validate payload
  if (err) {
    res.status(403).json({
      code: 403,
      status: 'error',
      error: err,
      payload: null
    });
  }
  else {
    const minSize = normalize.minSize(payload.items);
    payload.title = payload.title ? payload.title : 'Untitled';
    payload.author = payload.author ? payload.author : 'Anonymous';
    // add created at to payload
    payload.created_at = new Date();
    // clip all items to min width & height and remove state
    payload.items = normalize.normalizeItems(payload.items, minSize).map(item => {
      delete item.state;
      return item;
    });
    // add thumbnail
    try {
      // prepare thumbnail filename
      const thumbnailFilename = `${payload.title}-${new Date().getTime()}.png`;
      payload.thumbnail = thumbnailFilename;
      // make thumbnail
      thumbnail(thumbnailFilename, payload.items, minSize.width, minSize.height);
    } catch (err) {
      console.log(err);
    }
    // save result
    try {
      const cursor = await req.db.collection('posts').insertOne(payload);
      if (cursor) {
        res.status(200).json({
          code: 200,
          status: 'success',
          error: null,
          payload: null
        });
      } else {
        res.status(400).json({
          code: 400,
          status: 'error',
          error: 'Cannot insert to database',
          payload: null
        });
      }
    }
    catch (err) {
      res.status(500).json({
        code: 500,
        status: 'error',
        error: err,
        payload: null
      });
    }
  }
});

module.exports = router;
