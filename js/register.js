const url =
  "https://script.google.com/macros/s/AKfycbyycsdm_UzEGSSaXX60Vv2Od3kEOFUSE5jq8VEl4EvGoPfvX_4vbGwdyfAbClX_upv4/exec";

document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const params = {
    action: "insert",
    id: Math.floor(Math.random() * 10000),
    name: name,
    email: email,
    password: password,
    role: (defaultRole = role || "user"),
    created_at: new Date().toISOString(),
  };

  fetch(url + "?" + new URLSearchParams(params), { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        window.location.href = "index.html";
      } else {
        alert("Registration failed. Please try again.");
      }
      document.getElementById("userForm").reset();
      console.log(data);
    });
});
