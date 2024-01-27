import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesStoreContext } from "../store/ExpensesContext";
import { getDateMinusDays } from "../utils/date";
import { fetchDataFromDatabase } from "../utils/http";

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesStoreContext);
  // const [fetchedExpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const expenses = await fetchDataFromDatabase();
      // setFetchedExpenses(expenses);
      expensesContext.setExpense(expenses);
    };
    getData();
  }, []);

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
