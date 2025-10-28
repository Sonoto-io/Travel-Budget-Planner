import { setupServer } from "msw/node";
import { categoriesHandlers } from "./categories";
import { expensesHandlers } from "./expenses";
import { currenciesHandlers } from "./currencies";
import { usersHandlers } from "./users";
import { subcategoriesHandlers } from "./subcategories";
import { countriesHandlers } from "./countries";

export const server = setupServer(
  ...[
    categoriesHandlers,
    expensesHandlers,
    currenciesHandlers,
    usersHandlers,
    subcategoriesHandlers,
    countriesHandlers,
  ].flat(),
);
