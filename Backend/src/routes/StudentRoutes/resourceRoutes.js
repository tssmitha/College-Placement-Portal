const express = require('express');
const router = express.Router();
const Resource = require('../../models/Resources'); // Import your mongoose model

// @desc    Get all uploaded placement resources (with optional category filter)
// @route   GET /api/resources?category=DSA
// @access  Public (or protected if needed)
router.get('/resources', async (req, res) => {
    try {
        const BASE_URL = process.env.BASE_URL || 'http://localhost:5001';
        const { category } = req.query;

        // Construct dynamic query
        let query = {};
        if (category) {
            query = {
                $or: [
                    { subject: { $regex: new RegExp(category, 'i') } }, // match subject
                    { tags: { $in: [category] } } // match tags
                ]
            };
        }

        // Fetch & format
        const resources = await Resource.find(query).sort({ uploadDate: -1 });

        const formattedResources = resources.map(resource => {
            const relativePath = resource.storedPath.split('uploads')[1].replace(/\\/g, '/');
            return {
                ...resource._doc,
                downloadUrl: `${BASE_URL}/uploads${relativePath}`
            };
        });

        res.json({ resources: formattedResources });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch resources", error });
    }
});

module.exports = router;
