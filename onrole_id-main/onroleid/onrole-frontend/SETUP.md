# OnRole Frontend - Backend Integration

## Setup Instructions

### 1. Install Dependencies
```bash
cd d:\test\Aryan-s-auth\onroleid\onrole-frontend
npm install
```

### 2. Configure Environment
The `.env.local` file is already configured with:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api/auth
```

If backend is running on a different port, update this file.

### 3. Start Backend Server
Before running the frontend, make sure the backend is running:
```bash
cd d:\test\Aryan-s-auth
npm install
node server.js
```

Backend should be running on `http://localhost:8080`

### 4. Start Frontend Development Server
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## Features Implemented

✅ **User Authentication**
- Login with Email or OnRole ID
- Sign up with validation
- JWT token management
- Auto-logout on token expiry

✅ **API Integration**
- Axios with interceptors
- Automatic token injection
- Error handling
- Protected API calls

✅ **Protected Routes**
- Middleware for route protection
- Auto-redirect to login if not authenticated
- Dashboard for authenticated users

✅ **User Features**
- Profile display after login
- Logout functionality
- Session persistence
- Error messages

## Project Structure

```
onrole-frontend/
├── app/
│   ├── dashboard/      # Protected dashboard page
│   ├── login/          # Login page
│   ├── Signup/         # Registration page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable UI components
├── lib/
│   ├── api.ts          # Axios instance with interceptors
│   ├── auth.ts         # Auth utilities (token, user management)
│   └── services/
│       └── authService.ts  # Auth API service
├── styles/             # Global styles
├── middleware.ts       # Route protection middleware
├── .env.local          # Environment variables
└── package.json        # Dependencies
```

## API Endpoints

Backend API is expected to have these endpoints:

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user

### Response Format
```json
{
  "id": "user_id",
  "username": "username",
  "email": "user@example.com",
  "accessToken": "jwt_token",
  "message": "Success message"
}
```

## Error Handling

- **401 Unauthorized** - Token expired/invalid → Auto logout & redirect to login
- **400/422 Bad Request** - Validation errors → Display error message
- **Other Errors** - Generic error messages with logging

## Token Management

Tokens are stored in localStorage and automatically:
- Injected in every API request header (`x-access-token`)
- Cleared on logout or token expiry
- User data persisted for session continuity

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start backend server on port 8080
3. ✅ Run frontend: `npm run dev`
4. ✅ Access at `http://localhost:3000`
5. ✅ Test login/signup with backend

## Troubleshooting

### Port Already in Use
```bash
# Frontend (port 3000)
npm run dev -- -p 3001

# Backend (if port 8080 is in use)
PORT=8081 node server.js
# Then update .env.local
```

### CORS Errors
Ensure backend has correct CORS configuration:
```javascript
var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8081"]
};
```

### Token Not Sending
Clear browser storage and login again:
- Open DevTools → Application → Local Storage
- Clear all OnRole-related items
- Login fresh

