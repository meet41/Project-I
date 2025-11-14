const path = require('path')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const sqlite3 = require('sqlite3').verbose()

const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

const dbPath = path.join(dataDir, 'app.db')
const db = new sqlite3.Database(dbPath)

// Initialize DB
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`)
})

const app = express()
app.use(cors())
app.use(express.json())

function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Missing token' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    next()
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

// Routes
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body || {}
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' })
  }
  if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' })

  const password_hash = bcrypt.hashSync(password, 10)

  const stmt = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)')
  stmt.run([name, email.toLowerCase(), password_hash], function (err) {
    if (err) {
      if (err.message && err.message.includes('UNIQUE')) {
        return res.status(409).json({ message: 'Email already registered' })
      }
      console.error(err)
      return res.status(500).json({ message: 'Failed to create user' })
    }
    const user = { id: this.lastID, name, email: email.toLowerCase() }
    const token = signToken(user)
    return res.json({ user, token })
  })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })

  db.get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()], (err, row) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to login' })
    }
    if (!row) return res.status(401).json({ message: 'Invalid email or password' })
    const ok = bcrypt.compareSync(password, row.password_hash)
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' })
    const user = { id: row.id, name: row.name, email: row.email, created_at: row.created_at }
    const token = signToken(user)
    return res.json({ user, token })
  })
})

app.get('/api/auth/me', authMiddleware, (req, res) => {
  db.get('SELECT id, name, email, created_at FROM users WHERE id = ?', [req.user.sub], (err, row) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to fetch user' })
    }
    if (!row) return res.status(404).json({ message: 'User not found' })
    return res.json({ user: row })
  })
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`)
})
