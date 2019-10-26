var text = "";
var author = "";
function getQuote(){
  $.get("https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand", function(a){
    console.log(a);
    if(a[0].content.rendered.length < 300){
    var b = (a[0].content.rendered.substr(3,a[0].content.rendered.length-8)).split(/[\.]/)
      $("#quoteText").html("");
      for(var x = 0; x < b.length; x++){
        $("#quoteText").append("<p>" + b[x] +"</p>");
        $("#quoteText").append("<div class='seperator'></div>")
      }

      $("#author").html("- " + a[0].title.rendered);
      text = createText(b);
      author = a[0].title.rendered;
    }else{
      getQuote();
    }
  });
}
getQuote();

function openTwitter(){
  window.open("https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + text + "%20%20%20by%20" + author);
}

 function createText(a){
    var b = ""
    for(var x = 0; x < a.length; x++){
      var c = a[x].replace(/ */,"");
      if(c.length != 0){
      b += a[x];
      b += ".";
      }
    }
   var c = ""
   while(b != c){
     c = b;
     b = b.replace(/<.+?>/,"");
   }

   b = b.replace(/\&#8217;/,"’");
   b = b.replace(/\&#8220;/, "“");
   b = b.replace(/\&#8221;/,"”");
   b = b.replace(/\&#....;/," ");
   b = encodeURI(b);
    return b;
  }

function openTumblr(){
 window.open("https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=Casablanca&content=" + text + "%20%20%20by%20" + author +"&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button")
}
