(function(){
  // Real reviews are injected into window.BB_REVIEWS (see reviews.js). Never fabricated.
  function reviews(){ return (window.BB_REVIEWS && window.BB_REVIEWS.length) ? window.BB_REVIEWS : []; }

  function fixToYou(){
    try{
      [].slice.call(document.querySelectorAll('h1,h2,h3')).forEach(function(h){
        var txt=(h.textContent||'').replace(/\s+/g,' ').trim();
        if(/we.?ll come/i.test(txt) && /to you/i.test(txt)){
          h.style.marginBottom='44px'; h.style.overflow='visible'; h.style.lineHeight='1.0';
          var last=h.lastElementChild;
          if(last){ last.style.display='inline-block'; last.style.paddingBottom='0.18em'; last.style.lineHeight='1.0'; }
        }
      });
    }catch(e){}
  }

  function stars(n){ n=Math.round(n||5); var s=''; for(var i=0;i<5;i++) s+= i<n ? '★' : '☆'; return s; }
  function card(r){
    var initial=(r.name||'G').trim().charAt(0).toUpperCase();
    return '<div class="bb-rv-card">'+
      '<div class="stars">'+stars(r.stars)+'</div>'+
      '<p class="txt">“'+ (r.text||'') +'”</p>'+
      '<div class="bb-rv-who"><div class="bb-rv-av">'+initial+'</div>'+
        '<div><div class="bb-rv-nm">'+(r.name||'Google user')+'</div>'+
        '<div class="bb-rv-src"><span style="color:#4285F4">G</span> Google review</div></div></div>'+
    '</div>';
  }
  function addReviews(){
    if(document.querySelector('.bb-reviews')) return true;
    var svc=document.querySelector('#services'); if(!svc) return false;
    var rv=reviews();
    var head='<span class="bb-rv-kicker"><span style="color:#4285F4">G</span> reviews on google</span>'+
             '<h2 class="bb-rv-title">Glowing <em>reviews</em></h2>';
    var body;
    if(rv.length){
      var meta=window.BB_REVIEWS_META||{rating:5,count:rv.length};
      head+='<div class="bb-rv-stars-lg">'+stars(meta.rating)+'</div>'+
            '<p class="bb-rv-summary">'+meta.rating+' out of 5 · '+meta.count+' Google reviews</p>';
      var loop=rv.concat(rv); // duplicate for seamless scroll
      body='<div class="bb-rv-marquee"><div class="bb-rv-track">'+loop.map(card).join('')+'</div></div>';
    } else {
      body='<p class="bb-rv-empty">Reviews stream in here from Google. Connect the Google Business Profile to go live.</p>';
    }
    var sec=document.createElement('section'); sec.className='bb-reviews';
    sec.innerHTML='<div class="bb-reviews-inner">'+head+'</div>'+body;
    svc.parentNode.insertBefore(sec, svc.nextSibling);
    return true;
  }

  // randomized 360 spin on "let's turn heads", ~3-6s apart
  function scheduleSpin(){
    var el=document.querySelector('.hero-tagline');
    if(el){ el.classList.remove('bb-spin'); void el.offsetWidth; el.classList.add('bb-spin');
      setTimeout(function(){ el.classList.remove('bb-spin'); }, 1000); }
    setTimeout(scheduleSpin, 3000 + Math.random()*3000);
  }

  function run(){ fixToYou(); addReviews(); }
  if(document.readyState!=='loading') run(); else document.addEventListener('DOMContentLoaded', run);
  var tries=0, iv=setInterval(function(){ run(); if(++tries>14 || document.querySelector('.bb-reviews')){ fixToYou(); clearInterval(iv); } }, 500);
  setTimeout(scheduleSpin, 3500 + Math.random()*2500);
})();
