// import { mount } from "@vue/test-utils";
// import { describe, test, expect } from "vitest";
// import ExpenseTable from "@/components/ExpenseTable.vue";

// import { FormSelectValues } from "@/models/FormSelectValues";
// const selectValues = {
//   users: [{ label: "Test User" }],
//   currencies: [{ ident: "fr-FR", name: "EUR", displayName: "Euro", conversion: 1 }],
//   categories: [{ label: "Test Category" }],
//   subcategories: [{ label: "Test Subcategory" }]
// };

// describe.concurrent("ExpenseForm.vue", () => {
//   test("renders required fields", async () => {
//     const wrapper = mount(ExpenseForm, {
//       props: { selectValues }
//     });
//     expect(wrapper.text()).toContain("Date");
//     expect(wrapper.text()).toContain("User");
//     expect(wrapper.text()).toContain("Currency");
//     expect(wrapper.text()).toContain("Price");
//     expect(wrapper.text()).toContain("Category");
//   });

//   test("emits addExpense on submit with valid data", async () => {
//     const wrapper = mount(ExpenseForm, {
//       props: { selectValues }
//     });
//     // Fill required fields (simulate input)
//     await wrapper.find('input[name="price.value"]').setValue("123.45");
//     await wrapper.find('form').trigger("submit.prevent");
//     expect(wrapper.emitted("addExpense")).toBeTruthy();
//   });
// });
