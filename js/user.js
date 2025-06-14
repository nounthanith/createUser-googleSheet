const url =
  "https://script.google.com/macros/s/AKfycbwiPp6yRsSGRAxDRi1a3ix3vcRl0qcYyH9d2t8F9iuAVwJ0hLxHaIuYg0xCROwr_NBg/exec";

const userData = document.getElementById("userData");
const userCount = document.getElementById("userCount");

async function getdata() {
 
  const role = localStorage.getItem("role");
  if (role === "user") {
    userData.innerHTML = '<td class="text-danger" colspan="8">No Permission!!!</td>';
    return;
  }

  try {
    const res = await fetch(url + "?action=read");
    const data = await res.json();
    userData.innerHTML = "";

    for (let i = 0; i < data.data.length; i++) {
      userData.innerHTML += `
      <tr class="align-middle">
        <th scope="row">${data.data[i][0]}</th>
        <td class="fw-bold">${data.data[i][1]}</td>
        <td class="text-primary cursor-pointer">${data.data[i][2]}</td>
        <td class="text-uppercase">${data.data[i][4]}</td>
        <td>${data.data[i][5]}</td>
        <td>
          <div class="d-flex gap-2 justify-content-center">
            <button onclick="DeleteData(${data.data[i][0]})" class="btn btn-danger btn-sm">
              <i class="fa-solid fa-trash"></i>
            </button>
            <button class="btn btn-primary btn-sm">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
        </td>
      </tr>`;
    }
    document.getElementById("userCount").textContent = data.data.length;
  } catch (error) {
    console.log(error.message);
  }
}

getdata();

document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const localRole = localStorage.getItem("role");
  if (localRole === "user") {
    // Show alert and stop
    if (typeof Swal !== "undefined") {
      alert("You don't have permission to add users.", "", "error");
    } else {
      alert("You don't have permission to add users.");
    }
    return;
  }
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let role = document.getElementById("role").value;

  role = role || "user";

  let params = {
    action: "insert",
    id: Math.floor(Math.random() * 10000),
    name: name,
    email: email,
    password: password * 123, // Assuming you want to hash or encode the password
    role: role,
    created_at: new Date().toISOString(),
  };

  fetch(url + "?" + new URLSearchParams(params), { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      
      document.getElementById("userForm").reset();
      alert("User added successfully!", "", "success");
      getdata(); // Refresh table
    });
});

function DeleteData(id) {
  Swal.fire({
    title: "Do you want to delete this record?",
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: "No",
    icon: "warning",
  }).then((result) => {
    if (result.isConfirmed) {
      var params = {
        action: "delete",
        id: id,
      };
      fetch(url + "?" + new URLSearchParams(params), { method: "POST" })
        .then((response) => response.json())
        .then((data) => {
          // Call your refresh function here
          getdata(); // or select(); if that's your function
          console.log(data);
          Swal.fire("Deleted!", "", "success");
        })
        .catch((error) => {
          Swal.fire("Error deleting record.", "", "error");
        });
    } else if (result.isDenied) {
      Swal.fire("Delete cancelled", "", "info");
    }
  });
}


