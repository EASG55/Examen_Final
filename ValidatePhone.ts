import {GraphQLError} from "graphql";
import {ContactModelType} from "../db/Contact.ts";

const ValidatePhone: async(_:unknown, args: (numeroTelefono: String)) =>{
const API_KEY: "P6Zluj7k6QBtjBR6opl0Yg==oIoTRghJbY2mZDLc";
const url: 'https://api.api-ninjas.com/v1/validatephone?number=' + numeroTelefono,
    headers: { 'X-Api-Key': API_KEY},
    const response_phone = await fetch (url, {headers});
    if(!response_phone.ok){
        throw new GraphQLError("Numero no validado")
    }
    const pais_json = await response_phone.json();
    return{
        pais:pais_json.country,
        validez:pais_json.is_valid
    }
}

export default ValidatePhone;