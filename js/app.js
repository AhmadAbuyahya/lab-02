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
    let template = $('#mustache-template').html();
    let html = Mustache.render(template, this);
    return html;
}
Animal.prototype.renderSelect=function(){
    if (keywords.includes(this.keyword) !== true) {
        keywords.push(this.keyword);
        $('select').append(`<option value="${this.keyword}">${this.keyword}</option>`);
    }
    $('.template').attr('class',this.keyword);
}
$('select').on('change', function() {
    if(this.value==="default"){
        $('section').show();
    }
    else {let selectedKey = '.' + this.value;
    $('section').hide();
    $(selectedKey).show();}
});

function getData() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-01.json', ajaxSettings).then(data=> {
        data.forEach(element=> {
            let Obj = new Animal(element.image_url,element.title,element.description,element.keyword,element.horns);
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
    $.ajax('data/page-02.json', ajaxSettings).then(data=> {
        data.forEach(element=> {
            let Obj = new Animal(element.image_url,element.title,element.description,element.keyword,element.horns);
            let html = Obj.render();
            $('main').append(html);
            $(html.section).addClass('fromPage2');
            console.log(html);
            Obj.renderSelect();
        });
    })
}
function renderButtons(){
    $('header').append("<button>Page 01</button><button>Page 02</button>");
    $('button:first-of-type').attr('id','button01');
    $('button:last-of-type').attr('id','button02');    
}
function clickButton01(){

}
renderButtons();
$('document').ready(getData);
$('document').ready(getData2);