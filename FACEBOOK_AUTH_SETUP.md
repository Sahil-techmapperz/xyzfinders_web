# Facebook Login Setup Guide

## 1. Create a Facebook Developer App
1.  Go to the [Meta for Developers](https://developers.facebook.com/) portal.
2.  Log in and click **My Apps** > **Create App**.
3.  Select **Set up Facebook Login** or **Consumer** type.
4.  Provide an app name (e.g., "XYZ Finders").

## 2. Configure Facebook Login
1.  In the left sidebar, click **Add Product** and select **Facebook Login**.
2.  Choose **Web** as the platform.
3.  Set **Site URL** to `http://localhost:3000` (for development).
4.  Navigate to **Facebook Login** > **Settings**:
    -   Enable **Client OAuth Login** and **Web OAuth Login**.
    -   Add **Valid OAuth Redirect URIs**:
        -   `http://localhost:3000/api/auth/facebook/callback`
        -   `https://yourdomain.com/api/auth/facebook/callback` (for production)
5.  Click **Save Changes**.

## 3. Get Credentials
1.  Go to **App Settings** > **Basic**.
2.  Your **App ID** is your `FACEBOOK_CLIENT_ID`.
3.  Click **Show** on **App Secret** — this is your `FACEBOOK_CLIENT_SECRET`.

## 4. Update .env.local
```bash
FACEBOOK_CLIENT_ID=your_app_id
FACEBOOK_CLIENT_SECRET=your_app_secret
```
