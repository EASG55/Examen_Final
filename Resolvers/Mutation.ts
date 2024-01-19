import {GraphQLError} from "graphql";
import mongoose from "mongoose";
import {ContactModelType, ContactModel} from "../db/Contact.ts";

export const Mutation = {
    deleteContact: async(_: unknown, args: {id: string}): Promise<ContactModelType> => {
        const contacto = await ContactModel.findByIdAndDelete(args.id);
            if(!contacto){
                throw new GraphQLError("contacto no encontrado");
            }
            return true;
      
    },
    addContact: async(_: unknown, args: {nombre: string, numeroTelefono: string}): Promise<ContactModelType> => {
        const contacto = {
            nombre: args.nombre,
            numeroTelefono: args.numeroTelefono,
        };
        const contactoCreado = await new ContactModel(contacto).save();
        return {
            nombre: contactoCreado.nombre,
            numeroTelefono: contacto.numeroTelefono,
            id:contactoCreado._id.toString(),
        };
      
    },
    updateContact: async(_: unknown, args: {id: string, nombre: string, numeroTelefono: string}): Promise<ContactModelType> => {
        const {id, nombre, numeroTelefono} = args;
        const contacto = await ContactModel.findByIdAndUpdate(id, {nombre, numeroTelefono}, {new: true, runValidators: true});
        if(!contacto){
            throw new GraphQLError("contacto no encontrado");
        }
        return contacto;
    }
}