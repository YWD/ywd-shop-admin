module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true // 或指定globals变量，或手动导入defineProps
  },
  // globals: {
  //   defineProps: 'readonly',
  //   defineEmits: 'readonly',
  //   defineExpose: 'readonly',
  //   withDefaults: 'readonly'
  // },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
  }
}
