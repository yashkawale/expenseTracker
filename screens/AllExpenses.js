import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesStoreContext } from "../store/ExpensesContext";

const AllExpenses = () => {
  const expensesContext = useContext(ExpensesStoreContext);
  return (
    <ExpensesOutput
      expenses={expensesContext.expenses}
      expensesTime="All Time"
    />
  );
};

export default AllExpenses;
