import {GraphQLError} from "graphql";
import mongoose from "mongoose";
import {ContactModelType, ContactModel} from "../db/Contact.ts";
import {check_telefono} from "../lib/telefono.ts";

export const Mutation = {
    deleteContact: async(_: unknown, args: {id: string}): Promise<Boolean> => {
       try{
        const {id} = args;
        if(!mongoose.isValidObjectId(id)){throw new Error("Introduce un id de Mongoose valido")}

        const contacto = await ContactModel.findByIdAndDelete(id);
        if(!contacto){
            return false;
        }
        return true;
       }catch(e){
           throw new GraphQLError(e);
       }
    },
    addContact: async(_: unknown, args: {nombre: string, telefono: string}): Promise<ContactModelType> => {
        try{
            const {nombre, telefono} = args;

            const {pais,valid_telefono} = await check_telefono(telefono);

            if(!valid_telefono) {throw new Error("Telefono no valido")}

        const contactoCreado = new ContactModel({
            nombre: nombre, 
            telefono: telefono, 
            pais: pais
        });

        await contactoCreado.save();

        return contactoCreado;
    }catch(e){
            throw new GraphQLError(e);
        }
      
    },
    updateContact: async(_: unknown, args: {id: string, nombre: string, telefono: string}): Promise<ContactModelType> => {
        try{
        const {id, nombre, telefono} = args;

        if(!mongoose.isValidObjectId(id)){throw new Error("Introduce un id de Mongoose valido")}
        
        const contacto = await ContactModel.findById(id);

        if(!contacto){throw new Error("Contacto no encontrado")}

        if(telefono){
            if(contacto.telefono !== telefono){
                const {pais,valid_telefono} = await check_telefono(telefono);

                if(!valid_telefono) {throw new Error("Telefono no valido")}

                contacto.telefono = telefono;
                contacto.pais = pais;
            }
        }else{
                contacto.telefono = contacto.telefono;
                contacto.pais = contacto.pais;
            }
            if(nombre){
                if(contacto.nombre !== nombre){
                    contacto.nombre = nombre;
                }
            }else{
                contacto.nombre = contacto.nombre;
            }
        await contacto.save();
       
        return contacto;
    }
    catch(e){
        throw new GraphQLError(e);
    }
    }
}