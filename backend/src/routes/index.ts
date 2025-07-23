import { Elysia } from "elysia";

import { configureCategoriesRoutes } from "./categoriesRoutes";
import { configureCountriesRoutes } from "./countriesRoutes";
import { configureExpensesRoutes } from "./expensesRoutes";
import { configureCurrenciesRoutes } from "./currenciesRoutes";
import { configureSubcategoriesRoutes } from "./subcategoriesRoutes";
import { configureUsersRoutes } from "./usersRoutes";


const routeModules = [
        configureCategoriesRoutes,
        configureCountriesRoutes,
        configureCurrenciesRoutes,
        configureExpensesRoutes,
        configureSubcategoriesRoutes,
        configureUsersRoutes
    ];

export const configureAllRoutes = (app: Elysia) =>
  routeModules.reduce((acc, fn) => fn(acc), app);
