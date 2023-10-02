export interface Token {
    id: number,
    role: "TENANT" | "LANDLORD",
    username: string,
    email: string,
    subscription_plan: "FREETENANT"| "PREMIUMTENANT"  | "FREELANDLORD" | "STANDARDLANDLORD" | "PREMIUMLANDLORD",
    profile_image: string | null,
    iat: number,
    exp: number
}
