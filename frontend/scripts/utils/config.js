export const IS_NODE = process && !process.browser
export const IS_DEV = IS_NODE ? process.env.NODE_ENV === 'development' : /^(localhost|0\.0|192\.)/.test(window.location.hostname)
export const IS_STAGING = !IS_NODE && (/^get-dev-/.test(window.location.hostname) || /^staging-docs/.test(window.location.hostname))
export const IS_PROD = IS_NODE ? process.env.NODE_ENV === 'production' : !IS_DEV
export const BASE_NAME = IS_DEV ? '/' : '/'

if (IS_DEV) {
  console.log('running in DEV mode')
}
