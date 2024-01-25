import { createContext, useReducer } from "react";

const Dummy_Data = [
  {
    id: 1,
    description: "Shoes",
    amount: 50,
    date: new Date("2023-03-01"),
  },
  {
    id: 2,
    description: "Sugar",
    amount: 44,
    date: new Date("2022-07-11"),
  },
  {
    id: 3,
    description: "Laptop",
    amount: 50000,
    date: new Date("2023-11-09"),
  },
  {
    id: 4,
    description: "Dubai ticket",
    amount: 300000,
    date: new Date("2024-01-01"),
  },
  {
    id: 5,
    description: "Iphone",
    amount: 70000,
    date: new Date("2023-07-29"),
  },
  {
    id: 6,
    description: "IceCream",
    amount: 40,
    date: new Date("2024-01-22"),
  },
  {
    id: 7,
    description: "Shoes",
    amount: 50,
    date: new Date("2023-03-01"),
  },
  {
    id: 8,
    description: "Sugar",
    amount: 44,
    date: new Date("2022-07-11"),
  },
  {
    id: 9,
    description: "Laptop",
    amount: 50000,
    date: new Date("2023-11-09"),
  },
  {
    id: 10,
    description: "Dubai ticket",
    amount: 300000,
    date: new Date("2024-01-01"),
  },
];

export const ExpensesStoreContext = createContext({
  expenses: [],
  addExpense: ({ description, date, amount }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, date, amount }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toDateString + Math.random();
      return [{ ...action.payload, id: id }, ...state];
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      const expenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateExpense = state[expenseIndex];
      const updatedExpense = { ...updateExpense, ...action.payload.data };
      return [{ ...updatedExpense }, ...state];
    default:
      return state;
  }
};

const ExpensesContext = ({ Children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, Dummy_Data);

  const addExpense = (expensesData) => {
    dispatch({ type: "ADD", payload: expensesData });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, expensesData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expensesData } });
  };

  const values = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesStoreContext.Provider value={values}>
      {Children}
    </ExpensesStoreContext.Provider>
  );
};

export default ExpensesContext;
