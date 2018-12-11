// Express modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');

// Template modules
const mustache = require('mustache');
const fs = require('fs');

// Database modules
const db = require('./user');
const sequelize = db.sequelize;
const User = db.User;
const Hostel = db.Hostel;
const Mess = db.Mess;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));

app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: "user_sid",
  secret: "blahblah",
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 1000 * 60 * 60 * 2
  }
}));

app.use( (req, res, next) => {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.cookie('user_sid', "", { expires: new Date()});      
  }
  next();
});


// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (req.session.user) {
      res.redirect('/dashboard');
  } else {
      next();
  }    
};

app.use(express.static('public'));

app.get('/', sessionChecker, (req, res) => {
  res.redirect('/login');
});

// Route for new user signup
app.route('/signup')
    .get(sessionChecker, (req, res) => {
      let datasend = {errorMessage: ""};
      let page = fs.readFileSync("public/signup.html","utf8");
      let html = mustache.to_html(page, datasend);
      res.send(html);
    })
    .post((req, res) => {
      User.create({
        username: req.body.user,
        email: req.body.email,
        password: req.body.pass
      })
      .then(user => {
          req.session.user = user.username;
          res.redirect('/dashboard');
      })
      .catch(err => {
        let datasend = {errorMessage: "Username Or E-mail already exists. Try Again."};
        let page = fs.readFileSync("public/signup.html","utf8");
        let html = mustache.to_html(page, datasend);
        res.send(html);
      });
    });

// route for user Login
app.route('/login')
  .get(sessionChecker, (req, res) => {
    let datasend = {errorMessage: ""};
    let page = fs.readFileSync("public/login.html","utf8");
    let html = mustache.to_html(page, datasend);
    res.send(html);
  })
  .post((req, res) => {
    let username = req.body.user, password = req.body.pass;
    User.findOne({ where: { username: username } }).then(function (user) {
      if (!user) {
          let datasend = {errorMessage: "Username and password do not match"};
          let page = fs.readFileSync("public/login.html","utf8");
          let html = mustache.to_html(page, datasend);
          res.send(html);
      }else if (!user.validPassword(password)) {
          let datasend = {errorMessage: "Username and password do not match"};
          let page = fs.readFileSync("public/login.html","utf8");
          let html = mustache.to_html(page, datasend);
          res.send(html);
      } else {
          req.session.user = user.username;
          res.redirect('/dashboard');
      }
    });
  });

// route for user logout
app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    req.session.destroy();
    res.cookie('user_sid', "", { expires: new Date()});
    res.redirect('/');
  } else {
      res.redirect('/login');
  }
});
    

// Route for user's dashboard
app.get('/dashboard', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    let datasend = {username: req.session.user + "!"};
    let page = fs.readFileSync("public/dashboard.html", "utf8");
    let html = mustache.to_html(page,datasend);
    res.send(html);
  } else {
    res.redirect('/login');
  }
});

// Routes for AJAX Request For Graph Data
app.get('/graphData', (req,res) => {
  let jsonData = [];
  let ctr = 0;
  Hostel.findAll({
      attributes:[
        'hostel_name', 
        [sequelize.fn('AVG', sequelize.col('distance')), 'distanceAvg'],
        [sequelize.fn('AVG', sequelize.col('infra')), 'infraAvg'],
        [sequelize.fn('AVG', sequelize.col('clean')), 'cleanAvg'],
        [sequelize.fn('AVG', sequelize.col('staff')), 'staffAvg'],
        [sequelize.fn('AVG', sequelize.col('room')), 'roomAvg'],
        [sequelize.fn('AVG', sequelize.col('lift')), 'liftAvg'],
        [sequelize.fn('AVG', sequelize.col('exp')), 'expAvg']] ,
      group: 'hostel_name',
      raw: true
   })
  .then( (obj) => {
    for (let i = 0; i < obj.length; i++) {
      let data = { name: "", distance: "", infra: "", clean: "", staff: "", room: "", lift: "", exp: ""};
      if (obj[i].hostel_name === "Ba") {
        data.name = "B Annex";
      } else if (obj[i].hostel_name === "Da") {
        data.name = "D Annex";
      } else {
        data.name = obj[i].hostel_name;
      }
      data.distance = obj[i].distanceAvg;
      data.infra = obj[i].infraAvg;
      data.clean = obj[i].cleanAvg;
      data.staff = obj[i].staffAvg;
      data.room = obj[i].roomAvg;
      data.lift = obj[i].liftAvg;
      data.exp = obj[i].expAvg;
      jsonData[ctr++] = data;
    }
    let json = JSON.stringify(jsonData); 
    res.send(json);
  })
  .catch( (error) => {
    console.log(error.message);
    next();
  });
});

