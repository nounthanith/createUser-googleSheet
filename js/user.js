const url =
  "https://script.google.com/macros/s/AKfycbyycsdm_UzEGSSaXX60Vv2Od3kEOFUSE5jq8VEl4EvGoPfvX_4vbGwdyfAbClX_upv4/exec";

const userData = document.getElementById("userData");

async function getdata() {
  try {
    const res = await fetch(url + "?action=read");
    const data = await res.json();
    // console.log(data.data);
    userData.innerHTML = ""; 

    for (let i = 0; i < data.data.length; i++) {
      userData.innerHTML += `
      <tr class="align-middle">
        <th scope="row">#${data.data[i][0]}</th>
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
  } catch (error) {
    console.log(error.message);
  }
}

getdata();

function DeleteData(id) {
  var params = {
    action: "delete",
    id: id,
  };

  fetch(url + "?" + new URLSearchParams(params), { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      getdata(); // Refresh table after delete
      console.log(data);
    });
}

document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let role = document.getElementById("role").value;

  role = role || "user";

  let params = {
    action: "insert",
    id: Math.floor(Math.random() * 1000000),
    name: name,
    email: email,
    password: password,
    role: role,
    created_at: new Date().toISOString(),
  };

  fetch(url + "?" + new URLSearchParams(params), { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      getdata(); // Refresh table
      document.getElementById("userForm").reset(); // Clear form
      console.log(data);
    });
});