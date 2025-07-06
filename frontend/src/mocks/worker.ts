import { setupWorker } from "msw/browser";
import { categoriesHandlers } from "./categories";
import { expensesHandlers } from "./expenses";
import { currenciesHandlers } from "./currencies";
import { usersHandlers } from "./users";
import { subcategoriesHandlers } from "./subcategories";
import { countriesHandlers } from "./countries";

export const worker = setupWorker(
  ...[
    categoriesHandlers,
    expensesHandlers,
    currenciesHandlers,
    usersHandlers,
    subcategoriesHandlers,
    countriesHandlers
  ].flat(),
);
