const express = require('express')
// Single routing
const router = express.Router()
const { login, dashboard } = require('../controllers/main')

router.post('/login', login)
router.get('/dashboard', dashboard)

// router.get('/:id', getTask).patch('/:id', updateTask).delete('/:id', deleteTask)

module.exports = router
