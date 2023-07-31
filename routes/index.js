module.exports = (api) => {
    api.use('/auth', require('./auth')(api));
    api.use('/users', require('./users')(api));
    api.use('/sessions', require('./sessions')(api));
    api.use('/', require('./test')(api));
};