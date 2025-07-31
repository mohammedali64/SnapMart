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
git clone https://github.com/mohammedali64/SnapMart.git
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
<img width="1339" height="627" alt="image" src="https://github.com/user-attachments/assets/ae308432-b9f1-43a6-917e-aa6c7a27e42e" />
<img width="1334" height="623" alt="image" src="https://github.com/user-attachments/assets/bd1329cf-adac-47b3-8fc0-0eadc279b87b" />
<img width="1346" height="629" alt="image" src="https://github.com/user-attachments/assets/8cfbc633-892d-4837-9104-011fb1f311dd" />
<img width="1343" height="627" alt="image" src="https://github.com/user-attachments/assets/fb821a16-930b-4391-b819-3e2dd66742e0" />
<img width="1330" height="631" alt="image" src="https://github.com/user-attachments/assets/52f5c37d-0c5c-42c8-a9c0-43ce2a0daab5" />
<img width="1335" height="624" alt="image" src="https://github.com/user-attachments/assets/0dd98297-d9ca-4ba0-9028-8aade4d4bfb5" />
<img width="1288" height="562" alt="image" src="https://github.com/user-attachments/assets/baf2cb34-91d1-44a9-9192-d3abe82d2b88" />
<img width="816" height="443" alt="image" src="https://github.com/user-attachments/assets/e25a45b5-d857-4095-b77c-dae1a467d5ef" />
<img width="1284" height="540" alt="image" src="https://github.com/user-attachments/assets/804c499a-b196-4a04-bb6c-d07e5763f85a" />
<img width="1341" height="625" alt="image" src="https://github.com/user-attachments/assets/a075bbcc-5960-46ae-958d-bb6cc18cde18" />


### User Side
- Product Listing  
- Cart & Checkout  
- Orders Page with Status Tracking  

### Admin Side
- Manage Orders  
- Update Order Status in Real-Time  

<img width="1325" height="617" alt="image" src="https://github.com/user-attachments/assets/90570cfb-8a6d-4016-838c-3238b0f1a9d1" />
<img width="915" height="559" alt="image" src="https://github.com/user-attachments/assets/7acb09c2-8d1a-40db-bd89-ea7b09394c63" />
<img width="1309" height="598" alt="image" src="https://github.com/user-attachments/assets/671aeeff-cff2-45cb-bd06-0c45f6ae19d1" />
<img width="1297" height="599" alt="image" src="https://github.com/user-attachments/assets/7405c4d8-0f41-47fd-93c2-99b5adb48746" />
<img width="1257" height="618" alt="image" src="https://github.com/user-attachments/assets/fe915f77-06f7-4f88-a3c8-1821f5b9d311" />

#Note:This is a fast paced ui not a proper design. You can add ui on your own
#Note:There is also a way to manage categories in the code but I haven't put a button for that.
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

