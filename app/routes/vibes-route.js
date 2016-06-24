'use strict';

const router = require('express').Router();
const resUtil = require('./../utils/res-util');

const Vibe = require('./../models/vibe');

// /api/comments
router.route('/')

  .post((req, res) => {
    const vibe = new Vibe({image: req.body.image});

    vibe.save(function(error) {
      if(error) throw err;

      Project.find({ url: req.body.url}, function (error, project) {
        if(!project) {
          project = new Project();
        }
        project.name = req.body.name;
        project.url = req.body.url;
        project.vibes.push(vibe._id);
        project.save(function(error) {
          if (error) throw error;
        });
      });
    });
  })

  .get((req, res) => {

  });

module.exports = router;
