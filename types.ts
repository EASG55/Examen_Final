import {ApolloServer, gql} from "@apollo/server";

type Contact = {
    _id: String;
    nombre: String;
    numeroTelefono: String;
    pais: String;
    hora: String;
}