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

## Getting Started

Follow these instructions to get a local copy up and running for development.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or later)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (for your database)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/namma-sevai-project.git](https://github.com/your-username/namma-sevai-project.git)
    cd namma-sevai-project
    ```

2.  **Install Root Dependencies:**
    (This installs `concurrently` to run both client and server).
    ```sh
    npm install
    ```

3.  **Install Server Dependencies:**
    ```sh
    npm install --prefix server
    ```
    *This installs Express, Mongoose, bcrypt, JWT, node-cron, etc.*

4.  **Install Client Dependencies:**
    ```sh
    npm install --prefix client
    ```
    *This installs React, Vite, Axios, React Router, etc.*

### Environment Setup

You must create a `.env` file in the `/server` directory.

1.  Navigate to the `/server` folder.
2.  Create a file named `.env`.
3.  Add the following variables. Get your `MONGO_URI` from your MongoDB Atlas dashboard.

    ```env
    # /server/.env

    # Your MongoDB connection string
    MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/namma_sevai?retryWrites=true&w=majority

    # A strong, random string for signing JWTs
    JWT_SECRET=your_super_strong_secret_key_here

    # The port for your backend server
    PORT=5001
    ```

### Running the Application

Once all dependencies are installed and your `.env` file is set up, go back to the **root directory** and run:

```sh
npm run dev
