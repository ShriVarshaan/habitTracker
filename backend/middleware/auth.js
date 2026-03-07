export const loggedIn = async (req, res, next) => {
    passport.authenticate('jwt', { session: false });
}