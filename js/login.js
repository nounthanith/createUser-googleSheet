const url =
  "https://script.google.com/macros/s/AKfycbyycsdm_UzEGSSaXX60Vv2Od3kEOFUSE5jq8VEl4EvGoPfvX_4vbGwdyfAbClX_upv4/exec";

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    // const loginMessage = document.getElementById("loginMessage");

    try {
      const res = await fetch(url + "?action=read");
      const data = await res.json();
      // console.log(data.data[0][2]);

      for (let i = 0; i < data.data.length; i++) {
        if (email === data.data[i][2] && password == data.data[i][3]) {
          localStorage.setItem("role", data.data[i][4]);
          localStorage.setItem("userId", data.data[i][0]);
          localStorage.setItem("userName", data.data[i][1]);
          localStorage.setItem("userEmail", data.data[i][2]);
          console.log("Login successful");
          if (data.data[i][4] == "user") window.location.href = "product.html";
          else if (data.data[i][4] == "admin")
            window.location.href = "user.html";
          else {
            console.log("Invalid role");
            Swal.fire({
              icon: "error",
              title: "Invalid role",
              text: "Please contact support.",
            });
          }
          return;
        }
        if (email === data.data[i][2] && password != data.data[i][3]) {
          console.log("Incorrect password");
          Swal.fire({
            icon: "error",
            title: "Incorrect password",
            text: "Please try again.",
          });
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      Swal.fire({
        icon: "error",
        title: "Error fetching user data",
        text: "Please try again later.",
      });
      return;
    }
  });
