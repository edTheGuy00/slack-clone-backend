import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
  Mutation: {
    createChannel: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const team = await models.Team.findOne({ where: { id: args.teamId } }, { raw: true });
        if (team.owner !== user.id) {
          return {
            ok: false,
            errors: [
              {
                path: 'name',
                message: 'You need to be the owner of the team in order to create teams',
              },
            ],
          };
        }
        const channel = await models.Channel.create(args);
        return {
          ok: true,
          channel,
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          errors: formatErrors(error, models),
        };
      }
    }),
  },
};
