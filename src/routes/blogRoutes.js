const express = require('express');
const { getBlog, sendBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const upload = require('../middlewares/multer');

const router = express.Router()

router.post('/sendblog', upload.array('images', 5), sendBlog)
router.get('/getblog', getBlog)
router.delete('/delete/:id', deleteBlog)
router.post('/updateblog/:id', upload.array('images', 5), updateBlog)

module.exports = router;