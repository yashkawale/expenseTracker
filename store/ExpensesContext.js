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
    date: new Date("2024-01-20"),
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

const ExpensesStoreContext = createContext({
  expenses: [],
  addExpense: ({ description, date, amount }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, date, amount }) => {},
  setExpense: (expenses) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // const id = new Date().toDateString() + Math.random();
      return [action.payload, ...state];
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      const expenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateExpense = state[expenseIndex];
      const updatedExpense = { ...updateExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = updatedExpense;
      return updatedExpenses;
    case "SET":
      const reversed = action.payload.reverse();
      return reversed;
    default:
      return state;
  }
};

const ExpensesContext = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expensesData) => {
    dispatch({ type: "ADD", payload: expensesData });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, expensesData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expensesData } });
  };

  const setExpense = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const values = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
    setExpense: setExpense,
  };

  return (
    <ExpensesStoreContext.Provider value={values}>
      {children}
    </ExpensesStoreContext.Provider>
  );
};

export { ExpensesContext, ExpensesStoreContext };
