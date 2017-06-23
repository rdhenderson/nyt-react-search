/* eslint no-underscore-dangle: ["error", { "allow": ["_id" ] }]*/
/* eslint no-console: ["error", { allow: ["error"] }] */
/* eslint no-shadow: ["error", { "allow": ["err"] }]*/

// Import mongoose models
const Article = require('../models/article.js');

module.exports = function routes(app) {

  app.get('/api/saved', (req, res) => {
    console.log("Getting Saved Articles");
    Article.find({}, (error, doc) => {
      // Send any errors to the browser
      if (error) {
        res.send(error);
      } else {
        res.send(doc);
      }
    });
  });

  app.post('/api/saved', (req, res) => {
    console.log("Body", req);
    Article.create(req.body, (err, user) => {
      // my new or existing model is loaded as result
      if (err) console.error('ERROR', err);

      // Send to favorites route to populate favorites for return
      res.redirect('/api/saved');
    });
  });

  app.delete('/api/saved/:id', (req, res) => {
    console.log("Deleting...", req.params.id);
    Article.remove({_id: req.params.id}, (err) => {
      if (err) console.log("ERROR", err);

      // req.method = "GET";
      res.redirect(303, '/api/saved');
    });
  });

};
  // Consider adding findOrCreate instead of straight create to avoid duplicates.
  // app.post('/api/saved', (req, res) => {
  //   const query = { name: req.body.title };
  //   Article.findOrCreate(query, (err, user) => {
  //     // my new or existing model is loaded as result
  //     if (err) console.error('ERROR', err);
  //
  //     // Send to favorites route to populate favorites for return
  //     res.redirect(`/favorites/${user._id}`);
  //   });
  // });
