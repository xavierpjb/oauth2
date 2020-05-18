
/*  EXPRESS SETUP  */

const express = require('express');
const app = express();
/* App */
app.use(express.static(__dirname));

const bodyParser = require('body-parser');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

/*  PASSPORT SETUP  */

const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
app.use(passport.initialize());
app.use(passport.session());


/* MONGOOSE SETUP */

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/MyDatabase', {useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  password: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');


/* PASSPORT LOCAL AUTHENTICATION */

passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

/* REGISTER SOME USERS */

// UserDetails.register({username:'paul', active: false}, 'paul');
// UserDetails.register({username:'jay', active: false}, 'jay');
// UserDetails.register({username:'roy', active: false}, 'roy');


/* ROUTES */


app.post('/login', (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {      
      return res.redirect('/login?info=' + info.message);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      console.log('success auth');
      return res.redirect('/');
    });

  })(req, res, next);
});
// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

app.get('/login',
  (req, res) => res.sendFile('html/login.html',
  { root: __dirname })
);

app.get('/',
  ensureAuthenticated,
  (req, res) => res.sendFile('html/private.html', {root: __dirname})
);

app.get('/private',
  ensureAuthenticated,
  (req, res) => res.sendFile('html/private.html', {root: __dirname})
);

app.get('/user',
  connectEnsureLogin.ensureLoggedIn('/login'),
  (req, res) => res.send({user: req.user})
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else{
    console.log('not auth');
    // Return error content: res.jsonp(...) or redirect: res.redirect('/login')
    res.sendFile('html/login.html',
    { root: __dirname })

  }
}

app.get('/account', ensureAuthenticated, function(req, res) {
  // Do something with user via req.user
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));