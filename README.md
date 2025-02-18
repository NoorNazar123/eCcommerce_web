Next.js + NestJS E-Commerce App

🚀 Overview
This is a full-stack eCommerce application built using Next.js (Frontend) and NestJS (Backend). It is optimized for scalability, performance, and production readiness, featuring a seamless user experience with authentication, product management, cart functionality, and order processing.

🛠️ Tech

Frontend (Next.js)
Next.js 15 (App Router) – Server-Side Rendering (SSR) & Static Site Generation (SSG)
React.js – Component-based UI
Tailwind CSS – Styling
Redux Toolkit – State Management
TypeScript – Static Typing
Axios – API Requests
Framer Motion –

Backend (NestJS)
NestJS – Modular Backend Framework
PostgreSQL – Database
Prisma – ORM for Database Management
passtportjs and JWT Authentication – User Authentication
Swagger – API Documentation
Docker – Containerization for

📁 Folder Structure

📦 src/
│── 📂 app/ # Next.js App Router (Page-Based Routing)
│ ├── 📂 dashboard/ # Admin Dashboard (Manage Orders, Products, Users)
│ │ ├── index.tsx # Dashboard Overview (Admin Home)
│ │ ├── orders.tsx # Manage Orders (View, Edit Orders)
│ │ ├── products.tsx # Manage Products (CRUD Operations on Products)
│ │ ├── users.tsx # Manage Users (User Profiles, Permissions)
│ │ ├── reports.tsx # View Sales Reports, Analytics
│ ├── 📂 root/ # User-Facing Pages (Auth, Products, Profile, Cart, Checkout)
│ │ ├── 📂 auth/ # Authentication Pages (Login, Signup, Forgot Password)
│ │ │ ├── login.tsx # Login page
│ │ │ ├── signup.tsx # Signup page
│ │ │ ├── forgot.tsx # Forgot Password page
|\_\_ verfity.tsx #verfied real user
│ │ ├── 📂 products/ # Product Pages (Listing, Details, Categories)
│ │ │ ├── index.tsx # Product Listing Page (All Products)
│ │ │ ├── [id].tsx # Dynamic Product Detail Page
│ │ │ ├── category/[slug].tsx # Product Categories Page (e.g., Electronics, Clothing)
│ │ ├── 📂 cart/ # Cart Pages (View Cart, Update Quantities)
│ │ │ ├── index.tsx # Cart Overview Page
│ │ │ ├── summary.tsx # Cart Summary (Price Breakdown, Apply Coupons)
│ │ ├── 📂 checkout/ # Checkout Pages (Shipping, Payment)
│ │ │ ├── index.tsx # Checkout page (Shipping details)
│ │ │ ├── shipping.tsx # Shipping Address Form
│ │ │ ├── payment.tsx # Payment Gateway Integration
│ │ ├── 📂 profile/ # User Profile Pages (View and Edit Profile)
│ │ │ ├── index.tsx # View Profile (User Information)
│ │ │ ├── edit.tsx # Edit Profile Information (Name, Email, Password)
│ │ ├── 📂 orders/ # User's Order History and Details
│ │ │ ├── index.tsx # Order History Page (Past Orders)
│ │ │ ├── [orderId].tsx # Order Details Page
│ ├── 📂 api/ # API Routes (Calling NestJS Backend)
│ │ ├── 📂 auth/ # Authentication API Calls (Login, Signup, Forgot Password)
│ │ │ ├── login.ts # Login API
│ │ │ ├── signup.ts # Signup API
│ │ │ ├── forgot.ts # Forgot Password API
│ │ ├── 📂 products/ # Product API Calls (CRUD for Products)
│ │ │ ├── index.ts # Fetch Products (Listing) <-- Calls NestJS API to fetch products
│ │ │ ├── [id].ts # Fetch Product by ID (Dynamic) <-- Calls NestJS API to fetch single product
│ │ ├── 📂 orders/ # Order API Calls (Place Order, Order History)
│ │ │ ├── create.ts # Create Order API <-- Interacts with NestJS to place orders
│ │ │ ├── history.ts # Order History API <-- Fetches user order history from NestJS
│ │ ├── 📂 cart/ # Cart API Calls (Add to Cart, Remove from Cart, Update Quantities)
│ │ ├── 📂 checkout/ # Checkout API (Payment, Shipping, etc.)
│ │ ├── 📂 payments/ # Payment API (Integrating with Payment Gateways)
│── 📂 components/ # Reusable UI Components
│ ├── 📂 ui/ # UI-Only Components (Buttons, Inputs, etc.)
│ │ ├── Button.tsx # Reusable button component
│ │ ├── Input.tsx # Reusable input component
│ │ ├── Select.tsx # Dropdown component for selecting options
│ ├── 📂 custom/ # Feature-Specific Custom Components (ProductCard, CartItem)
│ │ ├── ProductCard.tsx # Product display card component
│ │ ├── CartItem.tsx # Cart item display component
│ │ ├── ProductFilter.tsx # Filters for products (Category, Price, Rating, etc.)
│ ├── 📂 module/ # Larger Functional Modules (ProductList, CartSummary)
│ │ ├── ProductList.tsx # Displays list of products (with filter options)
│ │ ├── CartSummary.tsx # Shows cart summary, total price, and checkout button
│ │ ├── OrderHistory.tsx # Displays the history of customer orders
│ │ ├── ProductSearch.tsx # A search component for products
│ ├── 📂 layout/ # Layouts for pages (Navbar, Sidebar, Footer, etc.)
│ │ ├── MainLayout.tsx # Main layout for public-facing pages (Navbar, Footer, etc.)
│ │ ├── DashboardLayout.tsx # Layout for the Admin Dashboard (Sidebar, Navbar)
│── 📂 hooks/ # Custom React Hooks (useCart, useAuth, useProducts, etc.)
│ ├── useCart.ts # Custom hook for cart state management
│ ├── useProducts.ts # Custom hook to fetch products
│ ├── useAuth.ts # Custom hook for authentication logic
│ ├── useOrderHistory.ts # Custom hook for fetching user's order history
│── 📂 lib/ # Utility & Helper Functions
│ ├── calculateTotal.js # Helper function to calculate total cart value
│ ├── formatCurrency.js # Helper function to format price in currency
│ ├── fetchData.js # Utility for fetching data from API (calls NestJS API)
│ ├── validateEmail.js # Helper function to validate email format
│── 📂 store/ # State Management (ReduxToolkit)
│ ├── cartSlice.ts # Redux slice for managing cart state
│ ├── productSlice.ts # Redux slice for managing product data
│ ├── orderSlice.ts # Redux slice for managing orders
│ ├── authSlice.ts # Redux slice for managing user authentication
│ ├── checkoutSlice.ts # Redux slice for managing checkout process
│── 📂 public/ # Static Assets (Images, Icons)
│ ├── images/ # Product images, banners, etc.
│ ├── icons/ # Icons for UI (Cart, Heart, etc.)
│── 📂 styles/ # Global Styles (Tailwind, SCSS)
│ ├── tailwind.config.js # Tailwind configuration file
│ ├── global.scss # Global styles (e.g., typography, colors)
│ ├── components.scss # Component-specific SCSS (e.g., buttons, cards)
│── 📂 config/ # Config Files (API Keys, Env)
│ ├── env.js # Environment variables (e.g., API keys, secret keys)
│ ├── config.js # App-specific configurations (Stripe, PayPal API Keys, etc.)
│── 📂 tests/ # Unit & Integration Tests
│ ├── product.test.js # Tests for product API and UI components
│ ├── cart.test.js # Tests for cart API and UI components
│ ├── checkout.test.js # Tests for checkout and payment flow
│ ├── cypress/ # End-to-End Testing with Cypress
│ │ ├── cart.spec.js # Test cart functionality in the UI
│ │ ├── checkout.spec.js # Test checkout and payment functionality
│── 📂 documentation/ # Project Documentation
│ ├── setup.md # Instructions on setting up the project
│ ├── architecture.md # Overview of the app architecture
│ ├── api.md # API Documentation (e.g., API calls, endpoints)
│ ├── changelog.md # Changelog for each version of the app
│ ├── contributing.md # Guide for contributors

