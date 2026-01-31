import { expect, test } from 'vitest'
import { state } from './state'

test('initial state', () => {
  expect(state.score).toBe(0)
  expect(state.lives).toBe(6)
})
