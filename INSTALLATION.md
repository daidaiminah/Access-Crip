# Installation Guide - Access Crip

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 12+ ([Download](https://www.postgresql.org/download/))
- **npm** (comes with Node.js)

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Access-Crip
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd server
npm install
```

#### Configure Environment Variables

1. Copy the example environment file:
```bash
copy .env.example .env
```

2. Edit `.env` and update with your configuration:
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
DB_HOST=localhost
DB_PORT=5432
DB_NAME=access_crip_db
DB_USER=postgres
DB_PASS=your-database-password
FRONTEND_URL=http://localhost:3000
```

#### Set Up Database

1. Create a PostgreSQL database:
```sql
CREATE DATABASE access_crip_db;
```

2. The application will automatically sync database models on startup.

#### Start Backend Server

```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd client
npm install
```

**Important:** Install Redux Toolkit and React Redux:
```bash
npm install @reduxjs/toolkit react-redux
```

#### Configure Environment Variables

1. Copy the example environment file:
```bash
copy .env.example .env
```

2. Edit `.env` with your configuration:
```env
VITE_API_URL=http://localhost:5000/api
```

#### Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (Vite default) or `http://localhost:3000`

## Verification

### Backend Verification

Visit `http://localhost:5000/api/health` - you should see:
```json
{
  "success": true,
  "message": "Access Crip API is running!",
  "timestamp": "2024-..."
}
```

### Frontend Verification

Visit `http://localhost:5173` - you should see the Access Crip homepage.

## Testing Authentication

1. Navigate to `http://localhost:5173/auth/register`
2. Create a new account (choose Customer or Owner role)
3. After successful registration, you'll be automatically logged in
4. Try logging out and logging back in at `http://localhost:5173/auth/login`

## Common Issues

### Issue: "Cannot find module 'react-redux'"

**Solution:** Install Redux dependencies:
```bash
cd client
npm install @reduxjs/toolkit react-redux
```

### Issue: Database connection failed

**Solution:** 
- Ensure PostgreSQL is running
- Verify database credentials in `server/.env`
- Check if the database exists

### Issue: CORS errors

**Solution:**
- Ensure `FRONTEND_URL` in `server/.env` matches your frontend URL
- Check that both servers are running

### Issue: Port already in use

**Solution:**
- Backend: Change `PORT` in `server/.env`
- Frontend: Vite will automatically use the next available port

## Next Steps

After successful installation:

1. **Create an Admin User** (manually in database or via seed script)
2. **Test Property Listing** (as Owner)
3. **Test Booking Flow** (as Customer)
4. **Explore Admin Dashboard** (as Admin)

## Development Workflow

### Running Both Servers

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

### Building for Production

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## Additional Configuration

### Setting Up Image Upload (Optional)

For production, consider using Cloudinary:

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Add to `server/.env`:
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Email Configuration (Optional)

For email notifications, add to `server/.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Support

If you encounter any issues during installation:
1. Check the [README.md](README.md) for more information
2. Review error messages carefully
3. Ensure all prerequisites are installed
4. Verify environment variables are set correctly

---

**Happy Coding! 🚀**
