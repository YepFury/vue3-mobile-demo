export enum CATAGORY_TYPES {
    ALL,
    VUE,
    REACT,
    NODE
}
export interface ILesson {
    title: string,
    video: string,
    poster: string,
    price: number,
    category?: string
}
export interface ISlider {
    url: string
}
export interface ILsessons {
    hasMore: boolean,
    loading: boolean,
    offset: number,
    limit: number,
    list: ILesson[]
}
export interface IHomeState {
    currentCatagory: CATAGORY_TYPES,
    sliders: ISlider[],
    lessons: ILsessons
}