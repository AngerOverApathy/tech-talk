const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models') //models
const withAuth = require('../utils/auth') //authentication middleware

