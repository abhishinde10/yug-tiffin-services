import Sidebar from '../../components/Sidebar.jsx'
import FormField from '../../components/FormField.jsx'

function MenuManagement() {
  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Menu updated for the selected date.')
    event.target.reset()
  }

  return (
    <section className="page-section" style={{ paddingTop: '2rem' }}>
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <h1 className="dashboard-title">Menu Management</h1>
          <p className="page-subtitle">Update daily lunch and dinner menus.</p>

          <form onSubmit={handleSubmit} className="form">
            <FormField label="Date" id="menuDate" type="date" required />
            <FormField
              label="Lunch Menu"
              id="lunchMenu"
              as="textarea"
              placeholder="Example: 4 Roti, Dal, Rice, Sabji, Salad"
              required
            />
            <FormField
              label="Dinner Menu"
              id="dinnerMenu"
              as="textarea"
              placeholder="Example: 4 Chapati, Paneer, Jeera Rice, Dal, Papad"
              required
            />
            <button type="submit" className="btn btn-primary form-submit">
              Save Menu
            </button>
          </form>
        </main>
      </div>
    </section>
  )
}

export default MenuManagement

