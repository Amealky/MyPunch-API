const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

module.exports = (api) => {
    const Token = api.models.Token;

    return function checkToken(req, res, next) {
        let token = req.params.token;
        console.log(token);
        // verify token validity
        jwt.verify(token, api.settings.security.salt, null, (err, decryptedToken) => {
            if (err) {
                return res.status(401).send('invalid.token');
            }
            console.log(decryptedToken);
            Token.findOne({
                where: {
                    id: decryptedToken.tokenId,
                    createdAt: {
                        $lt: new Date(),
                        $gt: new Date(new Date() - (1000 * 60 * 60 * api.settings.security.tokenExpiration))
                    }
                }
            }).then(function(find) {
                if (!find) {
                    return res.status(401).send('authentication.expired');
                }
                return res.status(200).send('valid.token');
            });
        });
    }
};