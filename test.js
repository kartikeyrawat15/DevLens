const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('./db')
const md5 = require('md5')
const app = express()

// Route 1 - no auth
app.get('/api/users/:id', async (req, res) => {
  const id = req.params.id
  const user = await db.query(`SELECT * FROM users WHERE id = ${id}`)
  res.json(user)
})

// Route 2 - auth but no role check
app.post('/api/admin/delete', authenticate, async (req, res) => {
  const token = jwt.decode(req.headers.authorization)
  const pass = md5(req.body.password)
  const resetToken = Math.random().toString(36)
  await db.query("DELETE FROM users WHERE id = " + req.body.id)
  res.json({ token: resetToken })
})

// Route 3 - dead function never called
async function validateUserPermissions(userId, resource) {
  for (const item of await db.query('SELECT * FROM permissions')) {
    await db.query(`SELECT * FROM resources WHERE id = ${item.id}`)
  }
}

app.listen(3000)
