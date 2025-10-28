import ManagementView from "@/views/ManagementView.vue";
import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";

describe.concurrent("ManagementView", () => {

  test("Shows correct components", () => {
    const wrapper = mount(ManagementView);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain("Management");
    expect(wrapper.findComponent({ name: "ManagementMain" }).exists()).toBe(true);
  });
});