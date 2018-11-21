var express = require("express");

var router = express.Router();

// Requiring our models
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/index", function(req, res) {
 
  // db.burgers.findAll({}).then(function(dbBurgers) {
  //   // We have access to the todos as an argument inside of the callback function
  //   console.log(dbBurgers);
  //   var hbsObject = {
  //     burgers: dbBurgers
  //   };
  //   res.render("index", hbsObject);
  // });

  db.burgers.findAll({
    include: [{ model: db.Customer}] 
  
  }).then(function(dbBurgers) {
    console.log(dbBurgers);
    var hbsObject = {
      burgers: dbBurgers
    };
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  console.log ()
  db.burgers.create({
    name: req.body.name
  }).then(function(result) {
    // We have access to the new todo as an argument inside of the callback function
    console.log(result);
    res.json({ id: result.insertId });
  })
    .catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
});

router.post("/api/customer", function(req, res) {
  console.log ()
  db.Customer.create({
    name: req.body.name,
  }).then(function(result) {
    // We have access to the new todo as an argument inside of the callback function
    console.log("customer created"+result.id);
    res.json({ id: result.id });
  })
    .catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
});

router.put("/api/burgers/:id", function(req, res) {
  
  console.log("in update");

  console.log(req.body);

  db.burgers.update({
    devoured: true,
    CustomerId: req.body.CustomerId
  }, {
    where: {
      id: req.params.id
     
    }
  }).then( function(result) {
    // We have access to the new todo as an argument inside of the callback function
    console.log(result);
    if (result <= 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  })
});




// Export routes for server.js to use.
module.exports = router;
