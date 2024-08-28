const Video = require('../models/Video');
const multer = require('multer');

const upload = multer({ dest: 'uploads/videos/' }); 

const uploadVideo = async (req, res) => {
  try {
    const { title,description, sequence } = req.body;
    const video = new Video({
      title,
      description,
      videoUrl: `/uploads/videos/${req.file.filename}`, 
      sequence
    });

    await video.save();
    return res.status(201).json({ message: 'Video uploaded successfully!', video });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to upload video.', error: error.message });
  }
};

module.exports = { uploadVideo };
