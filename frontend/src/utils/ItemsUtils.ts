import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "@/api/categories";
import {
  getCountries,
  createCountry,
  updateCountry,
  deleteCountry,
} from "@/api/countries";
import {
  getCurrencies,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} from "@/api/currencies";
import {
  getSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "@/api/subcategories";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/api/users";
import type { Item } from "../models/Item";

const itemsMapping = {
  category: {
    get: getCategories,
    create: createCategory,
    update: updateCategory,
    delete: deleteCategory,
  },
  country: {
    get: getCountries,
    create: createCountry,
    update: updateCountry,
    delete: deleteCountry,
  },
  currency: {
    get: getCurrencies,
    create: createCurrency,
    update: updateCurrency,
    delete: deleteCurrency,
  },
  subcategory: {
    get: getSubcategories,
    create: createSubcategory,
    update: updateSubcategory,
    delete: deleteSubcategory,
  },
  user: {
    get: getUsers,
    create: createUser,
    update: updateUser,
    delete: deleteUser,
  },
};

export type ItemName = keyof typeof itemsMapping;
type ItemAction = "get" | "create" | "update" | "delete";

export async function handleItemAction(
  itemName: ItemName,
  action: ItemAction,
  ...args: any[]
) {
  const item = itemsMapping[itemName];
  const fn = item[action];
  if (!fn) {
    throw new Error(
      `${action.toUpperCase()} operation not defined for ${itemName}`,
    );
  }

  return fn(...args);
}


// If a value needs a Select form
export const isSelectNeeded = (itemField: string | number): boolean => {
  return (
    itemField === "countryId" ||
    itemField === "currencyId" ||
    itemField === "categoryId" ||
    itemField === "subcategoryId"
  );
};

export const getSelectOptions = async (itemField: string, itemId: string) => {
  let options = null;
  switch (itemField) {
    case "currencyId":
      options = await handleItemAction("currency", "get");
      break;
    case "categoryId":
      options = await handleItemAction("category", "get");
      break;
    default:
      console.warn("Unknown item field for select handling: ", itemField);
  }
  return options 
};

