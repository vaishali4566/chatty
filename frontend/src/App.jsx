import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

// my-app/
// ├── public/
// │   └── index.html
// ├── src/
// │
// ├── api/                      # ✅ API base + auth API calls
// │   └── auth.js
// │
// ├── assets/                   # Images, icons, logos
// │   └── logo.png
// │
// ├── components/               # Reusable UI components
// │   ├── Input.jsx
// │   ├── Button.jsx
// │   └── ProtectedRoute.jsx    # ✅ Wrapper for private routes
// │
// ├── constants/                # Constants like API endpoints
// │   └── urls.js
// │
// ├── context/                  # ✅ Auth context (global auth state)
// │   └── AuthContext.jsx
// │
// ├── hooks/                    # Custom hooks (e.g., useAuth)
// │   └── useAuth.js
// │
// ├── layouts/                  # Layouts (e.g., AuthLayout, AppLayout)
// │   └── AuthLayout.jsx
// │
// ├── pages/                    # Page-level components
// │   ├── Login.jsx
// │   ├── Signup.jsx
// │   └── Dashboard.jsx         # Example private page
// │
// ├── routes/                   # ✅ Route definitions
// │   └── AppRoutes.jsx
// │
// ├── utils/                    # Helper functions (e.g., token utils)
// │   ├── token.js
// │   └── validators.js
// │
// ├── App.js                    # Root app component
// ├── index.js                  # Entry point
// ├── .env
// └── package.json
