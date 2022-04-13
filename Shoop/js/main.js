$(".back-to-top").click(function() {
    $("html, body").animate({scrollTop: 0}, 1000);
})
var template = $("#template").html();
var mainRow = $("#mainRow");
var title = new RegExp('{{title}}','g');
var collections = $("[data-collection]");
collections.on("click",displayCollections);
display();

function display() {
    
    mainRow.html(""); 

$.ajax({
    url : "http://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
    method : "get",
    dataType : "json",
})
.done(function (res) {
    console.log(res);
    var text = "";
    res.forEach(function (e) {
        text = template.replace("{{imgSrc}}",e.imgSrc)
               .replace(title,e.productTitle)
               .replace("{{model}}",e.model)
               .replace("{{price}}",e.price);
         mainRow.append(text)
    })
})
}


function displayCollections(e) {
    mainRow.html("");
    e.preventDefault();
    var col = $(this).data("collection");
    $.ajax({
        url : "http://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
        method : "get",
        dataType : "json",
    })
    .done(function (res) {
        if(col === "male" || col === "female"){
            var colFilter = res.filter(function (el) {
                return el.colection === col;
            })
            displayProduct(colFilter)
           }else if(col === "newCol" || col === "popular" || col ==="action"){
               collections.parent().removeClass("active");
               $(this).parent().addClass("active");
            var colFilter = res.filter(function (el) {
                return el[col];
            })
            displayProduct(colFilter)
        }       
    })
}
function displayProduct(filter) {
    var text = "";
      filter.forEach(function (e) {
        text = template.replace("{{imgSrc}}",e.imgSrc)
               .replace(title,e.productTitle)
               .replace("{{model}}",e.model)
               .replace("{{price}}",e.price);
         mainRow.append(text)
    })
}