const express = require('express')
// Single routing
const router = express.Router()
const { login, dashboard } = require('../controllers/main')

const authMiddleware = require('../middleware/auth')

router.post('/login', login)
router.get('/dashboard', authMiddleware, dashboard)

// router.get('/:id', getTask).patch('/:id', updateTask).delete('/:id', deleteTask)

module.exports = router
