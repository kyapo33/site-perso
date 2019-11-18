exports.contactValidator = (req, res, next) => {
    req.check('name', 'Un nom est requis' ).notEmpty()
    req.check('message', 'Un message est requis' ).notEmpty()
    req.check('email', 'Une adresse e-mail est requise' ).notEmpty()
    req.check('email', 'Email trop court')
        .matches(/.+\@.+\..+/)
        .withMessage("Email doit comprendre un @")
        .isLength({
            min: 4,
            max: 32
        });
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}