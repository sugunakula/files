import { Shield, Phone, Mail, Search } from "lucide-react";
import userLogo from "../assets/user_logo.svg";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings, CreditCard, FileText, DollarSign, BarChart3, Activity, ClipboardList } from "lucide-react";
import logo from "@/assets/loanmanage-logo.png";
import LoanCalculator from "@/components/LoanCalculator.jsx";
import "./JSHeader.css";

const JSHeader = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);
  // Check admin status from localStorage
  const isAdmin = !!localStorage.getItem('admin');

  const loanTypes = [
    {
      title: "Home Loans",
      description: "Competitive rates for your dream home",
      route: "/home-loans",
      keywords: ["home", "house", "mortgage", "property", "real estate"]
    },
    {
      title: "Vehicle Loans",
      description: "Auto loans for cars, trucks, and motorcycles",
      route: "/vehicle-loans",
      keywords: ["vehicle", "car", "auto", "truck", "motorcycle", "bike"]
    },
    {
      title: "Personal Loans",
      description: "Flexible personal loans for any need",
      route: "/personal-loans",
      keywords: ["personal", "individual", "emergency", "debt consolidation"]
    },
    {
      title: "Business Loans",
      description: "Fund your business growth and expansion",
      route: "/business-loans",
      keywords: ["business", "commercial", "startup", "entrepreneur", "company"]
    }
  ];

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Pure JavaScript navigation handler
  const handleNavClick = function(event, section) {
    event.preventDefault();
    console.log(`Navigating to: ${section}`);
    
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="header-topbar">
        <div className="header-topbar-content">
          <div className="header-topbar-left">
            <div className="header-topbar-item"></div>
            <div className="header-topbar-item"></div>
          </div>
          <div className="header-topbar-right"></div>
        </div>
      </div>
      {/* Main Navigation */}
      <div className="header-main">
        <div className="header-log">
          <a href="/" className="header-logo-link">
            <img src={logo} alt="LoanManage logo - loan management" className="header-logo-img"  />
            <span className="header-logo-title">LoanManage</span>
          </a>
        </div>
        <nav className="header-nav">
          <a href="#loans" className="header-nav-link" onClick={(e) => handleNavClick(e, 'loans')}>Loans</a>
          <a href="#about" className="header-nav-link" onClick={(e) => handleNavClick(e, 'about')}>About</a>
          <a href="#contact" className="header-nav-link" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          <div className="header-loan-calculator-dropdown-wrapper">
            <button className="header-loan-calculator-btn" onClick={() => setShowCalculator(true)}>
              Loan Calculator
            </button>
            {showCalculator && (
              <div className="header-loan-calculator-dropdown">
                <button className="close-calculator-btn" onClick={() => setShowCalculator(false)}>Close</button>
                <LoanCalculator />
              </div>
            )}
          </div>
        </nav>
        <div className="header-actions">
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            {}
            <PopoverContent className="header-search-content" align="end">
              <Command>
                <CommandInput placeholder="Search for loan types..." />
                <CommandList>
                  <CommandEmpty>No loan types found.</CommandEmpty>
                  <CommandGroup heading="Available Loan Types">
                    {loanTypes.map((loan) => (
                      <CommandItem
                        key={loan.route}
                        onSelect={() => {
                          navigate(loan.route);
                          setSearchOpen(false);
                        }}
                        className="header-search-item"
                      >
                        <div className="header-search-item-content">
                          <span className="header-search-item-title">{loan.title}</span>
                          <span className="header-search-item-description">{loan.description}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="header-avatar-button">
                  <img
                    src={user?.profileImage || userLogo}
                    alt="User Logo"
                    className="header-avatar"
                    style={{ borderRadius: "50%", width: "40px", height: "40px", objectFit: "cover" }}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="header-dropdown-content" align="end" forceMount>
                <DropdownMenuLabel className="header-dropdown-label">
                  <div className="header-dropdown-user-info">
                    <p className="header-dropdown-user-name">{user?.name}</p>
                    <p className="header-dropdown-user-email">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin ? (
                  <>
                    <DropdownMenuItem className="header-dropdown-item" onClick={() => navigate('/applied-loans')}>
                      <ClipboardList className="header-dropdown-icon" />
                      <span>Applied Loans</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="header-dropdown-item" onClick={() => navigate('/approve-kyc')}>
                      <Shield className="header-dropdown-icon" />
                      <span>Approve KYC</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="header-dropdown-item">
                      <LogOut className="header-dropdown-icon" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem className="header-dropdown-item" onClick={() => navigate('/profile')}>
                      <User className="header-dropdown-icon" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="header-dropdown-item" onClick={() => navigate('/repayment')}>
                      <CreditCard className="header-dropdown-icon" />
                      <span>Loan Repayment</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="header-dropdown-item">
                      <LogOut className="header-dropdown-icon" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <button 
                type="button"
                onClick={handleLoginClick}
                className="header-login-button"
              >
                Login
              </button>
              <button 
                type="button"
                onClick={handleRegisterClick}
                className="header-register-button"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default JSHeader;