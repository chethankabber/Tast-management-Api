A complete Task Management API built with Node.js, Express, and MongoDB,
featuring user authentication, CRUD operations for tasks and categories,
analytics, validation, middleware, filtering, pagination, and sorting.


Tech Stack:
Backend: Node.js, Express.js
Database: MongoDB + Mongoose
Auth: JWT + Bcrypt
Validation: express-validator
Security: Helmet, CORS, express-rate-limit


Folder Structure
project-root/
├── index.js
├── .env
├── /src
│   ├── /routes
│   ├── /controllers
│   ├── /models
│   └── /middleware


Environment Variables:
PORT=3000
MONGO_URL=mongodb://localhost:27017/test
JWT_SECRET=PASSWORD


API Endpoints
//Auth
POST /api/auth/register - Register a new user
POST /api/auth/login - Login user and receive JWT token

//Tasks
GET /api/tasks/get - Get all tasks with filters, search, pagination
POST /api/tasks/add - Add a new task
POST /api/tasks/addNew - Add task with validation middleware
PUT /api/tasks/update/:id - Fully update a task
PATCH /api/tasks/patch/:id - Partially update task fields
DELETE /api/tasks/delete/:id - Delete a task

//Categories
POST /api/categories/create - Create a new category
PUT /api/categories/updateCategory/:id - Update a category
DELETE /api/categories/deleteCategory/:id - Delete a category


//Analytics
GET /api/analytics/summary - Returns:
/GET http://localhost:3000/api/analytics/summary

Total tasks
Completed, In Progress, Todo
Overdue tasks
Today's tasks
Completion rate (%)


Security & Performance
JWT-secured protected routes
Helmet for HTTP header protection
CORS enabled
Rate limiting to prevent abuse