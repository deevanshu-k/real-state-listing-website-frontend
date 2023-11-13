export interface Property {
    id: number,
    property_type: string,
    offer_type: string,
    property_name: string,
    verification_status: boolean,
    state: string,
    district: string,
    zipcode: number,
    remark: string,
    no_of_rooms: number,
    price: number,
    attached_kitchen: boolean,
    attached_bathroom: boolean,
    include_water_price: boolean,
    include_electricity_price: boolean,
    rating: number,
    images: {
        id: number,
        img_url: string
    }[]
}
