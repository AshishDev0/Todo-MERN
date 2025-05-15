# Todo App

A modern Todo application built with React, Node.js, MongoDB, and TypeScript. Features include task management, priority levels, due dates, and a clean UI.

## Features

- Modern and responsive UI
- Mobile-friendly design
- Task completion tracking
- Priority levels (Low, Medium, High)
- Due date management
- Real-time updates
- Dark mode support

## Tech Stack

### Frontend
- React with TypeScript
- Redux Toolkit
- Tailwind CSS
- Shadcn UI
- Axios
- React Hook Form
- Zod
- Date-fns

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- Zod
- CORS enabled
- Error handling middleware

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Setup Instructions

### Backend Setup

```bash
cd server
npm install

# Create .env file with:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
CLIENT_URL=http://localhost:3000

npm run dev
```

### Frontend Setup

```bash
cd client
npm install

# Create .env file with:
VITE_API_URL=http://localhost:5000/api

npm run dev
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Deployment

### Backend (Render/Railway)

1. Create account on Render/Railway
2. Connect GitHub repository
3. Configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables:
     ```
     PORT=5000
     NODE_ENV=production
     MONGODB_URI=your_mongodb_atlas_connection_string
     CLIENT_URL=https://your-frontend-url.vercel.app
     ```

### Frontend (Vercel)

1. Create Vercel account
2. Import GitHub repository
3. Configure:
   - Framework Preset: Vite
   - Environment Variables:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```

### MongoDB Atlas

1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Add IP to whitelist
5. Use connection string in backend env vars

## Development

```bash
# Backend
cd server
npm run build
npm start

# Frontend
cd client
npm run build
npm start
```

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 