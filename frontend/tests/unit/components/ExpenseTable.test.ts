import { mount } from "@vue/test-utils";
import ExpenseTable from "@/components/ExpenseTable.vue";
import { describe, test, expect } from "vitest";
import { expenses } from "@/mocks/expenses";
import PrimeVue from "primevue/config";

const selectValues = {
  users: [{ label: "Test User" }],
  currencies: [{ ident: "fr-FR", name: "EUR", displayName: "Euro", conversion: 1 }],
  categories: [{ id: '1', name: "Test Category" }],
  subcategories: [{ id: '1', name: "Test Subcategory" }]
};


describe.concurrent("ExpenseTable.vue", () => {
  test("renders table headers", () => {
    const wrapper = mount(ExpenseTable, {
      props: { selectValues, modelValue: expenses.expenses },
      global: {
        plugins: [PrimeVue],
        stubs: {
          RouterLink: true,
        },
      },
    });
    console.log("wrapper text:", wrapper.text());
    expect(wrapper.text()).toContain("Date");
    expect(wrapper.text()).toContain("User");
    expect(wrapper.text()).toContain("Currency");
    expect(wrapper.text()).toContain("Price");
    expect(wrapper.text()).toContain("Price in my currency");
    expect(wrapper.text()).toContain("Note");
    expect(wrapper.text()).toContain("Location");
    expect(wrapper.text()).toContain("Category");
    expect(wrapper.text()).toContain("Sub Category");
    expect(wrapper.text()).toContain("Exceptional");
    expect(wrapper.text()).toContain("Edit");
    expect(wrapper.text()).toContain("Delete");

  });

  test("can enter edit mode for a row", async () => {
    const wrapper = mount(ExpenseTable, {
      props: { selectValues, modelValue: expenses.expenses },
      global: {
        plugins: [PrimeVue],
        stubs: {
          RouterLink: true,
        },
      },
    });
    // Find and click the edit button (row editor)
    const editBtn = wrapper.find('[data-pc-name="pcroweditorinit"]');
    expect(editBtn.exists()).toBe(true);
    await editBtn.trigger("click");
    // Should now show editable fields (e.g., input for price)
    expect(wrapper.find('input').exists()).toBe(true);
  });
});
