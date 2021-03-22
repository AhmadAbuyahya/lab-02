'use strict'
function Animal(image_url,title,description,keyword,horns) {
this.image_url=image_url;
this.title=title;
this.description=description;
this.keyword=keyword;
this.horns=horns;
}
let keywords = [];
Animal.prototype.render=function(){
    let photoTemplate=$('#photo-template').clone();
    $('main').append(photoTemplate);
    photoTemplate.find('h2').text(this.title);
    photoTemplate.find('p').text(this.description);
    photoTemplate.find('img').attr('src',this.image_url);
    photoTemplate.attr('class',this.keyword);

    photoTemplate.removeAttr('id');
    if (keywords.includes(this.keyword) !== true) {
        keywords.push(this.keyword);
        $('select').append(`<option value="${this.keyword}">${this.keyword}</option>`);
    }
}
$('select').on('change', function() {
    let selectedKey = '.' + this.value;
    console.log(this.value);
    $('section').hide();
    $(selectedKey).show();
});

function getData() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-01.json', ajaxSettings).then(data=> {
        data.forEach(element=> {
            let Obj = new Animal(element.image_url,element.title,element.description,element.keyword,element.horns);
            Obj.render();
        });
    })
    
}
$('document').ready(getData);