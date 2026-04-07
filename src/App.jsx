import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { Toaster } from 'react-hot-toast'

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

import AdminLayout from './layout/AdminLayout.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import StudentManagement from './pages/admin/StudentManagement.jsx'
import MenuManagement from './pages/admin/MenuManagement.jsx'
import BillingManagement from './pages/admin/BillingManagement.jsx'
import ParcelOrders from './pages/admin/ParcelOrders.jsx'
import FeedbackManagement from './pages/admin/FeedbackManagement.jsx'
import TiffinManagement from './pages/admin/TiffinManagement.jsx'

function App() {
  return (
    <div className="app-shell">
      <Toaster position="top-center" />
      <Navbar />

      <div className="app-content">
        <Routes>
          {/* Public marketing pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />

          {/* Login routes */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Student Protected Routes */}
          <Route element={<ProtectedRoute allowedRole="student" />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/parcel-booking" element={<ParcelBooking />} />
            <Route path="/student/payment-status" element={<PaymentStatus />} />
            <Route path="/student/membership" element={<Membership />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="students" element={<StudentManagement />} />
              <Route path="menu" element={<MenuManagement />} />
              <Route path="billing" element={<BillingManagement />} />
              <Route path="parcels" element={<ParcelOrders />} />
              <Route path="feedbacks" element={<FeedbackManagement />} />
              <Route path="tiffin" element={<TiffinManagement />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
