const controller = require('controller');

module.exports = function (app) {

    app.post('/data/get_all',controller.getAll);
    app.post('/data/filter',controller.filter);
    app.post('/data/categorie',controller.categorie);


    app.use('*', function (req, res, next) {
        return res.json({
            error: true,
            message:'Route Not Found'
        });
    })
};

