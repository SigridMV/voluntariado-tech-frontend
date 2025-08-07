# Volunteering Tech Backend

## Project Overview

This project is a backend API to connect schools and volunteers for technology education.  
Users can register as either schools or volunteers, log in, and schedule sessions.  
It uses PostgreSQL for data storage, Prisma ORM for database management, and JWT for authentication.

## Features

- User registration and login with role-based access  
- Password hashing for security  
- Scheduling system to book volunteer sessions  
- Basic project and availability management  

## Technology Stack

- Node.js with Express  
- Prisma ORM  
- PostgreSQL database  
- JSON Web Tokens (JWT) for authentication  
- Bcrypt for password hashing  

## Setup Instructions

1. Clone the repository:  
   ```bash
   git clone https://github.com/SigridMV/volunteering-tech-backend.git
   cd volunteering-tech-backend


2. Install dependencies
    npm install

3. Setup environment variables
Create a .env file in the root directory and add the following:

DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000

4. Run database migrations

npx prisma migrate deploy

5. Start the development server

npm run dev

## License
This project is open source and available under the MIT License.