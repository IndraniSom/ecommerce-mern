# Ecommerce MERN Platform

[![GitHub stars](https://img.shields.io/github/stars/IndraniSom/ecommerce-mern)](https://github.com/IndraniSom/ecommerce-mern/stargazers) [![Forks](https://img.shields.io/github/forks/IndraniSom/ecommerce-mern)](https://github.com/IndraniSom/ecommerce-mern/network/members)

## 🛒 Overview
Welcome to the **Ecommerce MERN Platform**, a **full-stack eCommerce application** built using the **MERN stack**. This project allows users to browse, add to cart, and securely purchase products while providing admins the ability to manage inventory and orders.

## 🚀 Features
- 🔑 User authentication (Register/Login) with JWT
- 🛍️ Browse and search products
- 🛒 Add to cart and checkout with Razorpay integration
- 📦 Order tracking and history
- 🎛️ Admin dashboard for managing products, orders, and users
- 📸 Cloudinary integration for product images
- 📄 Responsive UI with Tailwind CSS

## 🏗️ Tech Stack
- **Frontend:** Next.js (TypeScript), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Authentication:** JWT (JSON Web Token)
- **File Storage:** Cloudinary
- **Payments:** Razorpay

## 📂 Folder Structure
```
/ecommerce-mern
│── client/      # Frontend (Next.js, TypeScript)
│── server/      # Backend (Node.js, Express.js, MongoDB)
│── .gitignore
│── README.md
│── CONTRIBUTING.md
```

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/IndraniSom/ecommerce-mern.git
cd ecommerce-mern
```

### 2️⃣ Setup **Backend**
```sh
cd server
npm install
```

#### Configure `.env` for Backend
Create a `.env` file in the `server/` directory and add:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```
Run the backend server:
```sh
npm run dev
```

### 3️⃣ Setup **Frontend**
```sh
cd ../client
npm install
```

#### Configure `.env` for Frontend
Create a `.env.local` file in the `client/` directory and add:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_RAZORPAY_KEY=your_razorpay_key
```
Run the frontend server:
```sh
npm run dev
```

### 4️⃣ Open in Browser
Visit `http://localhost:3000` to view the application.

## 🤝 Contribution Guidelines
We welcome contributions! To get started:
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature-name`)
3. **Commit your changes** (`git commit -m 'Add feature'`)
4. **Push to your branch** (`git push origin feature-name`)
5. **Create a pull request**

For more details, check out the [CONTRIBUTING.md](./CONTRIBUTING.md).



---
⭐ **Star this repo** if you found it useful!
