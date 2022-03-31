const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')

//homepage route render
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    const posts = dbPostData.map(post => post.get({ plain: true })); //creates post array
    res.render('homepage', {  //render posts on homepage
        posts,
        loggedIn: req.session.loggedIn
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// sign up page render
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

//login page render
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });


module.exports = router;