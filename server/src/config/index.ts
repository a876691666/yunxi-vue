import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import * as yaml from 'js-yaml'

const configFileNameObj = {
  development: 'dev',
  test: 'test',
  production: 'prod',
}

const env = process.env.NODE_ENV

// eslint-disable-next-line no-console
console.log(env)

export default () => {
  return yaml.load(readFileSync(join(__dirname, `./${configFileNameObj[env]}.yml`), 'utf8')) as Record<string, any>
}
