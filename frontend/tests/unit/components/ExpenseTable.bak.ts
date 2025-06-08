// import { mount } from "@vue/test-utils";
// import ExpenseTable from "@/components/ExpenseTable.vue";
// import { describe, test, expect } from "vitest";

// const selectValues = {
//   users: [{ label: "Test User" }],
//   currencies: [{ ident: "fr-FR", name: "EUR", displayName: "Euro", conversion: 1 }],
//   categories: [{ id: '1', name: "Test Category" }],
//   subcategories: [{ id: '1', name: "Test Subcategory" }]
// };

// const expenses = [
//   {
//     id: "1",
//     date: "2025-01-01",
//     price: 120.0,
//     currency: selectValues.currencies[0],
//     category: "Test Category",
//     subcategory: "Test Subcategory",
//     user: "Test User",
//     note: "Test note"
//   }
// ];

// describe.concurrent("ExpenseTable.vue", () => {
//   test("renders table headers", () => {
//     const wrapper = mount(ExpenseTable, {
//       props: { selectValues, modelValue: expenses }
//     });
//     expect(wrapper.text()).toContain("Date");
//     expect(wrapper.text()).toContain("User");
//     expect(wrapper.text()).toContain("Currency");
//     expect(wrapper.text()).toContain("Category");
//     expect(wrapper.text()).toContain("Sub Category");
//   });

//   test("shows expense data", () => {
//     const wrapper = mount(ExpenseTable, {
//       props: { selectValues, modelValue: expenses }
//     });
//     expect(wrapper.text()).toContain("Test User");
//     expect(wrapper.text()).toContain("Test note");
//     expect(wrapper.text()).toContain("Test Category");
//     expect(wrapper.text()).toContain("Test Subcategory");
//     expect(wrapper.text()).toContain("Euro");
//   });

//   test("can enter edit mode for a row", async () => {
//     const wrapper = mount(ExpenseTable, {
//       props: { selectValues, modelValue: expenses }
//     });
//     // Find and click the edit button (row editor)
//     const editBtn = wrapper.find('[data-pc-section="roweditbutton"]');
//     expect(editBtn.exists()).toBe(true);
//     await editBtn.trigger("click");
//     // Should now show editable fields (e.g., input for price)
//     expect(wrapper.find('input').exists()).toBe(true);
//   });
// });