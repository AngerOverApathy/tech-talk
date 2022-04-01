const router = require('express').Router()
const withAuth = require('../../utils/auth')
const { Comment } = require('../../models') //comment model

// post a new comment
router.post('/', withAuth, (req, res) => {
    if (req.session) {
      Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err)
          res.status(400).json(err)
        })
    }
})

// get comments
router.get('/', (req, res) => {
    Comment.findAll()
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
})

module.exports = router;