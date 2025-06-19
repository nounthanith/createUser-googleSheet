# Google Sheet API User & Product Management

This website project is my group assigment that i study at NUBB univercity of Battambang. In semester 2 of Year 2. It is my final project.
- 👉 If you don't want to register you can testing with Email: user@gmail.com and Password: 123 . 🙏❤️💥

## Features

- **User Registration:** Register new users with default role as `user`.
- **User Login:** Login with email and password. Redirects to user dashboard on success.
- **Role-Based Navigation:** Hides login link for logged-in users.
- **Product Management:** Admins can add, view, and delete products.
- **Responsive Design:** Built with Bootstrap for mobile and desktop.

## Technologies Used

- HTML, CSS, JavaScript (Frontend)
- Bootstrap 5
- SweetAlert2 (alert message)
- Font Awesome (icon)
- Google Apps Script (Backend)
- Google Sheets (Database)

## Setup

1. **Clone this repository.**
2. **Set up your Google Apps Script:**
   - Deploy a new Apps Script linked to a Google Sheet.
   - Copy the script code for handling `insert`, `read`, `update`, `getById`, and `delete` actions.
   - Deploy as a web app and get the API URL.
3. **Update the API URL:**
   - Replace the `url` or `urlp` variable in your JS files with your Apps Script web app URL. Note: urlp is api of product.

## Usage

- **Register:** Go to `register.html` and create a new user.
- **Login:** Go to `login.html` and log in with your email and password.
- **Admin:** If logged in as admin, access product management features.
- **User:** Regular users have limited access.

## File Structure

```
/index.html         # Main or login page
/register.html      # Registration page
/login.html         # Login page
/user.html          # User dashboard
/user.html          # Admin dashboard
/user.js            # Main JS logic
/login.js           # Login logic
/producAdmin.js     # Product admin logic
/page404.html       # Error page
/about.html         # Team Member
/product.detail     # Product Detail
/product.js         # Product Detail Logic
/cart.js            # Cart Logic
/shippingCart       # Cart interface

```

## License

MIT

## Thank You!!❤️🦭🙏
