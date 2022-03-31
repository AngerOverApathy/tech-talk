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

  //render edit post page for user

  //render 