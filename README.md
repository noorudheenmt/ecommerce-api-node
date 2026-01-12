# ECOMMERCE-API-NODE

A scalable and secure backend REST API built with Node.js and Express.js for an e-commerce platform. The API supports authentication, product management, wishlist, cart, orders, and payment workflows.

## FEATURES

- User authentication (Register, Login, Logout, Refresh Token)
- JWT-based authorization
- Product & category management
- Wishlist & cart functionality
- Order management
- Razorpay payment integration
- Image upload using Cloudinary
- Password reset via NodeMailer
- Clean error handling and validation
- Modular and scalable architecture
- File based logging

## TECH STACK

- Backend: Node.js, Express.js
- Database:MongoDB (Mongoose)
- Authentication: JWT (Access & Refresh Tokens)
- Payments: Razorpay
- Image Storage: Cloudinary
- Email Service: NodeMailer
- API Documentation: Postman

## API DOCUMENTATION (Postman)

Access the complete API documentation here:

https://documenter.getpostman.com/view/37582228/2sBXVfkBjm

## Environment Variables

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_HOST=smtp_host
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
