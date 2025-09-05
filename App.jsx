import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound";
import HomeLoans from "./pages/HomeLoans.jsx";
import Kyc from "./pages/KycApplication.jsx";
import LoanCalculator from "@/components/LoanCalculator.jsx";
import AllCustomers from "./pages/AllCustomers.jsx";
import VehicleLoans from "./pages/VehicleLoans.jsx";
import PersonalLoans from "./pages/PersonalLoans.jsx";
import UserPro from "./pages/UserPro.jsx";
import BusinessLoans from "./pages/BusinessLoans.jsx";
import AppliedLoans from "./pages/AppliedLoans.jsx";
import KycApplication from "./pages/KycApplication.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Repayment from "./pages/Repayment.jsx";

const queryClient = new QueryClient();

const App = function() {
  return (
    <QueryClientProvider client={queryClient}>
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home-loans" element={<HomeLoans />} />
            <Route path="/home-loans/calculator" element={<HomeLoans />} />
            <Route path="/vehicle-loans" element={<VehicleLoans />} />
            <Route path="/vehicle-loans/calculator" element={<VehicleLoans />} />
            <Route path="/personal-loans" element={<PersonalLoans />} />
            <Route path="/profile" element={<UserPro />} />
            <Route path="/kyc" element={<Kyc />} />
            <Route path="/loan-calculator" element={<LoanCalculator />} />
            <Route path="/personal-loans/calculator" element={<PersonalLoans />} />
            <Route path="/business-loans" element={<BusinessLoans />} />
            <Route path="/business-loans/calculator" element={<BusinessLoans />} />
            <Route path="/applied-loans" element={<AppliedLoans />} />
            <Route path="/approve-kyc" element={<KycApplication />} />
            <Route path="/all-customers" element={<AllCustomers />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/repayment" element={<Repayment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      {/* </TooltipProvider> */}
    </QueryClientProvider>
  );
};

export default App;