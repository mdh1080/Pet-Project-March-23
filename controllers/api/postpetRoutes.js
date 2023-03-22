const router = require('express').Router();
const { PostPet } = require('../../models');
const withAuth = require('../../utils/auth');

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
    const newPostPet = await PostPet.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPostPet);
  } catch (err) {
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

// const router = require('express').Router();
// const Sequelize = require('sequelize');
// const postpet = require("../../models/PostPet");
// const Comment = require("../../models/Comment");


// router.get("/", (req, res) => {
//     postpet.findAll({
//         attributes: [
//             "title",
//             "description",
//             "date_created",
//             "image",
//             "user_id",
//         ],
//         include: [
//             {model: Comment, attributes: ["user_comment", "user_id"]},
//         ],
//     })
    
//     .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// router.post("/", (req, res) => {
//     postpet.create({
//         name: req.body.name,
//         description: req.body.description,
//         image: req.body.image,
//     })
//     .then((postpet) => res.json(postpet))
//     .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// router.post("/comment", (req, res) => {
//     Comment.create({
//         comment_text: req.body.comment_text, 
//         name: req.body.name,
//     })
//         .then((comment) => res.json(comment))
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });




// app.post("/upload_files", upload.array("files"), uploadFiles);

// function uploadFiles(req, res) {
//     console.log(req.body);
//     console.log(req.files);
//     res.json({ message: "Successfully uploaded files" });
// }

module.exports = router;