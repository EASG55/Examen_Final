import {GraphQLError} from "graphql";
import {ContactModelType, ContactModel} from "../db/Contact.ts";
import hora_pais from "./hora_pais.ts";

export const Query = {
    getContact: async(_: unknown, args: {id: string}) => {
        const contacto = await ContactModel.findById(args.id);
        if(!contacto){
            throw new GraphQLError ("Contacto no encontrado");
        }

        const hora = (await hora_pais(contacto.numeroTelefono))?.hora;
        const pais = (await hora_pais(contacto.numeroTelefono))?.pais;
        
    
        return{
            nombre: contacto.nombre,
            numeroTelefono: contacto.numeroTelefono,
            pais: pais_json.country,
            hora: hora,
        }

    }


}