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
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Users can log in and register.
- **Event Management**: Create, view, and delete events.
- **Pagination**: Events are displayed with pagination.
- **Dialog for Creating Events**: Use a dialog box to create new events.
- **Responsive Design**: The application is designed to be responsive and user-friendly.
- **Role-Based Access Control**: Only authenticated users can access certain features.

## Technologies Used

- **Frontend**: Angular, Angular Material
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS
- **Date Handling**: Angular Material Datepicker
- **Notifications**: Angular Material Snackbar

## Setup and Installation

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone <url>

   ```

2. **Navigate to the backend directory:**

   - **cd backend**

3. **Install the required dependencies:**

   - **npm install**

4. **Configure environment variables in a .env file:**

   - **PORT** = 3000

   - **MONGO_URL** = your_mongo_url

   - **JWT_SECRET** = your_jwt_secret

   - **EMAIL_NAME** = email_name

   - **EMAIL** = email_id

   - **EMAIL_PASS** = email_pass_key

   - **EMAIL_HOST** = smtp.gmail.com

5. **Start the backend server:**

   - **npm start**

### Frontend Setup

6. **Navigate to the frontend directory:**

   - **cd frontend**

7. **Install the required dependencies:**

   -**npm install**

8. **Start the Angular development server:**

   - **ng serve**
   - **Open your browser and navigate to http://localhost:4200.**

Usage
Register: Go to /register and fill out the registration form.
Login: Go to /login and log in with your credentials.
View Events: Navigate to /events to see the list of events.
Create Event: Click the "Create Event" button to open the dialog and create a new event.
Delete Event: Click the delete icon next to an event to remove it.
API Endpoints
User Endpoints
Register: POST /api/user/register

Request Body: { "email": "string", "password": "string" }
Response: { "token": "string" }
Login: POST /api/user/login

Request Body: { "email": "string", "password": "string" }
Response: { "token": "string" }
Event Endpoints
Get Events: GET /api/event/list?page=<page>&pageSize=<pageSize>

Response: { "events": [ { "title": "string", "description": "string", "date": "date", "attendees": [ "userId" ], "createdBy": "userId" } ], "totalCount": number }
Create Event: POST /api/event/create

Request Body: { "title": "string", "description": "string", "date": "date", "attendees": [ "userId" ], "createdBy": "userId" }
Response: { "event": { "title": "string", "description": "string", "date": "date", "attendees": [ "userId" ], "createdBy": "userId" } }
Delete Event: DELETE /api/event/delete/:id

Request Params: id (Event ID)
Response: 204 No Content
Components and Services
EventListComponent: Displays a list of events with pagination and actions for viewing and deleting events.
CreateEventDialogComponent: Dialog for creating new events.
AuthService: Handles authentication and user login.<readme>

<title>Event Management Application</title>

<description>
Welcome to the Event Management Application! This application allows users to create, view, and manage events. It includes features such as user authentication, event creation, and viewing a list of events with pagination.
</description>

<table-of-contents>
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
</table-of-contents>

<features>
<feature-list>
- User Authentication: Users can log in and register.
- Event Management: Create, view, and delete events.
- Pagination: Events are displayed with pagination.
- Dialog for Creating Events: Use a dialog box to create new events.
- Responsive Design: The application is designed to be responsive and user-friendly.
- Role-Based Access Control: Only authenticated users can access certain features.
</feature-list>
</features>

<technologies>
<tech-list>
- **Frontend**: Angular, Angular Material
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS
- **Date Handling**: Angular Material Datepicker
- **Notifications**: Angular Material Snackbar
</tech-list>
</technologies>

<setup-and-installation>
<backend-setup>
1. **Clone the repository:**

```bash
git clone <url>
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
   </backend-setup>

<frontend-setup>
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
   </frontend-setup>
   </setup-and-installation>

<usage>
<usage-list>
- **Register**: Go to `/register` and fill out the registration form.
- **Login**: Go to `/login` and log in with your credentials.
- **View Events**: Navigate to `/events` to see the list of events.
- **Create Event**: Click the "Create Event" button to open the dialog and create a new event.
- **Delete Event**: Click the delete icon next to an event to remove it.
</usage-list>
</usage>

<api-endpoints>
<user-endpoints>
- **Register**: `POST /api/user/register`
  - Request Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "string" }`

- **Login**: `POST /api/user/login`
  - Request Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "string" }`
    </user-endpoints>

<event-endpoints>
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
    </event-endpoints>
    </api-endpoints>

<components-and-services>
<component-list>
- **EventListComponent**: Displays a list of events with pagination and actions for viewing and deleting events.
- **CreateEventDialogComponent**: Dialog for creating new events.
- **AuthService**: Handles authentication and user login.
</component-list>
</components-and-services>

<contributing>
[Include information about how others can contribute to your project]
</contributing>

<license>
[Include your project's license information here]
</license>
</readme>
