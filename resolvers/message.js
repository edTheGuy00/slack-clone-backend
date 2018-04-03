import requiresAuth from '../permissions';

export default {
  Message: {
    user: ({ userId }, args, { models }) => models.User.findOne({ where: { id: userId } }),
  },
  Query: {
    messages: requiresAuth.createResolver(async (parent, { channelId }, { models }) =>
      models.Message.findAll({ order: [['created_at', 'ASC']], where: { channelId } }, { raw: true })),
  },
  Mutation: {
    createMessage: requiresAuth.createResolver(async (parent, args, { models, user }) => {
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
    }),
  },
};
