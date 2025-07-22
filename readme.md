My-ThinkBoard is a full-stack MERN (MongoDB, Express.js, React, Node.js) application developed as a capstone project for the PLP MERN Stack Development course and maintained by [Uknownevildoer](https://github.com/Uknownevildoer).

## Table of Contents
- [🚀 Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)

## Project Overview
My-ThinkBoard is a modern, secure, and responsive note-taking app. It features user authentication, user-specific notes, profile management, password change, and a beautiful UI powered by DaisyUI and Tailwind CSS. The backend is secured with JWT, CORS, and rate limiting.

## Features

- **User Authentication:** Register, login, and logout with JWT-based authentication.
- **User-Specific Notes:** Each user can only see and manage their own notes.
- **Profile Management:** Update your username, email, and password from the profile page.
- **Protected Routes:** Only authenticated users can access notes and profile pages.
- **DaisyUI Styling:** Clean, modern, and responsive UI.
- **Production-Ready CORS:** Only allows requests from your deployed frontend.
- **Rate Limiting:** Protects the backend from abuse (Upstash Redis).
- **Toast Notifications:** Friendly feedback for all actions.

## Installation

Clone the repository:
```bash
git clone https://github.com/Uknownevildoer/my-thinkboard.git
cd my-thinkboard
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables as above.
4. Run the backend server:
   ```bash
   npm run start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Run the frontend development server:
   ```bash
   npm run dev
   ```
4. To build for production:
   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:
```env
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-very-strong-secret-key
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token
PORT=3000 # or your preferred port
NODE_ENV=production # or development
```

## Usage
- Register a new account or login.
- Create, view, update, and delete your own notes.
- Update your profile and change your password from the Profile page.
- Logout securely from the Navbar.

