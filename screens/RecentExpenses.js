import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesStoreContext } from "../store/ExpensesContext";
import { getDateMinusDays } from "../utils/date";
import { fetchDataFromDatabase } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesStoreContext);
  const [fetchedExpenses, setFetchedExpenses] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getData = async () => {
      setFetchedExpenses(true);
      try {
        const expenses = await fetchDataFromDatabase();
        expensesContext.setExpense(expenses);
      } catch (error) {
        setError("Check your internet connectivity!");
      }
      setFetchedExpenses(false);
    };
    getData();
  }, []);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const sevenDays = getDateMinusDays(today, 7);
    return expense.date >= sevenDays && expense.date <= today;
  });

  if (fetchedExpenses) {
    return <LoadingOverlay />;
  }

  if (error && !fetchedExpenses) {
    return <ErrorOverlay message={error} />;
  }
  return (
    <ExpensesOutput expenses={recentExpenses} expensesTime="Last 7 days" />
  );
};

export default RecentExpenses;
