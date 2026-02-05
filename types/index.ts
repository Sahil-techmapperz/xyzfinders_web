// User Types
export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    user_type: 'buyer' | 'seller' | 'admin';
    avatar?: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
}

// Product Types
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    original_price?: number;
    category_id: number;
    category?: Category;
    category_name?: string;  // Added for API responses
    user_id: number;
    seller?: User;
    location_id: number;
    location?: Location;
    city?: string;  // Added for API responses
    images: any[];  // Changed from string[] to match actual API response
    condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
    status: 'active' | 'sold' | 'inactive';
    is_featured: number | boolean;  // Support both API (number) and frontend (boolean)
    is_boosted: boolean;
    views_count: number;
    favorites_count: number;
    product_attributes?: any;  // JSON column for category-specific attributes
    created_at: string;
    updated_at: string;
}

// Category Types
export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    image?: string;
    parent_id?: number;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
}

// Location Types
export interface Location {
    id: number;
    city: string;
    state: string;
    country: string;
    created_at: string;
    updated_at: string;
}

// API Response Types
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        current_page: number;
        per_page: number;
        total: number;
        total_pages: number;
    };
}

// Auth Types
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    user_type: 'buyer' | 'seller';
}

export interface AuthResponse {
    user: User;
    token: string;
}

// Message Types
export interface Message {
    id: number;
    sender_id: number;
    sender?: User;
    receiver_id: number;
    receiver?: User;
    product_id?: number;
    product?: Product;
    message: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
}

// Review Types
export interface Review {
    id: number;
    reviewer_id: number;
    reviewer?: User;
    reviewee_id: number;
    reviewee?: User;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
}

// Subscription Types
export interface SubscriptionPlan {
    id: number;
    name: string;
    description: string;
    price: number;
    duration_days: number;
    features: string[];
    created_at: string;
    updated_at: string;
}

export interface Subscription {
    id: number;
    user_id: number;
    plan_id: number;
    plan?: SubscriptionPlan;
    start_date: string;
    end_date: string;
    status: 'active' | 'expired' | 'cancelled';
    created_at: string;
    updated_at: string;
}
