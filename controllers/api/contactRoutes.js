const express = require('express');
const router = express.Router();
const { Contact } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const contactData = await Contact.findAll();
        res.status(200).json(contactData);
    } catch (err) {
        res.status(500).json(err);
    }
    });

router.get('/:id', async (req, res) => {
    try {
        const contactData = await Contact.findByPk(req.params.id);
        res.status(200).json(contactData);
    } catch (err) {
        res.status(500).json(err);
    }
    });

router.post('/', async (req, res) => {
    try {
        const contactData = await Contact.create(req.body);
        res.status(200).json(contactData);
    } catch (err) {
        res.status(400).json(err);
    }
    });

router.put('/:id', async (req, res) => {
    try {
        const contactData = await Contact.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(contactData);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

router.delete('/:id', async (req, res) => {
    try {
        const contactData = await Contact.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(contactData);
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

module.exports = router;
