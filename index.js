/** @format */

const { urlencoded } = require("express");
var express = require("express");
var app = express();
const cors = require("cors");

require("dotenv").config();
const uuid = require("uuid");
const schools = require("./schools");
users = require("./users/users");

app.use(cors());
app.use(express.json());
//send content to port

app.use(express.urlencoded({ extended: false }));

//middleware
const logger = (req, res, next) => {
  console.log("logger is activated");
  next();
};

console.log(process.env);
app.use(logger);

app.get("/getAll", (req, res) => {
  res.json(schools);
  console.log("worked");
  //console.log(res.json(schools));
});

app.get("/:id", (req, res) => {
  let found = schools.some((school) => school.id === parseInt(req.params.id));
  if (found) {
    res.json(schools.filter((school) => school.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ msg: `the specified id ${req.params.id} was not found` });
  }
});

app.get("/:id/:name/:location", (req, res) => {
  let newSchool = {
    id: uuid.v4(),
    name: req.params.name,
    location: req.params.location,
  };
  schools.push(newSchool);
  res.json(schools);
});

app.post("/post", (req, res) => {
  let newSchool = {
    id: uuid.v4(),
    name: req.body.name,
    location: req.body.location,
  };
  try {
    schools.push(newSchool);
  } catch (err) {
    console.log(err);
  }

  //res.json(schools).redirect("/");
});

app.get("/delete/:id", (req, res) => {
  let found = schools.some((school) => school.id === parseInt(req.params.id));
  // res.send("hello");
  if (found) {
    // res.json({
    schools.filter((school) => school.id !== parseInt(req.params.id)),
      // });

      res.json(schools);
  } else {
    res.json({ msg: `no school with id of ${req.params.id} was found` });
  }
});

//update member
app.put("/edit", (req, res) => {
  try {
    const found = schools.some((school) => school.id === parseInt(req.body.id));
    if (found) {
      updmember = req.body;
      console.log(updmember);
      schools.forEach((school) => {
        if (school.id === parseInt(req.body.id)) {
          school.name = updmember.name ? updmember.name : school.name;

          school.location = updmember.location
            ? updmember.location
            : school.location;

          res.json(schools);
        }
      });
    } else {
      res.json({ msg: `no school with id of ${req.body.id} was found` });
    }
  } catch (err) {
    console.log(err);
  }
});

// school.name !== req.body.name ? updmember : school.name;
// console.log(school.name !== req.body.name ? updmember : school.name);
// school.location !== req.body.name ? updmember : school.location;

///how to create your own post api
// fetch('http://localhost:3000',{
//     method:'POST',
//     body:JSON.stringify({
//         id:7,
//         name:"Jasn statn",
//         location:"tema"
//     }),
//     headers:{
//         'Content-type':'application/json; charset=UTF-8'
//     }}
// ).then(res=>res.json()).then(console.log)

app.listen(process.env.port, (err, data) => {
  console.log(`Server is running on port ${port}  `, err);
});
