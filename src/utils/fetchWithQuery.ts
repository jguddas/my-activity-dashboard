import snakeCase from 'lodash/snakeCase'
import mapKeys from 'lodash/mapKeys'
import mapValues from 'lodash/mapValues'
import { stringify as stringifyQuery } from 'query-string'

type QueryValue = string | number | boolean

export type Query = { [key: string]: QueryValue | QueryValue[] }

export interface RequestInitWithQuery extends RequestInit {
  query: Query
}

const snakeCaseKeys = (obj:{[key:string]: QueryValue}) => mapKeys(obj, (_, key) => snakeCase(key))

function fetchWithQuery<T>(url: string, { query, ...opts }: RequestInitWithQuery): Promise<T> {
  const flattenedQuery = mapValues(query, (val) => (
    Array.isArray(val)
      ? val
        .map((x) => snakeCase(x.toString()))
        .join(',')
      : val
  ))
  return (
    fetch(
      `${url}${query ? '?' : ''}${stringifyQuery(snakeCaseKeys(flattenedQuery))}`,
      opts,
    ).then((res) => (
      res.json().then((json:T) => (res.ok ? json : Promise.reject(json)))
    ))
  )
}

export default fetchWithQuery