app.get('/graphMessData', (req,res) => {
  let jsonData = [];
  let ctr = 0;
  Mess.findAll({
      attributes:[
        'mess_name', 
        [sequelize.fn('AVG', sequelize.col('quality')), 'qualityAvg'],
        [sequelize.fn('AVG', sequelize.col('variety')), 'varietyAvg'],
        [sequelize.fn('AVG', sequelize.col('utensils')), 'utensilsAvg'],
        [sequelize.fn('AVG', sequelize.col('staff')), 'staffAvg'],
        [sequelize.fn('AVG', sequelize.col('exp')), 'expAvg']] ,
      group: 'mess_name',
      raw: true
   })
  .then( (obj) => {
    for (let i = 0; i < obj.length; i++) {
      let data = { name: "", quality: "", variety: "", utensils: "", staff: "", exp: ""};
      data.name = obj[i].mess_name;
      data.quality = obj[i].qualityAvg;
      data.variety = obj[i].varietyAvg;
      data.utensils = obj[i].utensilsAvg;
      data.staff = obj[i].staffAvg;
      data.exp = obj[i].expAvg;
      jsonData[ctr++] = data;
    }
    let json = JSON.stringify(jsonData); 
    res.send(json);
  })
  .catch( (error) => {
    console.log(error.message);
    next();
  });
});

// Route for hostel form
app.route('/hostel')
  .get( (req,res) => {
    if (req.session.user && req.cookies.user_sid) {
      let message = "";
      let dataSend = { username: req.session.user + "!", Response : message, class : "hide-message"};
      let page = fs.readFileSync("public/hostel.html","utf8");
      let html = mustache.to_html(page, dataSend);
      res.send(html);
    } else {
      res.redirect('/login');
    }
  })
  .post( (req,res) => {
    console.log("----POST MESSAGE RECIEVED----");
    console.log(req.body);
    Hostel.create({
      username: req.session.user,
      hostel_name: req.body.hostel,
      distance: req.body.distance,
      infra: req.body.infrastructure,
      clean: req.body.cleanliness,
      staff: req.body.staff,
      room: req.body.room,
      lift: req.body.lift,
      exp: req.body.experience,
      remarks: req.body.remarks
    })
    .then (hostel => {
      let message = "Your response has been submitted successfully!";
      let dataSend = { username: req.session.user + "!", Response : message, class : ""};
      let page = fs.readFileSync("public/hostel.html","utf8");
      let html = mustache.to_html(page, dataSend);
      res.send(html);
    })
    .catch(error => {
      let message = "There was an error while submitting your response. Please try again.";
      let dataSend = {username: req.session.user + "!", Response : message, class : ""};
      let page = fs.readFileSync("public/hostel.html","utf8");
      let html = mustache.to_html(page, dataSend);
      res.send(html);
    });
  });

// Route for mess page
app.get('/mess', (req,res) => {
  if (req.session.user && req.cookies.user_sid) {
    let dataSend = {username: req.session.user + "!"}
    let page = fs.readFileSync("public/mess.html", "utf8");
    let html = mustache.to_html(page,dataSend);
    res.send(html);
  } else {
    res.redirect('/login');
  }
});

// Route for displaying menu
app.get('/menu', (req,res) => {
  if (req.session.user && req.cookies.user_sid) {
    let dataSend = {username: req.session.user + "!"}
    let page = fs.readFileSync("public/menu.html", "utf8");
    let html = mustache.to_html(page,dataSend);
    res.send(html);
  } else {
    res.redirect('/login');
  }
});

// Route for mess form
app.route('/messform')
  .get( (req,res) => {
    if (req.session.user && req.cookies.user_sid) {
      let message = "";
      let dataSend = { username: req.session.user + "!", Response : message, class : "hide-message"};
      let page = fs.readFileSync("public/messform.html", "utf8");
      let html = mustache.to_html(page,dataSend);
      res.send(html);
    } else {
      res.redirect('/login');
    }
  })
  .post( (req,res) => {
    console.log("----POST MESSAGE RECIEVED----");
    console.log(req.body);
    Mess.create({
      username: req.session.user,
      mess_name: req.body.mess,
      quality: req.body.quality,
      utensils: req.body.utensils,
      variety: req.body.variety,
      staff: req.body.staff,
      exp: req.body.experience,
      remarks: req.body.remarks
    })
    .then (mess => {
      let message = "Your response has been submitted successfully!";
      let dataSend = { username: req.session.user + "!", Response : message, class : ""};
      let page = fs.readFileSync("public/messform.html","utf8");
      let html = mustache.to_html(page, dataSend);
      res.send(html);
    })
    .catch(error => {
      let message = "There was an error while submitting your response. Please try again.";
      let dataSend = {username: req.session.user + "!", Response : message, class : ""};
      let page = fs.readFileSync("public/messform.html","utf8");
      let html = mustache.to_html(page, dataSend);
      res.send(html);
    });
  });

// catch 404 and forward to error handler
app.use( (req, res, next) =>{
  res.status(404).send("Sorry can't find that!")
});


// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Start server on given PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
