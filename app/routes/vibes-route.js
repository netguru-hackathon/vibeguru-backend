'use strict';

const config = require('./../../config');
const router = require('express').Router();
const fs = require('fs');
const resUtil = require('./../utils/res-util');

const Vibe = require('./../models/vibe');
const Project = require('./../models/project');

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
      return resUtil.success(res, projects);
    });
  });

module.exports = router;
