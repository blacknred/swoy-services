export default `
    type Channel {
        id: Int!
        name: String!
        public: Boolean!
        messages: [ChannelMessage!]!
        users: [User!]!
    }

    type ChannelResponse {
        ok:Boolean!
        channel: Channel
        errors: [Error!]
    }

    type Mutation {
        createChannel(teamId: Int!, name: String!, public: Boolean!): ChannelResponse!
    }
`;
