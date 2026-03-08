import FormField from '../../components/FormField.jsx'

function ParcelBooking() {
  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Parcel booked successfully!')
    event.target.reset()
  }

  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-title">Parcel Booking</h1>
        <p className="page-subtitle">
          Book a parcel for lunch or dinner. Your meal will be packed and ready to pick up.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <FormField label="Date" id="date" type="date" required />
          <FormField
            label="Meal Type"
            id="mealType"
            as="select"
            defaultValue=""
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
            placeholder="Any special instructions?"
          />

          <button type="submit" className="btn btn-primary form-submit">
            Book Parcel
          </button>
        </form>
      </div>
    </section>
  )
}

export default ParcelBooking