📦 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app

2️⃣ Install Dependencies

# Install frontend dependencies

npm install
3️⃣ Set Up Environment Variables
Create a .env.local file in the root directory and add the necessary configurations:
env

NEXT_PUBLIC_API_URL=http://localhost:8080/
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
4️⃣ Run the Application

npm run dev
Open http://localhost:3000 in your browser.

🚀 Features
✅ Authentication System (Login, Signup, JWT, Session Handling)
✅ Product Management (Fetch, Display, Filter, Search)
✅ Cart Functionality (Add to Cart, Remove Items)
✅ Checkout & Payments (Stripe Integration)
✅ Admin Dashboard (Manage Users, Orders, Products)
✅ Optimized Performance (SSR, ISR, Lazy Loading)

📜 API Integration (NestJS)
This frontend interacts with the NestJS API backend, which includes:

Product Endpoints:

GET /api/products → Fetch all products
GET /api/products/:id → Fetch a single product
Authentication Endpoints:

POST /api/auth/login → User authentication
Order Endpoints:

POST /api/orders → Place an order
User Endpoints:

GET /api/users/profile → Fetch user profile
For complete API reference, visit the NestJS API Documentation.

📢 Contributing
Fork the repository
Create a new feature branch:

git checkout -b feature-name
Commit your changes:

git commit -m "Added new feature"
Push to GitHub:

git push origin feature-name
Submit a Pull Request 🚀
⚡ Deployment
Frontend (Vercel)
vercel --prod

Backend (Docker & Render / Railway / AWS EC2 / koyeb)
Docker Compose:

docker-compose up -d
Railway:
Deploy using Railway CLI
📚 Next.js Quick Start
This is a Next.js project bootstrapped with create-next-app.

Getting Started
Run the development server:

npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev
Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.
