const express = require('express');
const rssController = require('../controllers/rss.controller');

const router = express.Router();

router.get('/', rssController.getAll);
router.get('/refresh', rssController.getAllFromBBDD);
router.get('/detail/:id', rssController.getItemDetail);

module.exports = router;