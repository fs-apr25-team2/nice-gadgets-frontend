# Nice Gadgets Store

A modern **responsive online gadget store**, developed by **Team Not Found** as part of the full-stack course.  
The app provides a smooth shopping experience with features like **home page sliders**, **catalog with filtering**, **detailed product pages with suggestions**, **shopping cart and checkout**, **favorites**, **user authentication**, and **language & theme switching** — all built with a **mobile-first approach**.

[Live Demo on Netlify](https://nice-gadgets-frontend.netlify.app/#/)

## Features

✔ **User Authentication** (Firebase) – Sign up, Login, Logout.
✔ **Home Page** – Sliders for promotions and deals, plus a Shop by Category section  
✔ **Catalog** – Browse products by categories with filtering and pagination  
✔ **Product Page** – Detailed view with images, descriptions, add to cart and favorites + Suggested products slider
✔ **Shopping Cart** – Add/remove items, persistent state  
✔ **Checkout** – Secure order processing with form validation  
✔ **Favorites** – Save and manage favorite products  
✔ **Language Switcher** – English / Ukrainian  
✔ **Theme Switcher** – Light & Dark modes  
✔ **Responsive Layout** – Mobile-first design

---

## Tech Stack

- **React + TypeScript** – The core of the application
- **React Router** – For navigation on pages
- **React Hook Form** – For login and registration with validation
- **Firebase Authentication** – Securing user management with sign-up, login and logout
- **SCSS (Sass)** – Styling with variables and mixins
- **Radix UI** – Modals, dropdowns and checkout
- **i18next** – Multi-language support (EN / UA)
- **localStorage** – Storing user data, cart, favorites, theme, and language
- **React Toastify** - User action notifications
- **Custom Hooks** – Reusable business logic
- **Mobile-First design** – For full responsiveness

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/fs-apr25-team2/nice-gadgets-frontend.git
cd nice-gadgets-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a .env file in root of project and add your Firebase credentials:

```
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

### 4. Run the project

```bash
npm run dev
```

## Deployment

The project is deployed on Netlify:
👉 [Live Demo](nice-gadgets-frontend.netlify.app/)
