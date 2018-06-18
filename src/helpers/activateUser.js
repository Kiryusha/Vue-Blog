export default function (context, res, vueAuth) {
  context.commit('isAuthenticated', {
    isAuthenticated: vueAuth.isAuthenticated(),
  });

  context.commit('username', {
    username: res.data.name,
  });

  context.commit('userId', {
    userId: res.data._id,
  });

  context.commit('isAdmin', {
    isAdmin: res.data.isAdmin,
  });
}
