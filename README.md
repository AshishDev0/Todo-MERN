# Todo App

A modern Todo application built with React, Node.js, MongoDB, and TypeScript. Features include task management, priority levels, due dates, and a beautiful UI inspired by Todoist.

## Features

- Modern and responsive UI
- Mobile-friendly design
- ✅ Task completion tracking
- ⭐ Priority levels (Low, Medium, High)
- 📅 Due date management
- 🔄 Real-time updates
- 🎨 Beautiful animations and transitions
- 🌙 Dark mode support

## Tech Stack

### Frontend

- React with TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- Shadcn UI components
- Axios for API calls
- React Hook Form for form handling
- Zod for validation
- Date-fns for date manipulation

### Backend

- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- Zod for validation
- CORS enabled
- Error handling middleware

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Project Structure

```
todo-app/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── store/        # Redux store and slices
│   │   ├── services/     # API services
│   │   ├── types/        # TypeScript types
│   │   └── ...
│   └── ...
└── server/                # Backend Express application
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Mongoose models
    │   ├── routes/       # Express routes
    │   ├── types/        # TypeScript types
    │   └── ...
    └── ...
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd todo-app
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
# Add the following environment variables:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
CLIENT_URL=http://localhost:3000

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env file
# Add the following environment variable:
VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Todos

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
