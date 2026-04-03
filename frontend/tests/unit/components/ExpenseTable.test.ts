import { mount } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import ExpenseTable from "@/components/ExpenseTable.vue";
import { describe, test, expect } from "vitest";
import { expenses } from "@/mocks/expenses";
import PrimeVue from "primevue/config";

const selectValues = {
  users: [{ id: '1', label: "Test User" }],
  currencies: [{ id: "fr-FR", locale: "fr-FR", name: "EUR", label: "Euro", conversion: 1 }],
  categories: [{ id: '1', label: "Test Category" }],
  subcategories: [{ id: '1', label: "Test Subcategory" }]
};


describe("ExpenseTable.vue", () => {
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

  // test("can enter edit mode for a row", async () => {
  //   const wrapper = mount(ExpenseTable, {
  //     props: { selectValues, modelValue: expenses.expenses },
  //     global: {
  //       plugins: [PrimeVue],
  //       stubs: {
  //         RouterLink: true,
  //       },
  //     },
  //   });
  //   const row = wrapper.find('[data-pc-section="bodyrow"]')
  //   expect(row.exists()).toBeTruthy()
  //   const editBtn = row.find('[data-pc-name="pcroweditorinit"]');
  //   expect(editBtn.exists()).toBeTruthy();
  //   editBtn.trigger("click");
  //   await flushPromises();
  //   await wrapper.vm.$nextTick();
  //   const editableInput = row.find('[data-p-cell-editing="true"]');
  //   expect(row).toBe(true)
  //   expect(editableInput.exists()).toBeTruthy();
  // });
});
