const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')

//homepage route render
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
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

//render single post
router.get('/post/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id //specificy post id parameter
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
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
    .then(dbPostData => {
        if (!dbPostData) { //if no post with id found, throw err
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = dbPostData.get({ plain: true }); //serialize data
  
        // pass post and session to template
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
          });
      })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;