import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeSidebar = () => setIsOpen(false)

  return (
    <>
      <button
        type="button"
        className="sidebar-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        ☰ Admin Menu
      </button>

      {isOpen ? (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close admin menu"
          onClick={closeSidebar}
        />
      ) : null}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <h2 className="sidebar-title">Admin Panel</h2>
        <nav className="sidebar-nav">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
            onClick={closeSidebar}
          >
            Dashboard
          </NavLink>

          {/* 👇 MOVED HERE */}
          <NavLink
            to="/admin/tiffin"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
            onClick={closeSidebar}
          >
            Tiffin Tracking
          </NavLink>

          <NavLink
            to="/admin/students"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
            onClick={closeSidebar}
          >
            Student Management
          </NavLink>

          <NavLink
            to="/admin/menu"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
            onClick={closeSidebar}
          >
            Menu Management
          </NavLink>

          <NavLink
            to="/admin/billing"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
            onClick={closeSidebar}
          >
            Billing
          </NavLink>

          <NavLink
            to="/admin/parcels"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
            onClick={closeSidebar}
          >
            Parcel Orders
          </NavLink>

          <NavLink
            to="/admin/feedbacks"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
            onClick={closeSidebar}
          >
            Feedback Management
          </NavLink>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar

