const router = require('express').Router();
const { PostPet } = require('../../models');
const withAuth = require('../../utils/auth');
const { User } = require('../../models');

router.get('/', withAuth, async (req, res) => {
  try {
    const postpetData = await PostPet.findAll();

    const postpets = postpetData.map((postpet) => postpet.get({ plain: true }));
    res.render('postpet', { postpets });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body, req.files);
    //if image present ,save it with valid post id and return the image id
    const { title, description } = req.body;
    const image = req.files.find((field) => field.fieldname === 'image');

    console.log('%c %O', 'background:orange,color:white', {
      title,
      description,
      image,
    });

    const newPostPet = await PostPet.create({
      // ...req.body,
      title,
      description,
      image: '/uploads/' + image.filename,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPostPet);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postpetData = await PostPet.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postpetData) {
      res.status(404).json({ message: 'No postpet found with this id!' });
      return;
    }

    res.status(200).json(postpetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postpetData = await PostPet.findByPk(req.params.id);

    if (!postpetData) {
      res.status(404).json({ message: 'No postpet found with this id!' });
      return;
    }

    const postpet = postpetData.get({ plain: true });

    res.render('edit-postpet', {
      ...postpet,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const postpetData = await PostPet.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!postpetData) {
      res.status(404).json({ message: 'No postpet found with this id!' });
      return;
    }

    res.status(200).json(postpetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  postpet
    .create({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
    })
    .then((postpet) => res.json(postpet))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/', (req, res) => {
  postpet
    .findAll()
    .then((postpet) => res.json(postpet))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

function upload_Files(req, res) {
  console.log(req.body);
  console.log(req.files);
  res.json({ message: 'Successfully uploaded files' });
}

router.post('/upload', upload_Files);

module.exports = router;
