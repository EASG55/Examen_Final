import mongoose from "mongoose";
import {Contact} from "../types.ts";

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    nombre: {type: String, required: true},
    numeroTelefono: {type: String, required: true},
    pais: {type: String},
    hora: {type: String}
    
})

export type ContactModelType = mongoose.Document & Omit<Contact, "_id">;
export const ContactModel = mongoose.model<ContactModelType>("Contact", contactSchema);