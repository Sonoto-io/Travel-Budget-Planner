import { setupWorker } from 'msw/browser';
import { categoriesHandlers } from './categories'
import { expensesHandlers } from './expenses';
import { currenciesHandlers } from './currencies';
import { usersHandlers } from './users';

export const worker = setupWorker(...[categoriesHandlers, expensesHandlers, currenciesHandlers, usersHandlers].flat());