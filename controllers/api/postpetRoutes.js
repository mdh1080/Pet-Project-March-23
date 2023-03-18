const router = require('express').Router();
const Sequelize = require('sequelize');
const postpet = require("../../models/PostPet");
const Comment = require("../../models/Comment");


router.get("/", (req, res) => {
    postpet.findAll({
        attributes: [
            "title",
            "description",
            "date_created",
            "image",
            "user_id",
        ],
        include: [
            {model: Comment, attributes: ["user_comment", "user_id"]},
        ],
    })
    
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
    postpet.create({
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

router.post("/comment", (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text, 
        name: req.body.name,
    })
        .then((comment) => res.json(comment))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});




// app.post("/upload_files", upload.array("files"), uploadFiles);

// function uploadFiles(req, res) {
//     console.log(req.body);
//     console.log(req.files);
//     res.json({ message: "Successfully uploaded files" });
// }

module.exports = router;