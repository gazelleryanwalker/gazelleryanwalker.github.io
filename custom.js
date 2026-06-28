(function(){
  var REVIEW_URL = "https://www.google.com/maps/search/?api=1&query=Bronzed+and+Boujie+Tanning+Co+St+Petersburg+FL";
  function fixToYou(){
    try{
      [].slice.call(document.querySelectorAll('h1,h2,h3')).forEach(function(h){
        var txt=(h.textContent||'').replace(/\s+/g,' ').trim();
        if(/we.?ll come/i.test(txt) && /to you/i.test(txt)){
          h.style.marginBottom='44px';
          h.style.overflow='visible';
          h.style.lineHeight='1.0';
          var last=h.lastElementChild;
          if(last){ last.style.display='inline-block'; last.style.paddingBottom='0.18em'; last.style.lineHeight='1.0'; }
        }
      });
    }catch(e){}
  }
  function addReviews(){
    if(document.querySelector('.bb-reviews')) return true;
    var svc = document.querySelector('#services');
    if(!svc) return false;
    var sec = document.createElement('section');
    sec.className = 'bb-reviews';
    sec.innerHTML =
      '<div class="bb-reviews-inner">' +
        '<span class="bb-rv-kicker">&#9733; on google</span>' +
        '<h2 class="bb-rv-title">Glowing <em>reviews</em></h2>' +
        '<p class="bb-rv-sub">See what Tampa Bay babes are saying — then come get your own flawless, never-orange glow.</p>' +
        '<div class="bb-rv-cta">' +
          '<a class="bb-rv-btn bb-rv-primary" href="' + REVIEW_URL + '" target="_blank" rel="noreferrer">Read our reviews</a>' +
          '<a class="bb-rv-btn bb-rv-secondary" href="' + REVIEW_URL + '" target="_blank" rel="noreferrer">Leave a review</a>' +
        '</div>' +
      '</div>';
    svc.parentNode.insertBefore(sec, svc.nextSibling);
    return true;
  }
  function run(){ fixToYou(); addReviews(); }
  if(document.readyState !== 'loading') run();
  else document.addEventListener('DOMContentLoaded', run);
  var tries = 0;
  var iv = setInterval(function(){ run(); if(++tries > 14 || document.querySelector('.bb-reviews')) { fixToYou(); clearInterval(iv);} }, 500);
})();
