import { setupServer } from "msw/node";
import { categoriesHandlers } from "./categories";

export const server = setupServer(...categoriesHandlers);
