# Project Name

## Overview
This project consists of a Next.js frontend and a NestJS backend. The application provides [brief description of what your application does].

## Prerequisites
- Node.js (version 16 or higher recommended)
- npm or yarn package manager
- Git

## Getting Started

### Frontend (Next.js)
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Build the application:
```bash
npm run build
```

4. Start the application:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

#### Development Mode
To run the frontend in development mode with hot-reload:
```bash
npm run dev
```

### Backend (NestJS)
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Build the application:
```bash
npm run build
```

4. Start the production server:
```bash
npm run start:prod
```

The backend API will be available at `http://localhost:3001`

#### Development Mode
To run the backend in development mode with hot-reload:
```bash
npm run start:dev
```

## Project Structure
```
├── frontend/     # Next.js frontend application
│   ├── components/   # React components
│   │   └── dashboard/   # Dashboard-related components
│   ├── pages/      # Next.js pages
│   └── public/     # Static assets
└── backend/     # NestJS backend application
    ├── src/        # Source code
    └── dist/       # Compiled code
```

### Important Configuration Note
After starting the application, you need to configure the backend URL:
1. Navigate to `frontend/components/dashboard`
2. Locate line 24 in the code
3. Update the URL to `http://localhost:3001/applications`

## Scripts Available

### Frontend
- `npm run dev`: Starts development server
- `npm run build`: Builds the application
- `npm start`: Starts production server
- `npm run lint`: Runs linting

### Backend
- `npm run start:dev`: Starts development server
- `npm run build`: Builds the application
- `npm run start:prod`: Starts production server
- `npm run test`: Runs tests
