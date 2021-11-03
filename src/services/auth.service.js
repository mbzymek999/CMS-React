import axios from "axios";

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

  register(username, companyName, shortCompanyName, nip, regon, phone, street, streetNumber, buildingNumber, city, postcode, province, country, additionalFields, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      companyName,
      shortCompanyName,
      nip,
      regon,
      phone,
      street,
      streetNumber,
      buildingNumber,
      city,
      postcode,
      province,
      country,
      additionalFields,
      email,
      password,
    });
  }

  registerEmployee(username, name, lastName, position, phone, street, streetNumber, buildingNumber, city, postcode, email, password) {
    return axios.post(API_URL + "signup/employee", {
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
      password,
    });
  }
}

export default new AuthService();
