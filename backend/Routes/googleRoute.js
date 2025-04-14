import express from 'express';
import passport from '../Controllers/googleAuthController.js'; /* most important it should be imported from
                                                                      controller file*/
import generateToken from '../utils/generateToken.js'

const router = express.Router();
const url = process.env.UI_URL;

router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: `${url}/login` }),
    (req, res) => {
        const token = generateToken(req.user);
        res.cookie('token', token, { maxAge: 3600000 });
        res.redirect(`${url}/success-login?token=${token}`);
    }
);

export default router;
