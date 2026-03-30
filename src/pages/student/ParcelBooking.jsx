import { useState } from 'react'
import FormField from '../../components/FormField.jsx'
import api from '../../services/api.js'
import toast, { Toaster } from 'react-hot-toast'

function ParcelBooking() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    date: '',
    mealType: '',
    notes: '' // Optional notes can be used later or discarded if backend Schema doesn't support them currently
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await api.post('/student/parcel', {
        mealType: formData.mealType,
        orderDate: formData.date
      })
      toast.success('Parcel booked successfully!')
      setFormData({ date: '', mealType: '', notes: '' })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book parcel.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-section">
      <Toaster position="top-center" />
      <div className="page-container">
        <h1 className="page-title">Parcel Booking</h1>
        <p className="page-subtitle">
          Book a parcel for lunch or dinner. Your meal will be packed and ready to pick up.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <FormField 
            label="Date" 
            id="date" 
            type="date" 
            value={formData.date}
            onChange={handleChange}
            required 
          />
          <FormField
            label="Meal Type"
            id="mealType"
            as="select"
            value={formData.mealType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select meal
            </option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </FormField>
          <FormField
            label="Notes (optional)"
            id="notes"
            as="textarea"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special instructions?"
          />

          <button type="submit" className="btn btn-primary form-submit" disabled={loading}>
            {loading ? 'Booking...' : 'Book Parcel'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default ParcelBooking

