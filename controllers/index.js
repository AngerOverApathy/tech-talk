const router = require('express').Router

const apiRoutes = require('./api') //pull routes from api
const homeRoutes = require('./home-routes.js') //route for homepage
const dashboardRoutes = ('./dashboard-routes.js') //dashboard routes

//server paths for api, home, and dash
router.use('/api', apiRoutes) 
router.use('/', homeRoutes)
router.use('/dashboard', dashboardRoutes)

router.use((req, res) => {
  res.status(404).end()
});

module.exports = router;