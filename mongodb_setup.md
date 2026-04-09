# MongoDB Atlas & Backend Integration Plan

This plan outlines the steps to create a MongoDB Atlas cluster and set up a Node.js/Express backend to connect the Acumen IT 2026 application to a database.

## Phase 1: MongoDB Atlas Setup (Manual Steps)
You will need to perform these steps in your browser:

1. **Sign Up/Login**: Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database) and create a free account.
2. **Create Project**: Name your project (e.g., `AcumenIT2026`).
3. **Deploy Cluster**:
   - Choose **M0 Free** tier.
   - Select a provider (AWS/Google Cloud) and region closest to you.
   - Name your Cluster (default is `Cluster0`).
4. **Security Configuration**:
   - **Database Access**: Create a user with a username and a **strong password**. Save these credentials.
   - **Network Access**: Add IP Address `0.0.0.0/0` to allow access from anywhere during development (or use your current IP for security).
5. **Get Connection String**:
   - Click **Connect** on your cluster.
   - Choose **Drivers** (Node.js).
   - Copy the `mongodb+srv://...` connection string. Replace `<password>` with your user password.

## Phase 2: Backend Initialization
We will create a lightweight backend in the existing project directory to handle database interactions.

### 1. Structure
Create a `server/` directory to keep backend code separate from the Vite frontend.

### 2. Dependencies
Install necessary packages:
```bash
npm install express mongoose dotenv cors
```

### 3. Environment Variables
Store the connection string securely in a `.env` file within the `server/` folder.

## Phase 4: Server Implementation
1. Create `server/index.js` as the entry point.
2. Configure `mongoose` to connect using the Atlas URI.
3. Set up basic middleware (JSON parsing, CORS).
4. Create a sample schema/model for event registrations.

## Phase 5: Integration
Connect the React frontend (`Register.jsx`) to the new backend API endpoints.
