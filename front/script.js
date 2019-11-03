const get_categorie = 'http://localhost:4002/data/categorie';
const get_all = 'http://localhost:4002/data/get_all';
const filter = 'http://localhost:4002/data/filter';

$(document).ready(function () {
    initSearcher();
});


let initSearcher = () => {
    getCategorie();
    getAllData();
    sendRequest();
};

/**
 * Get all categorie
 */
let getCategorie = () => {
    $.ajax({
        url: get_categorie,
        data: {},
        dataType: 'json',
        method: 'post',
        success: function (data) {

            if (data.error === false) {
                let html = '';
                $.each(data.data, function (k, v) {
                    html += categoriePrototype(k, data.data[k]);
                });
                $('#categorie_choice').html(html);
            }
        }
    })
};

let categoriePrototype = (key, value) => {
    return ' <div class="form-check">\n' +
        '                        <input class="form-check-input" type="checkbox" value="' + key + '" id="check_' + key + '">\n' +
        '                        <label class="form-check-label" for="check_' + key + '">\n' +
        '                            ' + value + '\n' +
        '                        </label>\n' +
        '                    </div>';
};

/**
 * Get all data
 */

let getAllData = () => {
    $.ajax({
        url: get_all,
        data: {},
        dataType: 'json',
        method: 'post',
        success: function (data) {

            if (data.error === false) {
                let html = '';
                $.each(data.data, function (k, v) {
                    html += dataPrototype(data.data[k]);
                });
                $('#content-data').html(html);
                $('#result-length span').text(data.data.length);
            }
        }
    })
};

let dataPrototype = (d) => {
    return '<div class="card" style="width: 20rem;">\n' +
        '                <img src="' + d.picture + '" class="card-img-top">\n' +
        '                <div class="card-body">\n' +
        '                    <h5 class="card-title">' + d.title + '</h5>\n' +
        '                    <p class="card-text">' + d.description.slice(0, 155) + '</p>\n' +
        '                    <a href="/' + d.slug + '" class="btn btn-primary">See more</a>\n' +
        '                </div>\n' +
        '            </div>';
};
/**
 * Form treatment
 */
let getDataOnFullTextChange = () => {
    if ($('#keyword_form').val().length >= 3) {
        return $('#keyword_form').val();
    }
};

let getDataOnCategorieChecked = () => {
    let data = [];
    $('#categorie_choice input:checked').each(function () {
        data.push($(this).val());
    });
    return data;
};

let sendRequest = () => {
    $('#sendrequest').click(function (e) {
        e.preventDefault();
        let full_text = getDataOnFullTextChange();
        let data = getDataOnCategorieChecked();

        $.ajax({
            url: filter,
            dataType: 'json',
            method: 'post',
            data: {data: JSON.stringify(data), keyword: full_text},
            success: function (data) {
                if (data.error === false) {
                    let html = '';
                    $.each(data.data, function (k, v) {
                        html += dataPrototype(data.data[k]);
                    });
                    $('#result-length span').text(data.data.length);
                    $('#content-data').html(html);
                }
            }
        })
    })
};
