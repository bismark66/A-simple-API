/** @format */

//const e = require("express");

/** @format */
let submitbtn = document.querySelector(".submitbtn");
let editSubmitbtn = document.querySelector(".editSubmitbtn");

let loadcontent = document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/getAll")
    .then((res) => res.json())
    .then((data) => loadHtmlContent(data));
});

let loadHtmlContent = (data) => {
  // console.log(tbody);
  if (data.length === 0) {
    tbody.innerHTML = "<tr><td colspan='3' > NO DATA</td></tr>";
  } else {
    console.log(data);
    data.forEach((item) => {
      let tablerow = document.createElement("tr");

      tablerow.innerHTML = `<td>${item.id}</td> <td> ${item.name}</td> <td>${item.location}</td>`;
      // row.innerHTML = `<td>${item.id}</td> <td> ${item.name}</td> <td>${item.location}</td>`;
      let tbody = document.querySelector(".tbody");
      tbody.appendChild(tablerow);
    });
  }
};

let postNewUser = (e) => {
  // e.preventDefault();
  let name = document.querySelector("#Sname").value;
  let location = document.querySelector("#location").value;
  try {
    fetch("http://localhost:3000/post", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        location: location,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(loadcontent);
  } catch (err) {
    console.log("error", err);
  }
};

let editUser = (e) => {
  alert("hello");
  // e.preventDefault();
  let Newname = document.querySelector("#editedName").value;
  alert(Newname);
  let NewLocation = document.querySelector("#editlocation").value;
  alert(NewLocation);
  let id = document.querySelector("#Id").value;
  alert(id);
  try {
    fetch("http://localhost:3000/edit", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        name: Newname,
        location: NewLocation,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(loadcontent);
  } catch (err) {
    console.log(err);
  }
};

submitbtn.addEventListener("click", postNewUser);
editSubmitbtn.addEventListener("click", editUser);
