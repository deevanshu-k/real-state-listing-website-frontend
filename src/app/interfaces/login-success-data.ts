export interface LoginSuccessData {
    code: number,
    message: string,
    data: {
        id: number,
        role: "TENANT" | "LANDLORD",
        username: string,
        email: string,
        subscription_plan: "FREETANANT" | "FREELANDLORD",
        profile_image: string | null,
        jwtToken: string
    }
}
