import FormField from '../../components/FormField.jsx'

function Membership() {
  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Membership request submitted. We will contact you soon.')
    event.target.reset()
  }

  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-title">Membership Request</h1>
        <p className="page-subtitle">
          Share your details and preferred plan. The mess admin will confirm your membership.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <FormField label="Full Name" id="name" required placeholder="Enter your full name" />
          <FormField label="Phone Number" id="phone" required placeholder="Enter your phone" />
          <FormField
            label="College / Institute"
            id="college"
            required
            placeholder="Your college or institute name"
          />
          <FormField
            label="Preferred Plan"
            id="plan"
            as="select"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select a plan
            </option>
            <option value="basic">Basic (Lunch Only)</option>
            <option value="standard">Standard (Lunch + Dinner)</option>
            <option value="premium">Premium (Full Access)</option>
          </FormField>
          <FormField
            label="Message (optional)"
            id="message"
            as="textarea"
            placeholder="Share any special requirements"
          />

          <button type="submit" className="btn btn-primary form-submit">
            Submit Request
          </button>
        </form>
      </div>
    </section>
  )
}

export default Membership

