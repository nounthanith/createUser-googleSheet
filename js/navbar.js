const navItems = [
  {
    name: "Home",
    href: "product.html",
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
  navLink.textContent = item.name;
  navbar.appendChild(navLink);
});
