import {GraphQLError} from "graphql";
import {ContactModelType, ContactModel} from "../db/Contact.ts";
import {Contact} from "../types.ts";


const hora_pais: async(_:unknown, args: {numeroTelefono: string}) =>{
    
    const API_KEY: 'P6Zluj7k6QBtjBR6opl0Yg==oIoTRghJbY2mZDLc';
    const url: 'https://api.api-ninjas.com/v1/validatephone?number=' + numeroTelefono,
        headers ={'X-Api-Key': API_KEY},
        const response_phone = await fetch (url, {headers});
        if(!response_phone.ok){
            throw new GraphQLError("Numero no validado");
        }
        const pais_json = (await response_phone.json()).country;

    const url2: 'https://api.api-ninjas.com/v1/country?name=' + pais_json.country,
    const response_pais = await fetch(url2, {headers});
    if(!response_pais.ok){
        throw new GraphQLError("pais no valido");
    }
    const capital_json = (await response_pais.json()).capital;

    const url3: 'https://api.api-ninjas.com/v1/worldtime?city=' + capital_json,
    const response_hora = await fetch(url3, {headers});
    if(!response_hora.ok){
        throw new GraphQLError("ciudad no valida");
    }
    const hora = (await response_hora.json()).datetime;

    return{
        hora, capital_json
    };


}

export default hora_pais;