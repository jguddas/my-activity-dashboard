import snakeCase from 'lodash/snakeCase.js'
import mapKeys from 'lodash/mapKeys.js'
import { stringify as stringifyQuery } from 'query-string'

const snakeCaseKeys = (obj) => mapKeys(obj, (val, key) => snakeCase(key))

const fetchWithQuery = (url, { query, ...opts }) => fetch(
  `${url}${query ? '?' : ''}${stringifyQuery(snakeCaseKeys(query))}`,
  opts,
).then((res) => (
  res.json().then((json) => (res.ok ? json : Promise.reject(json)))
))

export default fetchWithQuery
