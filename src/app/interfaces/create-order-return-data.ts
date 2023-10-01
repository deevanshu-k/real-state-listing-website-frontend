export interface CreateOrderReturnData {
    code: number,
    message: string,
    data: {
        key: string,
        id: string,
        amount: number,
        currency: string,
        notes: {
            userId: number,
            userType: string
        }
    }
}
