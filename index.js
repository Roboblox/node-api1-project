// 1- DEPENDENCIES
// import express from 'express' // package.json needs a "type" key with a value of "module"
const express = require('express') // commonjs module system that came with Node
// import { generate } from 'shortid' // ES6 modules
const generate = require('shortid').generate

// 2- INSTANTIATE AND CONFIGURE THE SERVER
const app = express() // here is our app (our server)
app.use(express.json()) // plugging in a piece of middleware

// 3- DECIDE A PORT NUMBER
const PORT = 5000

// 4- FAKE DATA
let users = [
  { id: generate(), name: 'Bicho', bio: 'Maltese' },
]

// [GET] all dogs in the db
app.get('/api/users', (req, res) => {
  res.status(200).json(users)
})
// [GET] user with the id passed as a parameter in the URL
app.get('/api/users/:id', (req, res) => {
 // 1- pull out the id from the reque
  const { id } = req.params
  // 2- find the user in the users arr with the given id
  const user = users.find(user => user.id === id)
  // 3- set status code and send back the user
  try {
  if (!user) {
    res.status(404).json({
      message: `No user with id ${id}`,
    })
  } else {
    res.status(200).json(user)
  }
} catch {
  (error) 
    res.status(500).json({ errorMessage: "The user information could not be retrieved." })
}
})
app.post('/api/users', (req, res) => {
  // 1- pull out the { name, bio } from the body of req
  const { name, bio } = req.body
  try {
    if(!name || !bio) {
      res.status(400).json({
         errorMessage: "Please provide name and bio for the user." 
      })
    } else {
      // 3- make a new resource, complete with unique id
      const newUser = { id: generate(), name, bio }
      // 4- add the new user to our fake db
      users.push(newUser)
      // 5- send back the newly created resource
      res.status(201).json(newUser) // up to you what to send
    }
  } catch {
    (error) 
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
  } 
})
// [DELETE] remove dog with given id in the params
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  try {
    if (!users.find(user => user.id === id)) {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
      users = users.filter(user => user.id !== id)
      res.status(200).json({ message: `User with id ${id} got deleted!`})
    }
  } catch {
    res.status(500).json({ errorMessage: "The user could not be removed" })
  }
})
// 6- LISTEN FOR INCOMING REQUESTS
app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
  })
  