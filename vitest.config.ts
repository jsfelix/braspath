import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['html', 'json-summary'],
      include: [
        'src/domain/entities/*.ts',
        'src/domain/use-cases/*.ts',
        'src/shared/entities/*.ts',
      ],
      skipFull: true,
      all: true,
    },
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
