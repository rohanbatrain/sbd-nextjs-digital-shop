import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const endpoints = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
    },
    // ✅ Shop REST API endpoints - BACKEND IMPLEMENTED
    // All endpoints are now available and fully functional
    shop: {
        items: '/shop/items',                    // ✅ Browse shop items with filters
        categories: '/shop/categories',          // ✅ Get shop categories
        item: (id: string, type: string) => `/shop/items/${id}?item_type=${type}`, // ✅ Get item details
        purchase: '/shop/purchase',              // ✅ Direct purchase (legacy)
    },
    cart: {
        get: '/shop/cart',                       // ✅ Get cart contents
        add: '/shop/cart/add',                   // ✅ Add item to cart
        remove: '/shop/cart/remove',             // ✅ Remove item from cart
        clear: '/shop/cart/clear',               // ✅ Clear cart
        checkout: '/shop/cart/checkout',         // ✅ Checkout cart
    },
    inventory: {
        list: '/shop/inventory',                 // ✅ Get user's inventory
        owned: '/shop/owned',                    // ✅ Get owned items (alias)
        use: (id: string) => `/shop/inventory/${id}/use`, // ✅ Use/activate item
    },
    // SBD token balance - use shop endpoint
    balance: '/shop/balance',                    // ✅ Get SBD token balance
    tokens: {
        balance: '/sbd-tokens/balance',
        transfer: '/sbd-tokens/send',
        transactions: '/sbd-tokens/transactions',
    },
};
