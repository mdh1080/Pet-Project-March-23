// const router = require('express').Router();
// const User = require('../../models/User');

// // Create a user
// router.post('/', async (req, res) => {
//   try {
//     const userData = await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     });
//     // 200 status code means the request was successful  
//     req.session.save(() => {
//       req.session.loggedIn = true;
//       res.status(200).json(userData);
//     });
//     // 400 status code means the server could not understand the request
//     } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     const UserData = await User.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });

//     if (!UserData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password. Please try again!' });
//       return;
//     }

//     const validPassword = await UserData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password. Please try again!' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.loggedIn = true;

//       res
//         .status(200)
//         .json({ user: UserData, message: 'You are now logged in!' });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // Logout
// router.post('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// // GET all users should this be findOne or findAll?
// router.get('/:name', async (req, res) => {
//   try {
//     const userData = await User.findOne({
//         where: {
//         name: req.params.name,
//     },
//  });
//     res.json(userData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // UPDATE a user

// router.put('/:id', async (req, res) => {
//   const userData = await User.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   }).catch((err) => res.json(err));
//   res.json(userData);
// });

// // DELETE a user
// router.delete('/:id', async (req, res) => {
//   const userData = await User.destroy({
//     where: {
//       id: req.params.id,
//     },
//   }).catch((err) => res.json(err));
//   res.json(userData);
// });

// module.exports = router;

const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
