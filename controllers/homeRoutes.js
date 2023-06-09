const router = require('express').Router();
const { PostPet, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all postpets and JOIN with user data
    const postpetData = await PostPet.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const postpets = postpetData.map((postpet) => postpet.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      postpets, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/postpet/:id', async (req, res) => {
  try {
    const postpetData = await PostPet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const postpet = postpetData.get({ plain: true });
    console.log('hello')
    console.log(postpet)
    res.render('postpet', {
      postpet: postpet,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/postpets', async (req, res) => {
  try {
    const postpetData = await PostPet.findAll({
    });

    const postpets = postpetData.map(postpetData => postpetData.get({plain: true}));

    res.render('postpets', {
      postpets: postpets,
      logged_in: req.session.logged_in

    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: PostPet }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/contact', (req, res) => {


  res.render('contact', {
     postpet: {description: 'A really funny dog'}
  });
});



module.exports = router;
