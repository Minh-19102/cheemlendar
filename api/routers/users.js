const express = require("express")
const router = express.Router()

module.exports = (pool) => {
  // GET /api/users
  router.get("/", (req, res) => {
    pool.query("SELECT * FROM User", (error, results) => {
      if (error) {
        console.error("Error retrieving users:", error)
        res.status(500).json({ error: "Internal server error" })
        return
      }
      res.json(results)
    })
  })

  // POST /api/users
  router.post("/", (req, res) => {
    const { username, email, name, password } = req.body
    const query = "INSERT INTO User (username, email, name, password) VALUES (?, ?, ?, ?)"
    const values = [username, email, name, password]
    pool.query(query, values, (error, result) => {
      if (error) {
        console.error("Error creating user:", error)
        res.status(500).json({ error: "Internal server error" })
        return
      }
      res.status(201).json({ message: "User created successfully" })
    })
  })

  return router
}
