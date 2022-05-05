const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models') //models
const withAuth = require('../utils/auth') //authentication middleware

//render dash page
router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id //using id from session
      },
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true })) // serialize data then pass to template
        res.render('dashboard', { posts, loggedIn: true }) //render dash for logged in user
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  })

//route - edit post page for user
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' })
          return;
        }
        const post = dbPostData.get({ plain: true }) //serialize data
        res.render('edit-post', { post, loggedIn: true }); //render edit post
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  })

  module.exports = router;
