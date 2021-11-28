import axios from "axios";

const driversdataemailsURL = process.env.NODE_ENV === 'production'
  ? "api/v3/data"
  :  "http://localhost:3001/api/v3/data"
const fivestardriversinfosURL = process.env.NODE_ENV === 'production'
  ? "api/v4/data"
  :  "http://localhost:3001/api/v4/data"
const usersURL = process.env.NODE_ENV === 'production'
  ? "api/v5/data"
  :  "http://localhost:3001/api/v5/data"
const calendarsURL = process.env.NODE_ENV === 'production'
  ? "api/v11/data"
  :  "http://localhost:3001/api/v11/data"
const accountingsURL = process.env.NODE_ENV === 'production'
  ? "api/v12/data"
  :  "http://localhost:3001/api/v12/data"
const paymentrecordsURL = process.env.NODE_ENV === 'production'
  ? "api/v13/data"
  :  "http://localhost:3001/api/v13/data"
const clientapisURL = process.env.NODE_ENV === 'production'
  ? "api/v14/data"
  :  "http://localhost:3001/api/v14/data"

export default axios.create({
  driversdataemailsURL,
  fivestardriversinfosURL,
  usersURL,
  calendarsURL,
  accountingsURL,
  paymentrecordsURL,
  clientapisURL
});
