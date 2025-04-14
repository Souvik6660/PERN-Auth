import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js';
import { config } from 'dotenv';
import generateUUID from '../utils/generateUUID.js';

config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { emails, displayName, photos } = profile;

        let user = await User.findOne({
          where: { email: emails[0].value },
        });

        if (user) {
          if (!user.profileImage) {
            user.profileImage = photos[0]?.value;
            await user.save();
          }
          return done(null, user);
        }

        user = await User.create({
          id: generateUUID(),
          fullname: displayName,
          email: emails[0].value,
          profileImage: photos[0]?.value,
          isVerified: emails[0]?.value ? true : false, 
          password: generateSecurePassword(8),
        });

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;

//Random password logic for google user 

const generateSecurePassword = (length = 8) => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+{}[]<>?';

  const allChars = uppercase + lowercase + numbers + specialChars;

  // Ensure at least one of each required character type
  const randomUpper = uppercase[Math.floor(Math.random() * uppercase.length)];
  const randomSpecial = specialChars[Math.floor(Math.random() * specialChars.length)];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

  // Generate the rest of the password
  let password = randomUpper + randomSpecial + randomNumber;
  
  for (let i = 3; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
    
  
  // Shuffle the password to avoid predictable patterns
  return password.split('').sort(() => Math.random() - 0.5).join('');
};
