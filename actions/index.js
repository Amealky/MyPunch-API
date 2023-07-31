module.exports = (api) => {
    api.actions = {
        auth:   require('./auth')(api),
        users:  require('./users/crud')(api),
        sessions:  require('./sessions/crud')(api),
    };
};