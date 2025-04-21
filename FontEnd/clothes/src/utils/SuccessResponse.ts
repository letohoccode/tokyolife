export interface SuccessResponse<Data>{
    message : string
    data ?:  Data
}
export interface SuccessResponseAuth<Data> {
    message: string
    token : string
    code : number
    data : Data
}