export default `
    input FileData {
        size: Int!
        name: String!
        path: String!
        type: String!
        thumb: String
        description: String
    }
    
    type File {
        size: Int!
        name: String!
        path: String!
        type: String!
        thumb: String
        description: String
    }

    type Message {
        id: Int!
        text: String
        pinned: Boolean!
        forwarded: Boolean!
        created_at: String!
        sender: User!
        files: [File!]
    }

    type Subscription {
        channelMessagesUpdated(channelId: Int!): Message!
    }

    type Query {
        getMessages(channelId: Int!): [Message!]!
    }

    type Mutation {
        createMessage(channelId: Int!, text: String, files: [FileData!]=[], forwarded: Boolean=false): Boolean!
        updateMessage(messageId: Int!, newText: String, newFiles: [FileData!]): Boolean!
        deleteMessage(messageId: Int!, adminAccess: Boolean=false): Boolean!
    }
`;
