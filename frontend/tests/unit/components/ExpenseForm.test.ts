import { mount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import ExpenseForm from "@/components/ExpenseForm.vue";
import PrimeVue from "primevue/config";

const selectValues = {
  users: [{ label: "Test User" }],
  currencies: [{ ident: "fr-FR", name: "EUR", displayName: "Euro", conversion: 1 }],
  categories: [{ id: '1', name: "Test Category" }],
  subcategories: [{ id: '1', name: "Test Subcategory" }]
};


describe.concurrent("ExpenseForm.vue", () => {
  test("renders required fields", async () => {
    const wrapper = mount(ExpenseForm, {
      props: { selectValues },
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
    expect(wrapper.text()).toContain("Note");
    expect(wrapper.text()).toContain("Location");
    expect(wrapper.text()).toContain("Category");
    expect(wrapper.text()).toContain("Subcategory");
    expect(wrapper.text()).toContain("Exceptional expense");
  });

});
