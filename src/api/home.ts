import { CATAGORY_TYPES } from '@/types/home'
import axios from './'
export function getSliders<T>() {
    return axios.get<T, T>('/sliders')
}
export function getLessons<T>(category: CATAGORY_TYPES, offset: number = 0, limit: number = 5,) {
    return axios.get<T, T>(`/lessons?category=${category}&offset=${offset}&limit=${limit}`)

}