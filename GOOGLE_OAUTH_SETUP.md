# Google OAuth Setup Guide

## Prerequisites
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one

## Steps to Configure Google OAuth

### 1. Enable Google+ API
1. Navigate to **APIs & Services** > **Library**
2. Search for "Google+ API"
3. Click **Enable**

### 2. Create OAuth 2.0 Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. If prompted, configure the OAuth consent screen:
   - Choose **External** user type
   - Fill in app information:
     - App name: XYZ Finders
     - User support email: your-email@example.com
     - Developer contact: your-email@example.com
   - Add scopes: `email`, `profile`, `openid`
   - Add test users if needed

### 3. Configure OAuth Client
1. Application type: **Web application**
2. Name: XYZ Finders - Production (or Development)
3. **Authorized JavaScript origins**:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
4. **Authorized redirect URIs**:
   - `http://localhost:3000/api/auth/google/callback` (for development)
   - `https://yourdomain.com/api/auth/google/callback` (for production)
5. Click **Create**

### 4. Copy Credentials
1. Copy the **Client ID** and **Client Secret**
2. Add them to your `.env.local` file:

```bash
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 5. Update Database Schema
Add Google ID field to users table:

```sql
ALTER TABLE users 
ADD COLUMN google_id VARCHAR(255) NULL UNIQUE AFTER email,
ADD COLUMN avatar TEXT NULL AFTER google_id;
```

## Usage in Frontend

### Login Button
```tsx
<button onClick={() => window.location.href = '/api/auth/google'}>
  Sign in with Google
</button>
```

### Handle Redirect with Token
The callback will redirect to your app with a `token` query parameter:

```tsx
// In your auth page or component
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  if (token) {
    // Store token in localStorage or cookies
    localStorage.setItem('auth_token', token);
    // Redirect to dashboard or home
    router.push('/');
  }
}, []);
```

## API Endpoints

### Initiate Google OAuth
- **Endpoint**: `GET /api/auth/google`
- **Query Params**: 
  - `returnUrl` (optional): URL to redirect after successful authentication
- **Response**: Redirects to Google's OAuth consent page

### Handle OAuth Callback
- **Endpoint**: `GET /api/auth/google/callback`
- **Query Params**: 
  - `code`: Authorization code from Google
  - `state`: Return URL
- **Response**: Redirects to app with JWT token

## Security Notes

1. **Never commit** your `GOOGLE_CLIENT_SECRET` to version control
2. Always use HTTPS in production
3. Validate the `state` parameter to prevent CSRF attacks
4. Store tokens securely (httpOnly cookies recommended)
5. Implement token refresh logic for long sessions

## Testing

1. Start your development server: `npm run dev`
2. Visit: `http://localhost:3000/api/auth/google`
3. Sign in with your Google account
4. You should be redirected back with a token

## Troubleshooting

### "redirect_uri_mismatch" error
- Ensure the redirect URI in Google Console exactly matches your env variable
- Check for trailing slashes

### "invalid_client" error
- Verify your Client ID and Client Secret are correct
- Make sure the OAuth client is enabled

### User not created
- Check database connection
- Verify the users table has the `google_id` column
- Check server logs for SQL errors
