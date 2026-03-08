import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Menu from './pages/Menu.jsx'
import Pricing from './pages/Pricing.jsx'
import Contact from './pages/Contact.jsx'

import StudentLogin from './pages/student/StudentLogin.jsx'
import StudentDashboard from './pages/student/StudentDashboard.jsx'
import ParcelBooking from './pages/student/ParcelBooking.jsx'
import PaymentStatus from './pages/student/PaymentStatus.jsx'
import Membership from './pages/student/Membership.jsx'

import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import StudentManagement from './pages/admin/StudentManagement.jsx'
import MenuManagement from './pages/admin/MenuManagement.jsx'
import BillingManagement from './pages/admin/BillingManagement.jsx'
import ParcelOrders from './pages/admin/ParcelOrders.jsx'

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-content">
        <Routes>
          {/* Public marketing pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />

          {/* Student routes */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/parcel-booking" element={<ParcelBooking />} />
          <Route path="/student/payment-status" element={<PaymentStatus />} />
          <Route path="/student/membership" element={<Membership />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<StudentManagement />} />
          <Route path="/admin/menu" element={<MenuManagement />} />
          <Route path="/admin/billing" element={<BillingManagement />} />
          <Route path="/admin/parcels" element={<ParcelOrders />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
