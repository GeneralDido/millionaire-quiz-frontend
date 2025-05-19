// utils/api.ts
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {'Content-Type': 'application/json'}
})

export async function get<T>(url: string): Promise<T> {
  const {data} = await instance.get<T>(url)
  return data
}

export async function post<T>(url: string, body?: unknown): Promise<T> {
  const {data} = await instance.post<T>(url, body)
  return data
}
