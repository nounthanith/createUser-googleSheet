# Google Sheet API User & Product Management

This project is a web application for managing users and products using a Google Apps Script backend and Google Sheets as a database. It features user registration, login, product management, and admin/user role handling.

## Features

- **User Registration:** Register new users with default role as `user`.
- **User Login:** Login with email and password. Redirects to user dashboard on success.
- **Role-Based Navigation:** Hides login link for logged-in users.
- **Product Management:** Admins can add, view, and delete products.
- **Responsive Design:** Built with Bootstrap for mobile and desktop.

## Technologies Used

- HTML, CSS, JavaScript (Frontend)
- Bootstrap 5
- Google Apps Script (Backend)
- Google Sheets (Database)

## Setup

1. **Clone this repository.**
2. **Set up your Google Apps Script:**
   - Deploy a new Apps Script linked to a Google Sheet.
   - Copy the script code for handling `insert`, `read`, and `delete` actions.
   - Deploy as a web app and get the API URL.
3. **Update the API URL:**
   - Replace the `url` variable in your JS files with your Apps Script web app URL.

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
/userAdmin.html     # Admin dashboard
/main.js            # Main JS logic
/login.js           # Login logic
/producAdmin.js     # Product admin logic
```

## Notes

- Make sure your Google Sheet columns match the order expected by the Apps Script.
- For security, do not use this as-is for production. Passwords are stored in plain text for demo purposes.

## License

MIT