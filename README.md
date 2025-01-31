# Events Platform

A web application for managing events with Firebase authentication and Google Calendar integration.



## 🌍 Live Platform

Access the platform online:

- **Primary URL**: [events-platform-595a1.web.app](https://events-platform-595a1.web.app/)
- **Alternative URL**: [events-platform-595a1.firebaseapp.com](https://events-platform-595a1.firebaseapp.com/)


## Project Overview

This platform allows staff to manage events, including viewing attendee lists, editing event details, and deleting events. Users can sign up for events and (optionally) add them to their personal Google Calendar.

## Features

- **User Authentication**: Sign in with Google or as a staff member (email/password).
- **Event Management**: Create, edit, delete, and view events.
- **Google Calendar Integration**: Add events directly to Google Calendar.
- **Role-Based Access**: Staff members can create and manage events, while regular users sign in via Google.


## Tech Stack

- **Frontend**: Vite, React, React Router
- **Backend**: Firebase (Firestore, Authentication)
- **Google API**: Google Calendar (Events insert)
- **Styling**: SCSS

## 🚀 Running Locally

### Clone the Repository
```
git clone https://github.com/joao-ponte/events-platform.git
cd events-platform

```
### Install Dependencies
```
npm Install
```

### Set Up Environment Variables

#### Create a .env file at the project root and add:
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_API_KEY=your_google_api_key
VITE_GOOGLE_SCOPES=https://www.googleapis.com/auth/calendar.events
```
### Start the Development Server
```
npm run dev

```


## 🌎 Using the Online Platform

### 🔑 Signing In

- **Users**: Sign in with Google.
- **Staff**: Use email and password.

#### 🛠 Staff Login Credentials
- **Email**: `test@test.co.uk`
- **Password**: `test123`

### 🏷️ User Access
- Users must provide their Gmail to be **manually added** to the Google Calendar API.
- Google Calendar API in test mode.

### 📅 Adding Events to Google Calendar
1. **Sign in** with Google.
2. Click **Sign Up** for an event.
3. An alert will ask if you want to **add the event to Google Calendar**.
4. If confirmed, the event is **created in your personal Google Calendar**.

## 🎉 Creating an Event

### 🔑 Login as Staff
Before creating an event, you **must** log in as a staff member.

1. Go to the **Sign In** page.
2. Enter the staff credentials:
   - **Email**: `test@test.co.uk`
   - **Password**: `test123`
3. Once logged in, the **"Create Event"** button will be available.

---

### 🛠 Creating a New Event
1. Click on the **"Create Event"** button.
2. A modal will appear with input fields for the event details.

#### 📋 Fill in the Required Fields:
- **Title**: Enter the event name.
- **Description**: Provide a short description of the event.
- **Date & Time**: Choose a valid **future** date and time.
- **Location**: Specify the event venue.
- **Capacity**: Define the maximum number of attendees.

3. Click **"Create Event"** to save.

---

### ✅ Event Creation Rules
- **All fields are required**.
- **Capacity must be a positive number**.
- **You cannot create an event in the past**.
- If the details are correct, the event will be created successfully.

---

### 🔄 Editing an Event
Once an event is created, staff members can edit it:
1. Click on the event in the list.
2. Modify any field.
3. Click **"Save Changes"** to update the event.

---

### ⚠️ Handling Errors
- If any field is missing or invalid, an **error message** will appear.
- If the event creation fails, retry after checking your internet connection.

🚀 *Now you're ready to create and manage events efficiently!*

