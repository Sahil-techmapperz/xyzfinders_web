# Backend API Documentation

## Overview

The Next.js backend API provides a complete REST API for the XYZ Finders marketplace application. All endpoints return JSON responses and use JWT token-based authentication where required.

**Base URL**: `http://localhost:3000/api`

## Database Configuration

The API connects to a MySQL database. Configure the connection in `.env.local`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=marketplace_db
DB_USERNAME=root
DB_PASSWORD=Techm@123
JWT_SECRET=your-secret-key
```

**Important**: Ensure XAMPP MySQL is running before using the API.

## Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Tokens are obtained from the login or register endpoints and are valid for 7 days.

## API Endpoints

### 🔐 Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123",
  "password_confirmation": "password123",
  "role": "buyer"  // or "seller"
}
```

**Response**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { ... },
    "token": "eyJhbGc..."
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

---

### 📦 Products

#### List Products
```http
GET /api/products?page=1&per_page=20&category_id=1&search=iphone
```

**Query Parameters**:
- `page` - Page number (default: 1)
- `per_page` - Items per page (default: 20)
- `category_id` - Filter by category
- `location_id` - Filter by location
- `search` - Search in title/description
- `min_price` - Minimum price
- `max_price` - Maximum price
- `condition` - Product condition (new, like_new, good, fair, poor)
- `status` - Product status (active, sold, inactive)

#### Create Product
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "iPhone 13 Pro",
  "description": "Excellent condition...",
  "price": 85000,
  "original_price": 120000,
  "category_id": 5,
  "location_id": 10,
  "condition": "like_new",
  "images": ["image1.jpg", "image2.jpg"]
}
```

#### Get Product by ID
```http
GET /api/products/123
```

#### Update Product
```http
PUT /api/products/123
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 80000,
  "status": "active"
}
```

#### Delete Product
```http
DELETE /api/products/123
Authorization: Bearer <token>
```

---

### 📂 Categories

#### List All Categories
```http
GET /api/categories?featured=true

```

**Query Parameters**:
- `parent_id` - Filter by parent category
- `featured` - Show only featured categories (true/false)

#### Get Category by ID
```http
GET /api/categories/1
```

---

### 📍 Locations

#### Get All States
```http
GET /api/locations/states
```

#### Get Cities
```http
GET /api/locations/cities?state=Delhi
```

**Query Parameters**:
- `state` - Filter cities by state

---

### 👤 Users

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "9876543210",
  "avatar": "avatar.jpg"
}
```

#### Get My Products
```http
GET /api/users/my-products?page=1&status=active
Authorization: Bearer <token>
```

---

### ❤️ Favorites

#### List Favorites
```http
GET /api/favorites
Authorization: Bearer <token>
```

#### Add to Favorites
```http
POST /api/favorites
Authorization: Bearer <token>
Content-Type: application/json

{
  "product_id": 123
}
```

#### Remove from Favorites
```http
DELETE /api/favorites/5
Authorization: Bearer <token>
```

---

### 🖼️ Image Upload & Retrieval

#### Upload Profile Image
```http
POST /api/upload/profile-image
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- image: File (JPEG, PNG, GIF, WebP - max 1GB)
```

**Response**:
```json
{
  "success": true,
  "data": {
    "message": "Profile image uploaded successfully",
    "size": 245678,
    "type": "image/jpeg"
  }
}
```

#### Delete Profile Image
```http
DELETE /api/upload/profile-image
Authorization: Bearer <token>
```

#### Upload Product Images
```http
POST /api/upload/product-images
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- product_id: string (required)
- is_primary: boolean (optional)
- display_order: number (optional)
- image0: File
- image1: File
- image2: File (multiple images supported)
```

#### Delete Product Image
```http
DELETE /api/upload/product-images?image_id=123
Authorization: Bearer <token>
```

#### Upload Category Image/Icon (Admin Only)
```http
POST /api/admin/categories/upload-image
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data

Form Data:
- category_id: string
- type: "image" | "icon"
- file: File
```

#### Get User Profile Image
```http
GET /api/images/user/123
```
Returns binary image data (image/jpeg)

#### Get Product Image
```http
GET /api/images/product/456
```
Returns binary image data (image/jpeg)

