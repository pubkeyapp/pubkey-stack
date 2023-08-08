import axios from 'axios'
import { getApiUrl } from './get-api.url'

module.exports = async function () {
  // Configure axios for tests to use.
  axios.defaults.baseURL = getApiUrl()
}
