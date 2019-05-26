(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
      var script2 = document.createElement("SCRIPT");
      script2.src = 'real-script.js';
      script2.type = 'text/javascript';
      document.getElementsByTagName("head")[0].appendChild(script2);
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();
