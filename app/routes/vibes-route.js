'use strict';

const config = require('./../../config');
const router = require('express').Router();
const fs = require('fs');
const resUtil = require('./../utils/res-util');

const Vibe = require('./../models/vibe');
const Project = require('./../models/project');

const VisionApi = require('./../utils/vision_api');
const Vision = new VisionApi;

router.route('/')

  .post((req, res) => {
    const vibe = new Vibe;

    const date = new Date();
    const time = date.getTime();
    const image = '/uploads/' + time + '.jpg';

    const repo = req.body.repo_url;

    fs.readFile(req.body.image.path, function (err, data) {
      fs.writeFile(config.root_path + image, data, function (err) {});
    });

    vibe.image = config.host + ':' + config.port + image;

    vibe.emotions = Vision.call().emotions;

    vibe.save(function(error) {
      if (error) throw err;
      const repo_url = repo;

      Project
      .findOne({ url: repo_url })
      .exec(function (error, project) {
        if(!project) project = new Project;

        project.name = repo_url;
        project.url = repo_url;
        project.vibes.push(vibe._id);

        project.save(function(error) {
          if (error) throw error;
          resUtil.success(res);
        });
      });
    });
  })

  .get((req, res) => {
    Project
    .find()
    .populate('vibes')
    .exec((err, projects) => {
      projects.map(function(project, index) {
        var smile = 0;
        var surprise = 0;
        var negative = 0;
        var attention = 0;
        var amount_of_vibes = project.vibes.length;
        project.emotions = {};

        project.vibes.forEach(function(value, index) {
          smile += parseFloat(value.emotions.smile);
          surprise += parseFloat(value.emotions.surprise);
          negative += parseFloat(value.emotions.negative);
          attention += parseFloat(value.emotions.attention);
        });

        project.emotions.smile = parseFloat(smile) / amount_of_vibes;
        project.emotions.surprise = parseFloat(surprise) / amount_of_vibes;
        project.emotions.negative = parseFloat(negative) / amount_of_vibes;
        project.emotions.attention = parseFloat(attention) / amount_of_vibes;

        return project;
      });

      return resUtil.success(res, projects);
    });
  });

module.exports = router;
