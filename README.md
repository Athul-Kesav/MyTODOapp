# My TO-DO App 🗃️

- The user can signup/login
- They can Create, Read, Update and Delete a To-Do element
- A To-Do can be marked as Done
- The app is connected to a backend, where all the details are stored [MongoDB](https://www.mongodb.com)
- The design of the webapp has been given in the .excalidraw file (updated)

## Currently, the following features are done ☑️

- BACKEND
  - Create
  - Read
  - Update (only partially (title/description/deadline can't be changed yet), can set done/not done)
  - Connected to backend
- FRONTEND
  - Home Page
  - Login Page ( returns the jwt token, stored in cookies )
  - Signup Page ( returns the jwt token )
  - User Page ( Add new Task, Set a Task as Done, Delete A Task from the done section )

### ISSUES 🤞

- Not Completely responsive yet
- To-Do creations and updations are not instant ( maybe have to set up a virtual memory before updating the database )
- The page transitions are not smooth.
- If the login fails then, the error message is shown in the console, the alert is not working for some reason.
