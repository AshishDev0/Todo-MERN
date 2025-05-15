# Todo App

A modern Todo application built with React, Node.js, MongoDB, and TypeScript. Features include task management, priority levels, due dates, and a beautiful UI inspired by Todoist.

## Features

- ✨ Modern and responsive UI
- 📱 Mobile-friendly design
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

- Node.js (v14 or higher)
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

## Deployment

### Backend Deployment (Render/Railway)

1. Create an account on [Render](https://render.com) or [Railway](https://railway.app)
2. Connect your GitHub repository
3. Configure the following:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables:
     ```
     PORT=5000
     NODE_ENV=production
     MONGODB_URI=your_mongodb_atlas_connection_string
     CLIENT_URL=https://your-frontend-url.vercel.app
     ```

### Frontend Deployment (Vercel)

1. Create an account on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure the following:
   - Framework Preset: Vite
   - Environment Variables:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```

### MongoDB Atlas Setup

1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Add your IP address to the whitelist
5. Use the connection string in your backend environment variables

## Development

### Running Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

### Building for Production
```bash
# Backend
cd server
npm run build

# Frontend
cd client
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 