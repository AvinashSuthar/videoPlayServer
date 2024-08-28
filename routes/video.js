const express = require('express');
const router = express.Router();
const { uploadVideo } = require('../controllers/VideoUpload');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');
const Video = require('../models/Video');
const User = require('../models/User');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/videos/'); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); 
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`; 
    cb(null, uniqueName); 
  }
});


const upload = multer({ storage: storage });

router.post('/upload',  upload.single('video'), uploadVideo);

router.get('/', authMiddleware,  async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ sequence: 1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
});




router.put('/update-progress/:videoId', authMiddleware, async (req, res) => {
  try {
    const { videoId } = req.params;
    const { lastWatchedTime, completed } = req.body;

    const userId = req.user._id; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const videoProgress = user.videoProgress.find(progress => progress.videoId.toString() === videoId);

    if (videoProgress) {
      videoProgress.lastWatchedTime = lastWatchedTime;
      videoProgress.completed = completed;
    } else {
      user.videoProgress.push({ videoId, lastWatchedTime, completed });
    }

    await user.save();

    res.status(200).json({ message: 'Video progress updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating video progress', error: error.message });
  }
});

module.exports = router;


