import { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAdmin = localStorage.getItem('admin');
    if (savedAdmin) {
      const adminData = JSON.parse(savedAdmin);
      setUser(adminData);
      setIsAuthenticated(true);
    } else if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

//   const login = async (username, password) => {
//   // Frontend validation
//   const emailPattern = /^[^\s@]+@gmail\.com$/;
//   const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}:;'<>.,?\-]).+$/;

//   if (!emailPattern.test(username)) {
//     alert("Enter a valid Gmail address.");
//     return { success: false, message: "Enter a valid Gmail address." };
//   }

//   if (!passwordPattern.test(password)) {
//     alert("Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.");
//     return {
//       success: false,
//       message:
//         "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
//     };
//   }

//   try {
//     // Attempt regular user login
//     const response = await axios.post("http://localhost:8080/api/auth/signin", {
//       email: username,
//       password: password,
//     });

//     if (response.data && response.data.user) {
//       const userData = { ...response.data.user };
//       delete userData.password;
//       setUser(userData);
//       setIsAuthenticated(true);
//       localStorage.setItem("user", JSON.stringify(userData));
//       // Fetch and store customer data after successful login
//       try {
//         const customerRes = await axios.put("http://localhost:8080/api/customers/find", {
//           email: userData.email,
//         });
//         if (customerRes.data && customerRes.data.email) {
//           localStorage.setItem('customer', JSON.stringify(customerRes.data));
//         }
//       } catch (err) {
//         // Optionally handle error, e.g. log or ignore
//       }
//       // alert("login successful!");
//       return { success: true };
//     }

//     // Attempt admin login
//     const adminResponse = await axios.post("http://localhost:8080/api/auth/admin/adminsignin", {
//       email: username,
//       password: password,
//     });

//     const adminData = adminResponse.data.admin;
//     if (adminResponse.data && adminData) {
//       delete adminData.password;
//       setUser(adminData);
//       setIsAuthenticated(true);
//       alert("Admin login successful!");
//       localStorage.setItem("admin", JSON.stringify(adminData));
      
//       return { success: true, isAdmin: true };
//     }

//     // setErrors("Invalid credentials. Please check your email and password.");
//     return { success: false, message: "Invalid credentials" };
//   } catch (error) {
//     console.error("Login error:", error);
//     alert(error.response?.data?.message || "Login failed");
//     return {
//       success: false,
//       message: error.response?.data?.message || "Login failed",
//     };
//   }
// };

const login = async (username, password) => {
  // Frontend validation
  const emailPattern = /^[^\s@]+@gmail\.com$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}:;'<>.,?\-]).+$/;

  if (!emailPattern.test(username)) {
    alert("Enter a valid Gmail address.");
    return { success: false, message: "Enter a valid Gmail address." };
  }

  if (!passwordPattern.test(password)) {
    alert("Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.");
    return {
      success: false,
      message: "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
    };
  }

  try {
    // Attempt login
    const response = await axios.post("http://localhost:8085/api/auth/signin", {
      email: username,
      password: password,
    });

    const data = response.data;

    if (data.user) {
      const userData = { ...data.user };
      delete userData.password;

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("role", "USER");

      // Fetch customer data only for users
      try {
        const customerRes = await axios.put("http://localhost:8085/api/customers/find", {
          email: userData.email,
        });

        if (customerRes.data && customerRes.data.email) {
          localStorage.setItem("customer", JSON.stringify(customerRes.data));
        }
      } catch (err) {
        console.warn("Customer fetch failed:", err);
      }

      return { success: true, isAdmin: false };
    }

    if (data.admin) {
      const adminData = { ...data.admin };
      delete adminData.password;

      setUser(adminData);
      setIsAuthenticated(true);
      localStorage.setItem("admin", JSON.stringify(adminData));
      localStorage.setItem("role", "ADMIN");

      alert("Admin login successful!");
      return { success: true, isAdmin: true };
    }

    // If neither user nor admin found
    alert("Invalid login credentials.");
    return { success: false, message: "Invalid login credentials." };

  } catch (error) {
    console.error("Login error:", error);
    alert(error.response?.data?.message || "Login failed");
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.clear(); // Remove all localStorage data on logout
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    loading,
  };

  if (loading) return null; // Prevent rendering until user is restored

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
