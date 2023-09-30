export interface RegisterSuccessData {
    code:number,
    message:string,
    data: {
        username:string,
        email:string
    }
}
