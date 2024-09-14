# Event Management Application

Welcome to the Event Management Application! This application allows users to create, view, and manage events. It includes features such as user authentication, event creation, and viewing a list of events with pagination.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Event Reminders using Nodemailer](#event-reminders-using-nodemailer)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Users can log in and register.
- **Event Management**: Create, view, and delete events.
- **Pagination**: Events are displayed with pagination.
- **Dialog for Creating Events**: Use a dialog box to create new events.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Technologies Used

- **Frontend**: Angular, Angular Material
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS
- **Date Handling**: Angular Material Datepicker

## Setup and Installation

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>

   ```

2. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

3. **Install the required dependencies:**

   ```bash
   npm install
   ```

4. **Configure environment variables in a .env file:**

   ```
   PORT=3000
   MONGO_URL=your_mongo_url
   JWT_SECRET=your_jwt_secret
   EMAIL_NAME=email_name
   EMAIL=email_id
   EMAIL_PASS=email_pass_key
   EMAIL_HOST=smtp.gmail.com
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```
6. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

7. **Install the required dependencies:**

   ```bash
   npm install
   ```

8. **Start the Angular development server:**
   ```bash
   ng serve
   ```
   Open your browser and navigate to `http://localhost:4200`.

- **Register**: Go to `/register` and fill out the registration form.
- **Login**: Go to `/login` and log in with your credentials.
- **View Events**: Navigate to `/events` to see the list of events.
- **Create Event**: Click the "Create Event" button to open the dialog and create a new event.
- **Delete Event**: Click the delete icon next to an event to remove it.

- **Register**: `POST /api/user/register`

  - Request Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "string" }`

- **Login**: `POST /api/user/login`
  - Request Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "string" }`
- **Get Events**: `GET /api/event/list?page=<page>&pageSize=<pageSize>`

  - Response:
    ```json
    {
      "events": [
        {
          "title": "string",
          "description": "string",
          "date": "date",
          "attendees": ["userId"],
          "createdBy": "userId"
        }
      ],
      "totalCount": number
    }
    ```

- **Create Event**: `POST /api/event/create`

  - Request Body:
    ```json
    {
      "title": "string",
      "description": "string",
      "date": "date",
      "attendees": ["userId"],
      "createdBy": "userId"
    }
    ```
  - Response:
    ```json
    {
      "event": {
        "title": "string",
        "description": "string",
        "date": "date",
        "attendees": ["userId"],
        "createdBy": "userId"
      }
    }
    ```

- **Delete Event**: `DELETE /api/event/delete/:id`

  - Request Params: `id` (Event ID)
  - Response: 204 No Content

- **EventListComponent**: Displays a list of events with pagination and actions for viewing and deleting events.
- **Event Reminders using Nodemailer**
  - Functionality
  - The system sends automated email reminders to users for events happening within the next 3 days. This feature is implemented using Nodemailer. The backend periodically checks the database for events scheduled within the upcoming three days and sends out reminder emails.
- **CreateEventDialogComponent**: Dialog for creating new events.
- **AuthService**: Handles authentication and user login.
