import { beforeAll, afterEach, afterAll } from 'vitest'
import { worker } from '@/mocks/worker'
 
beforeAll(() => worker.start())
afterEach(() => worker.resetHandlers())
afterAll(() => worker.stop())