const express = require("express"); // import the express package
const uuid = require("uuid").v4;
//You can then just call uuid() like that for id
const server = express(); // creates the server

server.use(express.json()); // remember to invoke json()

let users = [
  {
    id: 1, // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
  {
    id: 2, // hint: use the shortid npm package to generate it
    name: "John Doe", // String, required
    bio: "Not Tarzan's Wife, another John", // String, required
  },
];
let nextId = 3;
// handle requests to the root of the api, the / route
server.get("/users", (req, res) => {
  res.status(200).json({ users });
});
server.post("/users", function (req, res) {
  const data = req.body;
  users.push({ id: uuid(), ...data });
  res.status(201).json({ data: users });
});
server.put("/users/:id", (req, res) => {
  // find the lesson
  // anything read from the URL will be a string, we need to convert it to a number
  const id = Number(req.params.id);
  const changes = req.body;
  const found = users.find((l) => l.id === id);
  if (found) {
    // update the lesson with data received in the body
    Object.assign(found, changes);
    res.status(200).json({ data: users });
  } else {
    res.status(404).json({ message: "Usernot found" });
  }
  // return the usersarray
});

// watch for connections on port 5000
const port = 5000;
server.listen(port, () => console.log(`Server running on ${port}`));
