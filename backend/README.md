# Yug Tiffin Services – Mess Management System Backend

This is the fully functional backend built with Node.js, Express, and MongoDB. It provides an API for both Admin and Student roles to manage mess services, parcels, payments, menus, and notices.

## Tech Stack
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Backend framework for building RESTful APIs.
- **MongoDB & Mongoose**: NoSQL database for flexible data storage.
- **JWT**: JSON Web Tokens for authorization and secure authentication.
- **Bcrypt.js**: For securely hashing passwords.
- **Dotenv**: Managing environment variables.
- **CORS**: Handling Cross-Origin Resource Sharing.

## Setup Instructions

1. **Install Dependencies**
   Open your terminal in the `backend` directory and run:
   ```bash
   npm install
   ```

2. **Environment Variables**
   Make sure you have your `.env` file correctly configured. Take a look at the `.env.example` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/yug-mess-system
   JWT_SECRET=supersecretjwtkey_replace_in_production
   NODE_ENV=development
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The backend should start and log `MongoDB Connected: localhost` and `Server running in development mode on port 5000`.

## API Documentation

### Auth Routes (`/api/auth`)
- `POST /register-student` : Register a new student
- `POST /register-admin` : Register a new admin
- `POST /login` : Login user and get a JWT token

### Admin Routes (`/api/admin`)
- `GET /dashboard` : Get basic stats (total students, pending payments, etc.)
- `GET /students` : Get list of all students
- `POST /add-student` : Add a new student directly
- `PUT /update-student/:id` : Update an existing student record
- `DELETE /delete-student/:id` : Delete a student record

### Student Routes (`/api/student`)
- `GET /dashboard` : Get student specific stats (membership, today's parcel, etc.)
- `GET /menu` : View today's mess menu
- `POST /parcel` : Book a parcel
- `GET /payments` : View personal payment history
- `POST /feedback` : Post feedback for meals

### Generic Routes
- `Menu`: `/api/menu`
- `Payments`: `/api/payments`
- `Parcel Orders`: `/api/orders`
- `Notices`: `/api/notices`

## Security
- Passwords are encrypted before storing into the Database using `bcryptjs`.
- Custom middleware `protect` for routes needing authentication verification via `JWT`.
- Custom middleware `admin` ensuring only verified Admin accounts can access specific management routes like User crud and Payments confirmation.
