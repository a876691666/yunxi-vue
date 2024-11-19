import antfu from '@antfu/eslint-config'

export default antfu({
  // 开启格式化工具
  formatters: true,
  rules: {
    // 关闭对使用严格等于(===)和严格不等于(!==)的强制要求
    'eqeqeq': 'off',
    // 关闭对在Node.js中优先使用全局process对象的检查
    'node/prefer-global/process': 'off',
    // 关闭对在Node.js中优先使用全局buffer对象的检查
    'node/prefer-global/buffer': 'off',
  },
  // 忽略的文件
  ignores: ['**/prisma-client/*'],
})
