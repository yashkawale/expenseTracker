import axios from "axios";

const URL = "https://expense-tracker-app-5958c-default-rtdb.firebaseio.com";

export const sendDataToDatabase = (expenseData) => {
  axios.post(URL + "/expensedata.json", expenseData);
};

export const fetchDataFromDatabase = async () => {
  const response = await axios.get(URL + "/expensedata.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};
