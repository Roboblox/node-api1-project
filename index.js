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
  try {
    res.status(200).json({ users });
  } catch {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});
server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  try {
    if (user) {
      res.status(200).json({ data: { user } });
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});
server.post("/users", function (req, res) {
  const data = req.body;
  try {
    if (data.bio && data.name) {
      users.push({ id: uuid(), ...data });
      res.status(201).json({ data: users });
    } else {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    }
  } catch {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

server.put("/users/:id", (req, res) => {
  // find the lesson
  // anything read from the URL will be a string, we need to convert it to a number
  const id = Number(req.params.id);
  const data = req.body;
  const found = users.find((user) => user.id === id);

  if (found && data.bio && data.name) {
    // update the lesson with data received in the body
    Object.assign(found, data);
    res.status(200).json({ data: users });
  } else if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (!found) {
    res
      .status(400)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be modified." });
  }
});
// Delete User By ID
server.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.filter((user) => user.id == id);
  const found = users.find((user) => user.id == id);
  try {
    if (found) {
      users.splice(found, 1);
      res.status(200).json({ data: users });
    } else if (!found) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch {
    res.status(500).json({ errorMessage: "The user could not be removed" });
  }
});
// watch for connections on port 5000
const port = 5000;
server.listen(port, () => console.log(`Server running on ${port}`));
