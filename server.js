const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const multer = require("multer");

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3002;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
  },
  
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
});

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


// const path = require('path');
// const sequelize = require('./config/connection');
// const { User, PostPet, Comment } = require('./models');
// const routes = require('./controllers');
// const multer = require("multer");
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const express = require('express');

// const app = express();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads")
//     },
//     filename: (req, file, cb) => {
//         console.log(file)
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({storage: storage})

// // app.get('/', function(req, res) {
// //     res.sendFile(__dirname + '/views/homepage.handlebars'); 
// // });

// app.get("/upload", (req, res) => {
//     res.render("cats.handlebars" + "animals.handlebars");
// });

// app.post("/upload", upload.single("image"), (req, res) => {
//     res.send("Image Uploaded")
// });

// const sess = {
//     secret: 'Petprojectrocks',
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//       db: sequelize,
//     }),
//   };
  
//   app.use(session(sess));


// const exphbs = require('express-handlebars');

// app.use(express.static(__dirname + "/public"));


// app.set('view engine', 'handlebars');

// app.engine('handlebars' , exphbs.engine({
//     defaultLayout: 'index',
//     layoutsDir: __dirname + '/views/layouts',
    
// }));


// app.get('/', (req, res) => {
//     res.render('homepage');
// });

// app.get('/login', (req, res) => {
//     res.render('login');
// });

// app.get('/animals', (req, res) => {
//     res.render('animals');
// });

// app.get('/cats', (req, res) => {
//     res.render('cats');
// });

// app.get('/homepage', (req, res) => {
//     res.render('homepage');
// });


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '/public')));

// const port = process.env.PORT || 3002;
// app.use(routes);


// sequelize.sync({force:true}).then(() => {
//     app.listen(port)
//     console.log(`App listening on port ${port}!`)
// });



