import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesStoreContext } from "../store/ExpensesContext";
import { getDateMinusDays } from "../utils/date";

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesStoreContext);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const sevenDays = getDateMinusDays(today, 7);
    return expense.date >= sevenDays && expense.date <= today;
  });
  return (
    <ExpensesOutput expenses={recentExpenses} expensesTime="Last 7 days" />
  );
};

export default RecentExpenses;
