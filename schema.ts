export const typeDefs = `#graphql
type Contact{
    id: ID!
    nombre: String!
    numeroTelefono: String!
    pais: String
    hora: String
}

type Query{
    getContact(id: ID!): Contact!
    getContacts: [Contact]!
}

type Mutation{
    addContact(nombre: String!, numeroTelefono: String!): Contact!
    deleteContact(id: ID!): Contact!
    updateContact(id: ID!,nombre: String!, numeroTelefono: String!): Contact!
}
`;