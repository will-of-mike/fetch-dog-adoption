export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}
  
export interface Location {
    zip_code: string
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
}

interface Match {
    match: string
}
  
export interface SearchParams {
    breeds?: string[]
    ageMin?: string
    ageMax?: string
    sort?: string
    from?: number
}
  
export interface SearchResponse {
    resultIds: string[]
    total: number
    next?: string
    prev?: string
}