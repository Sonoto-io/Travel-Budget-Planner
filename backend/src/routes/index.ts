import { Elysia } from "elysia";

import { configureCategoriesRoutes } from "./categoriesRoutes";
import { configureCountriesRoutes } from "./countriesRoutes";
import { configureExpensesRoutes } from "./expensesRoutes";
import { configureCurrenciesRoutes } from "./currenciesRoutes";
import { configureSubcategoriesRoutes } from "./subcategoriesRoutes";
import { configureUsersRoutes } from "./usersRoutes";
import { configureAuthRoutes } from "./authRoutes";
import { configureConfigRoutes } from "./configRoutes";

const routeModules = [
        configureCategoriesRoutes,
        configureCountriesRoutes,
        configureCurrenciesRoutes,
        configureExpensesRoutes,
        configureSubcategoriesRoutes,
        configureUsersRoutes,
        configureAuthRoutes,
        configureConfigRoutes
    ];


export const configureAllRoutes = (app: Elysia) => {
  // Register all routes
  return routeModules.reduce((acc, fn) => fn(acc), app);
};
