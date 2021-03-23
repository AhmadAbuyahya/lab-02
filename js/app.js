'use strict'
function Animal(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    objArray.push(this)
}
let objArray = []
let keywords = [];
console.log(objArray);

Animal.prototype.render = function () {
    let template = $('#mustache-template').html();
    console.log(template)
    let html = Mustache.render(template, this);
    return html;
}
Animal.prototype.render2 = function () {
    let template = $('#mustache-template2').html();
    let html = Mustache.render(template, this);
    return html;
}
Animal.prototype.renderSelect = function () {
    if (keywords.includes(this.keyword) !== true) {
        keywords.push(this.keyword);
        $('select').append(`<option value="${this.keyword}">${this.keyword}</option>`);
    }
    $('.template').attr('class', this.keyword);
}
$('select').on('change', function () {
    if (this.value === "default") {
        $('section').show();
    }
    else {
        let selectedKey = '.' + this.value;
        $('section').hide();
        $(selectedKey).show();
    }
});

function getData() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-01.json', ajaxSettings).then(data => {
        data.forEach(element => {
            let Obj = new Animal(element.image_url, element.title, element.description, element.keyword, element.horns);
            let html = Obj.render()
            $('main').append(html);
            Obj.renderSelect();
        });
    })

}
function getData2() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-02.json', ajaxSettings).then(data => {
        data.forEach(element => {
            let Obj = new Animal(element.image_url, element.title, element.description, element.keyword, element.horns);
            let html = Obj.render2();
            $('main').append(html);
            Obj.renderSelect();
        });
    })
}
$('#hornSort').on('click', function () {
    objArray.sort((a, b) => {
        return a.horns - b.horns;
    })
    $('#mustache-template').html('');
    objArray.forEach((elem) => {
        elem.render();
    })
});
$('#titleSort').on('click', function () {
    objArray.sort(function (a, b) {
        return (a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : -1;

    })
    $('#mustache-template').html('');
    objArray.forEach((elem) => {
        elem.render();
    });
});
$('document').ready(getData);
$('document').ready(getData2);