const path = require('path')
const sqlite3 = require('sqlite3').verbose()

const dbPath = path.join(__dirname, '..', 'data', 'app.db')
const db = new sqlite3.Database(dbPath)

db.serialize(() => {
  db.all('SELECT id, name, email, created_at FROM users ORDER BY id', [], (err, rows) => {
    if (err) {
      console.error('Error reading users:', err)
      process.exit(1)
    }
    if (!rows || rows.length === 0) {
      console.log('No users found.')
    } else {
      console.table(rows)
    }
    db.close()
  })
})
