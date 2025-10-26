# Namma Sevai: Digital Complaint Platform 

This is a full-stack MERN (MongoDB, Express, React, Node.js) application designed as a digital platform for submitting and managing complaints related to civic services.

The app features a robust, role-based authentication system:
* **Users** can register with any email, submit new complaints, and view a live feed of all complaints submitted by everyone.
* **Admins** must register with a `@karunya.edu.in` email and are the only ones who can update a complaint's status (Pending, In Progress, Resolved).

## Core Features

* **Full MERN Stack:** Built with React (Vite), Node.js, Express.js, and MongoDB.
* **Role-Based Authentication:** Separate login/registration for Users and Admins.
* **Admin Email Validation:** Backend logic ensures only emails from the `@karunya.edu.in` domain can register as an Admin.
* **Unified Complaint Feed:** All users (both User and Admin) can see all submitted complaints.
* **Admin Complaint Management:** Admins can filter complaints and update their status.
* **Visual Feedback:** Complaints are styled with color-coded tags based on their category (Roads, Water, etc.).
* **Auto-Cleanup:** A scheduled cron job on the server automatically deletes any complaint 24 hours after it has been marked "Resolved."
* **Custom Branding:** Includes the Tamil Nadu logo in the header and as the site's favicon.

## Tech Stack

* **Frontend:** React.js, Vite, React Router, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Atlas)
* **Authentication:** JWT (JSON Web Token), bcrypt.js
* **Scheduled Jobs:** `node-cron`

