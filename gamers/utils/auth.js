const withAuth = (req, res, next) => {
    //if not logged in redirect to login page
    if (!req.session.logged_in) {
    res.redirect('/api/users/login');
    } else {
    next();
    }
};

module.exports = withAuth;