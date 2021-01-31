import snakeCase from 'lodash/snakeCase'
import mapKeys from 'lodash/mapKeys'
import { stringify as stringifyQuery } from 'query-string'

const snakeCaseKeys = (obj) => mapKeys(obj, (val, key) => snakeCase(key))

export interface RequestInitWithQuery extends RequestInit {
  query: {}
}

function fetchWithQuery<T>(url: string, { query, ...opts }: RequestInitWithQuery): Promise<T> {
  return (
    fetch(
      `${url}${query ? '?' : ''}${stringifyQuery(snakeCaseKeys(query))}`,
      opts,
    ).then((res) => (
      res.json().then((json) => (res.ok ? json : Promise.reject(json)))
    ))
  )
}

export default fetchWithQuery
