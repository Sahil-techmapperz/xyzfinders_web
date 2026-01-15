# Binary Image Storage API Guide

Complete guide for uploading and retrieving images using the binary storage system.

---

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Upload Endpoints

### 1. Upload Profile Image

Upload or update a user's profile image.

**Endpoint:** `POST /api/upload/profile-image`

**Authentication:** Required (User must be logged in)

**Content-Type:** `multipart/form-data`

**Request Body:**
```
image: File (JPEG, PNG, GIF, WebP - max 1GB)
```

**Example (cURL):**
```bash
curl -X POST http://localhost:3000/api/upload/profile-image \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -F "image=@profile-photo.jpg"
```

**Example (JavaScript/Fetch):**
```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

const response = await fetch('/api/upload/profile-image', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});

const result = await response.json();
console.log(result);
```

**Success Response (200):**
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

**Error Response (400):**
```json
{
  "success": false,
  "error": "Image size exceeds 1GB limit"
}
```

---

### 2. Delete Profile Image

Remove a user's profile image.

**Endpoint:** `DELETE /api/upload/profile-image`

**Authentication:** Required

**Example:**
```javascript
const response = await fetch('/api/upload/profile-image', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Profile image deleted successfully"
  }
}
```

---

### 3. Upload Product Images

Upload one or multiple images for a product.

**Endpoint:** `POST /api/upload/product-images`

**Authentication:** Required (User must own the product)

**Content-Type:** `multipart/form-data`

**Request Body:**
```
product_id: string (required)
is_primary: boolean (optional, default: false)
display_order: number (optional, default: 0)
image0: File (required)
image1: File (optional)
image2: File (optional)
... (multiple images supported)
```

**Example (Multiple Images):**
```javascript
const formData = new FormData();
formData.append('product_id', '123');
formData.append('is_primary', 'true');
formData.append('display_order', '0');
formData.append('image0', file1);
formData.append('image1', file2);
formData.append('image2', file3);

const response = await fetch('/api/upload/product-images', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "3 image(s) uploaded successfully",
    "images": [
      {
        "size": 345678,
        "type": "image/jpeg",
        "display_order": 0
      },
      {
        "size": 298765,
        "type": "image/png",
        "display_order": 1
      },
      {
        "size": 412389,
        "type": "image/jpeg",
        "display_order": 2
      }
    ]
  }
}
```

---

### 4. Delete Product Image

Delete a specific product image.

**Endpoint:** `DELETE /api/upload/product-images?image_id={id}`

**Authentication:** Required (User must own the product)

**Query Parameters:**
- `image_id` (required): The ID of the image to delete

**Example:**
```javascript
const response = await fetch('/api/upload/product-images?image_id=456', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Product image deleted successfully"
  }
}
```

---

### 5. Upload Category Image/Icon (Admin Only)

Upload images or icons for categories.

**Endpoint:** `POST /api/admin/categories/upload-image`

**Authentication:** Required (Admin role)

**Content-Type:** `multipart/form-data`

**Request Body:**
```
category_id: string (required)
type: "image" | "icon" (required)
file: File (required)
```

**Example:**
```javascript
const formData = new FormData();
formData.append('category_id', '5');
formData.append('type', 'image');
formData.append('file', categoryImageFile);

const response = await fetch('/api/admin/categories/upload-image', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${adminToken}`
  },
  body: formData
});
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Category image uploaded successfully",
    "size": 156789,
    "type": "image/png"
  }
}
```

---

## Retrieval Endpoints

### 1. Get User Profile Image

Retrieve a user's profile image as binary data.

**Endpoint:** `GET /api/images/user/{user_id}`

**Authentication:** Not required (public)

**Response:** Binary image data

**Content-Type:** `image/jpeg`

**Cache-Control:** `public, max-age=31536000`

**Example (HTML):**
```html
<img src="/api/images/user/123" alt="User Profile" />
```

**Example (JavaScript):**
```javascript
const imageUrl = `/api/images/user/${userId}`;
const img = document.createElement('img');
img.src = imageUrl;
document.body.appendChild(img);
```

---

### 2. Get Product Image

Retrieve a product image by image ID.

**Endpoint:** `GET /api/images/product/{image_id}`

**Authentication:** Not required (public)

**Response:** Binary image data

**Example:**
```html
<img src="/api/images/product/789" alt="Product" />
```

---

### 3. Get Category Image/Icon

Retrieve a category's image or icon.

**Endpoint:** `GET /api/images/category/{category_id}?type={image|icon}`

**Authentication:** Not required (public)

**Query Parameters:**
- `type` (optional, default: "image"): Either "image" or "icon"

**Examples:**
```html
<!-- Category banner image -->
<img src="/api/images/category/1?type=image" alt="Category" />

<!-- Category icon -->
<img src="/api/images/category/1?type=icon" alt="Category Icon" />
```

---

## Image Validation Rules

### Supported Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### Size Limits
- **Maximum file size:** 1GB (1024 MB)
- **Recommended sizes:**
  - Profile images: 500x500 to 1000x1000 pixels
  - Product images: 800x800 to 2000x2000 pixels
  - Category banners: 1200x400 to 1920x600 pixels
  - Category icons: 100x100 to 512x512 pixels

---

## Complete Upload Example (React Component)

```javascript
import { useState } from 'react';

function ProfileImageUpload({ token }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validate file size (1GB = 1073741824 bytes)
    if (file.size > 1073741824) {
      setError('File size must be less than 1GB');
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Use JPEG, PNG, GIF, or WebP');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload/profile-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        console.log('Upload successful!', result.data);
        // Refresh profile image
        window.location.reload();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}
```

---

## Performance Tips

### 1. Image Optimization
Before uploading, consider optimizing images:
- Compress images to reduce file size
- Use appropriate dimensions for the use case
- Convert to WebP format for better compression

### 2. Caching
The retrieval endpoints set aggressive cache headers. Once an image is uploaded:
- Browsers will cache it for 1 year
- To force refresh, append a query parameter: `/api/images/user/123?v=2`

### 3. Lazy Loading
Use lazy loading for product images:
```html
<img src="/api/images/product/789" loading="lazy" alt="Product" />
```

---

## Error Codes

| Status Code | Meaning |
|------------|---------|
| 200 | Success |
| 400 | Bad Request (validation failed, missing parameters) |
| 401 | Unauthorized (missing or invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found (resource doesn't exist) |
| 500 | Internal Server Error |

---

## Security Considerations

1. **File Validation**: Always validate file types and sizes on both client and server
2. **Authentication**: Upload endpoints require authentication
3. **Authorization**: Users can only upload images for their own resources
4. **Admin Only**: Category uploads are restricted to admin users
5. **XSS Protection**: Images are served with proper Content-Type headers
