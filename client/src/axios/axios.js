import axios from "axios";

const instance = axios.create({
  baseURL: "http://45.12.239.119:8080/",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 5000,
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

export async function createOrder(order) {
  try {
    const response = await instance.post("/orders/create", order);
    
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function updateOrder(numberOfTable, order) {
  try {
    const response = await instance.put("/orders/update", {numberOfTable,order});
    
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export default instance;