#### Get Category Image/Icon
```http
GET /api/images/category/1?type=image
GET /api/images/category/1?type=icon
```
Returns binary image data (image/jpeg)

**Image Validation Rules**:
- Supported formats: JPEG, PNG, GIF, WebP
- Maximum file size: 1GB
- Images stored as LONGBLOB in database

**See**: [`BINARY_IMAGE_API.md`](./BINARY_IMAGE_API.md) for detailed documentation and examples.

---

### 💬 Messages

#### Send Message
```http
POST /api/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "product_id": 123,
  "receiver_id": 456,
  "message": "Is this available?"
}
```

#### Get Conversations
```http
GET /api/messages/conversations
Authorization: Bearer <token>
```

---

### ⭐ Reviews

#### Create Review
```http
POST /api/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "reviewed_user_id": 123,
  "product_id": 456,
  "rating": 5,
  "comment": "Great seller!"
}
```

---

### 🚩 Reports

#### Create Report
```http
POST /api/reports
Content-Type: application/json

{
  "product_id": 123, // or user_id
  "reason": "spam", // spam, fraud, inappropriate, duplicate, other
  "description": "Details..."
}
```

---

### 🚀 Boosts

#### Purchase Boost
```http
POST /api/boosts/purchase
Authorization: Bearer <token>
Content-Type: application/json

{
  "product_id": 123
}
```

#### Get Boost History
```http
GET /api/boosts/history
Authorization: Bearer <token>
```

---

### 💎 Subscriptions

#### Get Plans
```http
GET /api/subscriptions/plans
```

#### Subscribe
```http
POST /api/subscriptions/subscribe
Authorization: Bearer <token>
Content-Type: application/json

{
  "plan_id": 1
}
```

#### Get Current Subscription
```http
GET /api/subscriptions/current
Authorization: Bearer <token>
```

#### Cancel Subscription
```http
POST /api/subscriptions/cancel
Authorization: Bearer <token>
```

---

### 🎫 Support

#### Get Tickets
```http
GET /api/support/tickets?page=1
Authorization: Bearer <token>
```

#### Create Ticket
```http
POST /api/support/tickets
Authorization: Bearer <token>
Content-Type: application/json

{
  "category_id": 1,
  "subject": "Help needed",
  "message": "Issue details..."
}
```

#### Get Support Categories
```http
GET /api/support/categories
```

#### Contact Us (Public)
```http
POST /api/support/contact
Content-Type: application/json

{
  "name": "John",
  "email": "john@email.com",
  "subject": "Inquiry",
  "message": "Message..."
}
```

---

### 🔔 Notifications

#### Get Settings
```http
GET /api/notifications/settings
Authorization: Bearer <token>
```

#### Update Settings
```http
PUT /api/notifications/settings
Authorization: Bearer <token>
Content-Type: application/json

{
  "email_messages": true,
  "push_reviews": false
}
```

---

### 🛡️ Admin

#### Get Dashboard Stats
```http
GET /api/admin/stats
Authorization: Bearer <admin-token>
```

#### List Products (Admin)
```http
GET /api/admin/products?page=1&status=active
Authorization: Bearer <admin-token>
```
**Query Parameters**:
- `page`, `per_page`, `status`

#### Feature/Unfeature Product
```http
PUT /api/admin/products/123/feature
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "is_featured": true
}
```

#### Delete Product (Admin)
```http
DELETE /api/admin/products/123
Authorization: Bearer <admin-token>
```

#### List Users (Admin)
```http
GET /api/admin/users?page=1&search=john
Authorization: Bearer <admin-token>
```
**Query Parameters**:
- `page`, `per_page`, `search`

#### Update User (Admin)
```http
PUT /api/admin/users/123
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "role": "seller",
  "is_verified": true,
  "is_banned": false
}
```

#### Ban/Unban User
```http
POST /api/admin/users/123/ban
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "is_banned": true,
  "reason": "Violated terms"
}
```

#### List Reports
```http
GET /api/admin/reports?status=pending
Authorization: Bearer <admin-token>
```

#### Update Report Status
```http
PUT /api/admin/reports/1
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "resolved",
  "action": "Banned user"
}
```

#### Get Support Stats
```http
GET /api/support/stats
Authorization: Bearer <admin-token>
```

---

### 💎 Subscriptions

#### Get History
```http
GET /api/subscriptions/history
Authorization: Bearer <token>
```

