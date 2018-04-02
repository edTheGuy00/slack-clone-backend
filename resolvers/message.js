export default {
  Query: {
    messages: async (parent, args, { models, user }) => [],
  },
  Mutation: {
    createMessage: async (parent, args, { models, user }) => {
      console.log(args);
      try {
        await models.Message.create({
          ...args,
          userId: user.id,
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
