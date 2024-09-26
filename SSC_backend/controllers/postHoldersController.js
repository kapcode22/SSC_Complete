const { getPostHolderModel } = require('../models/dynamicModel');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, 'SSC_123', (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
};

const addPostHolder = async (req, res) => {
    const { club } = req.params;
    const { name, post, instaLink, facebookLink, linkdinLink } = req.body;
    const image = req.file ? req.file.path : '';

    try {
        const PostHolder = getPostHolderModel(club);

        const newPostHolder = new PostHolder({
            name,
            post,
            instaLink,
            facebookLink,
            linkdinLink,
            image
        });

        await newPostHolder.save();
        res.status(201).send(newPostHolder);
    } catch (err) {
        console.error('Error saving post holder:', err);  // Log the error
        res.status(500).send({ message: 'Error saving post holder', error: err.message });
    }
};

const getPostHoldersByClub = async (req, res) => {
    const { club } = req.params;
    
    try {
        const PostHolder = getPostHolderModel(club);
        const postHolders = await PostHolder.find();
        res.status(200).send(postHolders);
    } catch (err) {
        console.error('Error fetching post holders:', err);
        res.status(500).send({ message: 'Error fetching post holders', error: err.message });
    }
};

module.exports = {
    addPostHolder,
    verifyToken,
    getPostHoldersByClub,
};
