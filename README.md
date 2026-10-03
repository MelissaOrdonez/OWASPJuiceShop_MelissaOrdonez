What It Does:

loginPage Project is a simple login form with HTML and JavaScript. 

The project allows users to input an email and password and has validations to ensure the email is not empty, an appropriate length and contains the `@` symboal. There are also validations to make sure the password isn't empty and that the combination of username and password is for a valid user. Currently valid users are hardcoded into a simple SQL table since this is a basic page so no new users can be created. There are two different roles, with regular users and admin. The login form has both client and server side validations with client side validations in login.js and server side validations in server.js.

How To Run:

Run `node server.js` in terminal (may need to `npm install express`, `npm install cors` and `npm install better-sqlite3` if not installed already) to get the server running. Then open the login form at `http://127.0.0.1:5500/loginPage/login.html`