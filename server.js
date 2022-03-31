//dependencies
const express = require('express')
const path = require('path')
const routes = require('./controllers') //routes in controller folder
const sequelize = require('/config/connection') //connect to database

//configure info
require('dotenv').config()

const exphbs = require('express-handlebars') //front end handlebars
const hbs = exphbs.create({ helpers }) //handlebars init for html
const helpers = require('./utils/helpers') //hbs helpers

const session = require('express-session') //for cookies

const SequelizeStore = require('connect-session-sequelize')(session.Store) //save user session

const app = express()
const PORT = process.env.PORT || 3005;

//session init
const sess = {
    secret: 'UCD Bootcamp',
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
    resave: false,
    rolling: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

//parse and string data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session(sess)) //use express for session handling

app.use(express.static(path.join(__dirname, 'public'))) //server path for static files

//set handlebars as server engine
app.engine('handlebars', hbs.engine)
app.set('view engine', handlebars)

app.use(routes) //server to routes path

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
  });


