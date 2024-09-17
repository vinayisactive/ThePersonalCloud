# [ThePersonalCloud](https://thepersonal-cloud.vercel.app)

[ThePersonalCloud](https://thepersonal-cloud.vercel.app/) is a modern platform designed for seamless management of notes, media, and files. Users can upload files and images, store them securely in the cloud, and take notes, all using the latest web technologies.

## Features

- **File & Image Upload**: Upload and store files and images securely in the cloud.
- **Note-Taking**: Simple interface for writing and saving notes.
- **Passwordless Authentication**: Login using email and OTP.
- **Third-Party Storage**: Files and images are stored using **UploadThing**.
- **Real-Time Sync**: Webhook syncs user registration with the database in real-time.

## Tech Stack

### Frontend:
- **Next.js**: Server-side rendering and frontend framework.
- **TailwindCSS**: Styling and responsive design.
- **React Query**: Data fetching and state management.

### Backend:
- **tRPC**: Type-safe API communication.
- **Drizzle ORM**: Database interactions with PostgreSQL.
- **Neon.tech**: Cloud database hosting.
- **UploadThing**: Third-party file storage.
- **Clerk**: Passwordless authentication (email + OTP).

## tRPC Procedures

- **getUser**: Retrieves the user profile.
- **getFiles**: Fetches the list of files uploaded by the user.
- **getImages**: Fetches the list of images uploaded by the user.
- **uploadImage**: Uploads images to **UploadThing** and stores metadata in the database.
- **uploadFile**: Uploads files to **UploadThing** and stores metadata in the database.
- **createNote**: Creates and stores a new note in the database.
- **updateNote**: Updates an existing note.
- **deleteNote**: Deletes a note from the database.

## Webhook

The `handleClerkWebhook` webhook ensures that new user registrations and profile updates are synced with the database in real time, maintaining consistent user data across the platform.

## Database Schema

The platform includes the following database tables:

- **User**: Stores user information.
- **Files**: Stores metadata of the uploaded files.
- **Images**: Stores metadata of the uploaded images.
- **Notes**: Stores user notes.

