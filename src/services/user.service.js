import axios from "axios";
import authHeader from "./auth-header";
import globalUrl from "../state/globalUrl";

const API_URL = `${globalUrl().url}/api/test/`;
class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getCompanyBoard() {
    return axios.get(API_URL + "company", { headers: authHeader() });
  }

  getEmployeeBoard() {
    return axios.get(API_URL + "employee", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
