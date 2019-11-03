module.exports = {
    getAll,
    filter,
    categorie
};

function getAll(req, res, next) {
    const data = require('data');

    return res.json({
        error: false,
        data: data.data
    })
}


function categorie(req, res, next) {
    const cat = {
        cat1: 'Categorie 1',
        cat2: 'Categorie 2',
        cat3: 'Categorie3'
    };
    return res.json({
        error: false,
        data: cat
    })
}

async function filter(req, res, next) {
    let err, data = require('data');
    if (req.body.keyword !== undefined) {
        [err, data] = await to(filterByKeyword(req.body.keyword, data));
    }
    if (req.body.data !== undefined) {
        let categories = JSON.parse(req.body.data);
        if(categories.length > 0){
            [err, data] = await to(filterByCategorie(categories, data));
        }
    }

    return res.json({
        error: false,
        length: data.length,
        data: data.data
    })
}

async function filterByKeyword(keyword, d) {
    return await new Promise(async (resolve, reject) => {
        let tmp = [];
        await asyncForEach(d.data, function (res, index) {
            if (res.title.search(keyword) !== -1) {
                tmp.push(res)
            }
            if (res.description.search(keyword) !== -1) {
                tmp.push(res)
            }
        });
        return resolve({data: tmp});
    })
}

async function filterByCategorie(cat, d) {
    return await new Promise(async (resolve, reject) => {
        let tmp = [];
        let catIsHere = [];
        console.log(d.data);
        await asyncForEach(d.data, async function (res, index) {
            let isOk = null;
            await asyncForEach(cat,async function(a,b){
                console.log(res.category.indexOf(a));
                if (res.category.indexOf(a) !== -1 && isOk !== false) {
                    isOk = true;
                }else{
                    isOk = false;
                }
            });
            if (isOk) {
                tmp.push(res);
            }
        });
        return resolve({data: tmp});
    })
}



async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}


function to(promise) {
    return promise.then(data => {
        return [null, data];
    })
        .catch(err => [err]);
}
