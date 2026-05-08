import React, { createContext, useContext, useState } from 'react';

export type Expense = {
  id: string;
  description: string;
  amount: number;
};

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
};

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export function ExpensesProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses((current) => [expense, ...current]);
  };

  const removeExpense = (id: string) => {
    setExpenses((current) => current.filter((expense) => expense.id !== id));
  };

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, removeExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error('useExpenses precisa estar dentro de ExpensesProvider');
  }

  return context;
}