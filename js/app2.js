'use strict'
function Animal(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
}
let objArray = []
let keywords = [];
console.log(objArray);

Animal.prototype.render = function () {
    let template = $('#mustache-template').html();
    // console.log(template)
    let html = Mustache.render(template, this);
    $('main').append(html);

    if (keywords.includes(this.keyword) !== true) {
        keywords.push(this.keyword);
        $('select').append(`<option value="${this.keyword}">${this.keyword}</option>`);

    }
}




function getData() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-02.json', ajaxSettings).then(data => {
        data.forEach(element => {
            let Obj = new Animal(element.image_url, element.title, element.description, element.keyword, element.horns);
            objArray.push(Obj);
            Obj.render();
            // Obj.renderSelect();
        });
    })

}
$('select').on('change', function () {
    if (this.value === "default") {
        $('div').show();
    }
    else {
        let selectedKey = '.' + this.value;
        $('div').hide();
        $(selectedKey).show();
    }
});

$('#hornSort').on('click', function () {
    $('div').remove();
    objArray.sort((a, b) => {
        return a.horns - b.horns;
    });

    objArray.forEach(Obj => {
        Obj.render();
    });
});
$('#titleSort').on('click', function () {
    $('div').remove();
    objArray.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
    });

    objArray.forEach(Obj => {
        Obj.render();
    });

});
$('document').ready(getData);
