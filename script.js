// theme toggle + copy buttons. no deps.
(function(){
  var root = document.documentElement;
  try {
    if (localStorage.getItem("vista-theme") === "dark") root.setAttribute("data-theme", "dark");
  } catch(e){}
  document.getElementById("theme").addEventListener("click", function(){
    var dark = root.getAttribute("data-theme") === "dark";
    if (dark) { root.removeAttribute("data-theme"); }
    else { root.setAttribute("data-theme", "dark"); }
    try { localStorage.setItem("vista-theme", dark ? "light" : "dark"); } catch(e){}
  });
  document.querySelectorAll("[data-copy]").forEach(function(btn){
    btn.addEventListener("click", function(){
      var el = document.getElementById(btn.getAttribute("data-copy"));
      var done = function(){ btn.textContent = "copied"; setTimeout(function(){ btn.textContent = "copy"; }, 1200); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(el.textContent).then(done, function(){ fallback(); });
      } else { fallback(); }
      function fallback(){
        var r = document.createRange(); r.selectNodeContents(el);
        var s = getSelection(); s.removeAllRanges(); s.addRange(r);
        try { document.execCommand("copy"); done(); } catch(e){}
        s.removeAllRanges();
      }
    });
  });
})();
