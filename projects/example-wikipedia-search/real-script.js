
$("#searchButton").on("click",function(){
  var url="https://en.wikipedia.org/w/api.php?action=opensearch&search="+ $("#searchbar").val() +"&format=json&callback=load";
  console.log($("#searchbar").val() )
  $.getScript(url)
})
$("#searchbar").keyup(function(event){
  console.log(event.key)
  if(event.key == "Enter"){
    var url="https://en.wikipedia.org/w/api.php?action=opensearch&search="+ $("#searchbar").val() +"&format=json&callback=load";
    $.getScript(url)
  }
})
function load(a){
  if(Array.isArray(a)){
    if(a[1].length){
    for(var x = 0; x < a[1].length; x++){
      var htmlCard = "<a class='title' href =" + a[3][x]+">" + a[1][x] + "</a><div class='page-content'>" + a[2][x] +"</div>"
      $("#searchContent").html()
      $("#searchContent").append(htmlCard)
    }
    }else{
       $("#searchContent").html("No Result")
    }
  }else{
    $("#searchContent").html("Error Occured")
  }
}
