import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000, // время ожидания запроса
});

export async function getMenu() {
  try {
    const response = await instance.get("/menu/getAll");
    
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getOrders() {
  try {
    const response = await instance.get("/orders/getAll");
    
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function userLogin(userlogin, password) {
  try {
    const response = await instance.post("/user/login", {
      userlogin,
      password,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export default instance;