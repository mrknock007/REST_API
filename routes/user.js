const express = require("express");
const router=express.Router;


routes.get("/users", (req, res) => {
    const html = `
      <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>`;
    res.send(html);
  });
  
  // REST API REQUESTS
  
  // GET request to retrieve all users
  routes.get("/api/users", (req, res) => {
    return res.json(users);
  });
  
  // GET request to retrieve user by ID
  routes.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  });
  
  // POST request to create a new user
  routes.post("/api/users", async (req, res) => {
    const body = req.body;
  
    if (
      !body ||
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      !body.gender ||
      !body.jobTitle
    ) {
      return res.json({ msg: "All fields are required" });
    }
  
    try {
      const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle,
      });
      console.log("result", result);
  
      // Adding the new user to the MOCK_DATA.json file
      users.push(result);
      fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ status: "error", message: "Failed to write data to file" });
        }
  
        return res.json({ status: "success", id: result._id });
      });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: "error", message: "Failed to create user" });
    }
  });

  module.exports= router;