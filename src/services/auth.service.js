import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, companyName, shortCompanyName, nip, regon, representativePerson, phone, street, streetNumber, buildingNumber, city, postcode, province, country, additionalFields, maxEmployees, email, password) {
    return axios.post(API_URL + "signup/company", {
      username,
      companyName,
      shortCompanyName,
      nip,
      regon,
      representativePerson,
      phone,
      street,
      streetNumber,
      buildingNumber,
      city,
      postcode,
      province,
      country,
      additionalFields,
      maxEmployees,
      email,
      password,
    }, { headers: authHeader() });
  }

  registerEmployee(username, name, lastName, position, phone, street, streetNumber, buildingNumber, city, postcode, email, assignedDate, agreementType, dateFrom, dateTo, salary, password) {
    return axios.post("http://localhost:8080/create/agreement", {
      username,
      name,
      lastName,
      position,
      phone,
      street,
      streetNumber,
      buildingNumber,
      city,
      postcode,
      email,
      assignedDate,
      agreementType,
      dateFrom,
      dateTo,
      salary,
      password,
    }, { headers: authHeader() });
  }
}

export default new AuthService();
