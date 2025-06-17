const navItems = [
  {
    name: "Home",
    href: "product.html",
  },
  {
    name: "About Us",
    href: "about.html",
    target: "_blank",
  },
  {
    name: "Admin",
    href: "user.html",
  },
  {
    name: "Login",
    href: "index.html",
  },
];

const navbar = document.getElementById("navbar");
navItems.forEach((item) => {
  const navLink = document.createElement("a");
  navLink.className = "nav-link";
  navLink.href = item.href;
  navLink.target = item.target || "_self";
  navLink.textContent = item.name;
  navbar.appendChild(navLink);
});
