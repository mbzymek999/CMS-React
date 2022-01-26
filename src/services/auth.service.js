import axios from "axios";
import authHeader from "./auth-header";
import globalUrl from "../state/globalUrl";

const API_URL = `${globalUrl().url}/api/auth/`;

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

  registerEmployee(username, name, lastName, pesel, position, phone, street, streetNumber, buildingNumber, city, postcode, email, assignedDate, agreementType, dateFrom, dateTo, salary, bankAccount, password) {
    return axios.post(`${globalUrl().url}/create/agreement`, {
      username,
      name,
      lastName,
      pesel,
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
      bankAccount,
      password,
    }, { headers: authHeader() });
  }
}

export default new AuthService();
