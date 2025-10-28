import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "@/mocks/node";

import { vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { config } from "@vue/test-utils";
import { ref } from "vue";

config.global.stubs = {
  RouterLink: { template: '<a><slot /></a>', props: ['to'] }
}

vi.mock("@/stores/countryStore", () => ({
  useCountryStore: () => ({
    currentCountry: ref({
      id: "1",
      label: "France",
      currencyId: "fr-FR",
      shortname: "fr",
    }),
    setCurrentCountry: vi.fn(),
  }),
}));

vi.mock("@/stores/authStore", () => ({
  useAuthStore: () => ({
    getAccessToken: vi.fn(() => Promise.resolve("fake_token")),
    setAccessToken: vi.fn(),
    clearAccessToken: vi.fn(),
  }),
}));

beforeAll(() => {
  setActivePinia(createPinia())
  server.listen({ onUnhandledRequest: "error" })
})

afterEach(() => {
  server.resetHandlers()
  vi.clearAllMocks()
})

afterAll(() => server.close())

vi.mock('primevue/usetoast', () => ({
  useToast: () => ({
    add: vi.fn(),
    remove: vi.fn(),
    clear: vi.fn(),
  })
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: {},
  }),
  useRoute: () => ({
    path: '/',
    name: 'mocked-route',
    params: {},
    query: {},
    fullPath: '/',
    hash: '',
    meta: {},
  })
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})