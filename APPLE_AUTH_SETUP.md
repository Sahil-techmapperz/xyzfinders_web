# Apple ID Login Setup Guide

## 1. Prerequisites
-   You must have an **Apple Developer Program** membership.

## 2. Create an App ID
1.  Go to [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/identifiers/list/bundleId).
2.  Click **+** to register a new identifier.
3.  Select **App IDs** > **App**.
4.  Give it a description and a unique **Bundle ID** (e.g., `com.yourcompany.xyzfinders`).
5.  Under **Capabilities**, check **Sign In with Apple**.
6.  Click **Register**.

## 3. Create a Service ID
1.  Go back to **Identifiers** and select **Services IDs** from the dropdown top right.
2.  Click **+** to register a new Service ID.
3.  Give it a description and an identifier (this will be your `APPLE_CLIENT_ID`, e.g., `com.yourcompany.xyzfinders.auth`).
4.  Enable **Sign In with Apple** and click **Configure**:
    -   Primary App ID: Select the one created in Step 2.
    -   Domains and Subdomains: `yourdomain.com` (use a public domain, Apple often doesn't allow `localhost` for configuration but you can test via tools).
    -   Return URLs: `https://yourdomain.com/api/auth/apple/callback`
5.  Click **Save** and **Continue** to Register.

## 4. Update .env.local
```bash
APPLE_CLIENT_ID=your_service_id_identifier
```

> [!NOTE]
> Apple authentication is strictly controlled and requires a verified domain with HTTPS for the callback to work in production.
