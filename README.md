# SnapMart – E-Commerce Web Application

SnapMart is a **full-stack MERN-like e-commerce platform** built with **React (frontend)** and **Firebase (backend)**. It provides a seamless shopping experience for users while giving administrators full control over order management in real time.

---

## 🚀 Features

### **User Side**
- **Authentication (Firebase Auth)**
  - Sign up / Login with email & password
- **Product Browsing**
  - Display products with images, price, and details
  - Responsive design using Tailwind CSS
- **Cart Management**
  - Add/remove products from cart
  - Update quantities dynamically
- **Checkout**
  - Place orders with real-time storage in Firebase
  - Multiple payment methods (Cash on Delivery, Online)
- **Order History**
  - View placed orders with timeline and statuses (Processing, Shipped, Delivered)
- **Real-Time Order Updates**
  - Orders update instantly when admin changes status

### **Admin Side**
- **Manage Orders**
  - Fetch all users’ orders
  - Group orders by user
  - Update order statuses (Processing → Shipped → Delivered) in real-time
- **Real-Time Dashboard**
  - Automatic updates using Firebase `onValue` subscriptions

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js** – Component-based UI
- **Redux Toolkit** – State management
- **Tailwind CSS** – Styling and responsiveness

### **Backend & Database**
- **Firebase Realtime Database** – Store products, cart, and orders
- **Firebase Authentication** – User login and session management

### **Other Tools**
- **Vite / CRA** – Build tool (depending on setup)
- **Git & GitHub** – Version control

---

## 📂 Folder Structure

```
SnapMart/
│── admin/                # Admin dashboard (React)
│── user/                 # User-facing e-commerce app
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page-level components
│   │   ├── store/        # Redux slices
│   │   ├── Services/     # Firebase & API services
│   │   └── App.jsx
│── firebaseConfig.js     # Firebase setup
│── package.json
│── tailwind.config.js
│── README.md
```

---

## ⚡ Getting Started

### **Prerequisites**
- Node.js (v16+ recommended)
- Firebase project (Realtime Database + Auth enabled)
- Git

---

### **Installation**

#### 1. Clone the repository
```bash
git clone https://github.com/your-username/SnapMart.git
cd SnapMart
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Configure Firebase
- Copy your Firebase project credentials from Firebase console.
- Replace the details inside `firebaseConfig.js`:

```javascript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

#### 4. Run the app
```bash
npm run dev
```

---

## 🌟 Screenshots

### User Side
- Product Listing  
- Cart & Checkout  
- Orders Page with Status Tracking  

### Admin Side
- Manage Orders  
- Update Order Status in Real-Time  

(Add screenshots here after hosting)

---

## 🚀 Deployment

- Can be deployed easily on **Vercel**, **Netlify**, or **Firebase Hosting**:
```bash
npm run build
```

---

## 🔥 Key Highlights

- Real-time order management system
- Separate **user** and **admin** panels
- Scalable Firebase structure
- Clean state management using Redux Toolkit
- Responsive design with Tailwind

---

## 📈 Future Improvements

- Add product categories & search
- Implement payment gateway (Razorpay / Stripe)
- Improve UI/UX with animations & transitions
- Add admin analytics dashboard

---

## 🤝 Contributing

Contributions are welcome!  
Fork this repo and submit a PR with your changes.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Mohammed Ali**  
[GitHub](https://github.com/mohammedali64)

---