---

---

## Response Format


### Success Response
```json
{
  "success": true,
  "message": "Optional message",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

---

## HTTP Status Codes

- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## Testing the API

You can test the API using:

1. **Browser**: Navigate to `http://localhost:3000/api`
2. **Postman/Insomnia**: Import and test endpoints
3. **cURL**:
```bash
curl http://localhost:3000/api/categories
```

---

## File Structure

```
app/api/
├── route.ts                        # API root documentation
├── auth/
│   ├── register/route.ts          # User registration
│   ├── login/route.ts             # User login
│   └── me/route.ts                # Current user info
├── products/
│   ├── route.ts                   # List & create products
│   └── [id]/route.ts              # Get, update, delete product
├── categories/
│   ├── route.ts                   # List categories
│   └── [id]/route.ts              # Get single category
├── locations/
│   ├── states/route.ts            # List states
│   └── cities/route.ts            # List cities
├── users/
│   ├── profile/route.ts           # Get/update profile
│   └── my-products/route.ts       # User's products
├── favorites/
│   ├── route.ts                   # List & add favorites
│   └── [id]/route.ts              # Remove favorite
├── messages/
│   ├── route.ts                   # Send message
│   ├── conversations/route.ts     # List conversations
│   └── [id]/route.ts              # Mark read / delete
├── reviews/
│   └── route.ts                   # Create review
├── reports/
│   └── route.ts                   # Create report
├── boosts/
│   ├── purchase/route.ts          # Purchase boost
│   └── history/route.ts           # Boost history
├── subscriptions/
│   ├── plans/route.ts             # List plans
│   ├── subscribe/route.ts         # Subscribe to plan
│   ├── current/route.ts           # Current subscription
│   ├── cancel/route.ts            # Cancel subscription
│   └── history/route.ts           # Subscription history
├── support/
│   ├── tickets/route.ts           # List & create tickets
│   ├── categories/route.ts        # Support categories
│   ├── contact/route.ts           # Public contact form
│   └── stats/route.ts             # Support stats
├── notifications/
│   └── settings/route.ts          # Notification settings
├── upload/
│   ├── profile-image/route.ts     # Upload/delete profile image
│   └── product-images/route.ts    # Upload/delete product images
├── images/
│   ├── user/[id]/route.ts         # Get user profile image
│   ├── product/[id]/route.ts      # Get product image
│   └── category/[id]/route.ts     # Get category image/icon
└── admin/
    ├── stats/route.ts             # Admin dashboard stats
    ├── categories/
    │   └── upload-image/route.ts  # Upload category images
    ├── products/
    │   ├── route.ts               # List products (admin view)
    │   └── [id]/route.ts          # Approve/Manage product
    ├── users/
    │   ├── route.ts               # List users
    │   └── [id]/route.ts          # Ban/Manage user
    └── reports/
        ├── route.ts               # List reports
        └── [id]/route.ts          # Resolve report
```

---

## Helper Libraries

### Database (`lib/db.ts`)
```typescript
import { query, queryOne } from '@/lib/db';

const users = await query('SELECT * FROM users');
const user = await queryOne('SELECT * FROM users WHERE id = ?', [1]);
```

### Authentication (`lib/auth.ts`)
```typescript
import { signToken, verifyToken, getUserFromRequest } from '@/lib/auth';

const token = signToken({ userId: 1, email: 'user@example.com', role: 'buyer' });
const payload = verifyToken(token);
const user = getUserFromRequest(request);
```

### API Responses (`lib/api-response.ts`)
```typescript
import { successResponse, errorResponse, paginatedResponse } from '@/lib/api-response';

return successResponse(data, 'Success message');
return errorResponse('Error message', 400);
return paginatedResponse(data, page, perPage, total);
```

---

## Notes

- All timestamps are in MySQL `DATETIME` format
- Images are stored as LONGBLOB binary data in the database (max 1GB per file)
- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- Database queries use prepared statements to prevent SQL injection
- Image retrieval endpoints include aggressive caching headers (1 year)

## Additional Resources

- [Binary Image API Guide](./BINARY_IMAGE_API.md) - Detailed image upload/retrieval documentation
- [Complete Database Schema](./complete_schema.sql) - Full database schema with LONGBLOB fields
