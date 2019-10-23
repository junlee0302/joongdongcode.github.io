var text = "";
var author = "";
function getQuote(){
    function requestQuote(){
        $.get("https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand", function(a){
        window.quotes = a
        window.count = 1
        console.log(a);
        renderQuote(a[0])
      });
    }
    function renderQuote(obj){
      $("#quoteText").html("");
      var b = (obj.content.rendered.substr(3,obj.content.rendered.length-8)).split(/[\.]/)
          for(var x = 0; x < b.length - 1; x++){
            $("#quoteText").append("<p>" + b[x] +".</p>");
            $("#quoteText").append("<div class='seperator'></div>")
          }

          $("#author").html("- " + obj.title.rendered);
          text = createText(b);
          author = obj.title.rendered;
    }
    if(window.quotes){
        if(window.count == 10){
            requestQuote()
        }else{
            renderQuote(window.quotes[window.count])
            window.count+=1
        }
    }else{
        requestQuote()
    }

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
