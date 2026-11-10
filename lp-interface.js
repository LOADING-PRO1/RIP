/* LOADING PRO — ES5 firmware detection and local routing only. */
(function(){
  'use strict';
  var device=document.getElementById('device'), fwEl=document.getElementById('firmware');
  var comp=document.getElementById('compatibility'),caption=document.getElementById('detect-caption');
  var selected=document.getElementById('selected-host'),launch=document.getElementById('launch');
  var launchLabel=document.getElementById('launch-label'),note=document.getElementById('launch-note');
  var cacheEl=document.getElementById('cache-state');
  var map={
    '6.00':'6/index.html','6.02':'6/index.html','6.10':'6/index.html','6.20':'6/index.html',
    '6.50':'6/index.html','6.51':'6/index.html','6.70':'6/index.html','6.71':'6/index.html','6.72':'6/index.html',
    '7.00':'6/index.html','7.01':'6/index.html','7.02':'6/index.html','7.50':'6/index.html',
    '7.51':'6/index.html','7.55':'6/index.html','8.00':'6/index.html','8.01':'6/index.html',
    '8.03':'6/index.html','8.50':'6/index.html','8.52':'6/index.html',
    '9.00':'6/index.html','9.03':'6/index.html','9.04':'6/index.html','9.50':'6/index.html',
    '9.51':'6/index.html','9.60':'6/index.html','10.00':'6/index.html','10.01':'6/index.html',
    '10.50':'6/index.html','11.00':'6/index.html','11.02':'6/index.html',
    '11.50':'new/index.html','11.52':'new/index.html','12.00':'new/index.html',
    '12.02':'new/index.html','12.50':'new/index.html','12.52':'new/index.html',
    '13.00':'new/index.html','13.02':'new/index.html','13.04':'new/index.html',
    '13.50':'new/index.html','13.52':'new/index.html','14.00':'henweb/index.html'
  };
  var ua=navigator.userAgent||'', match=/PlayStation\s*4\s*[\/ ]\s*(\d{1,2})\.(\d{1,2})(?:\D|$)/i.exec(ua);
  var ps5=/PlayStation\s*5\s*[\/ ]/i.test(ua),firmware='',target='';
  function setStatus(text,type){comp.className='compat'+(type?' '+type:'');comp.textContent=text;}
  if(match){
    var minor=parseInt(match[2],10),major=parseInt(match[1],10);
    firmware=major+'.'+(minor<10?'0':'')+minor;
    target=map[firmware]||'';
    device.textContent='PLAYSTATION 4';fwEl.textContent=firmware;
    caption.textContent='AUTO-DETECTED';
    if(target){
      var name=target.indexOf('henweb/')===0?'14.00 EXPERIMENTAL HOST':target.indexOf('new/')===0?'MODERN PS4 HOST':'LEGACY PS4 HOST';
      selected.textContent=name;
      document.getElementById(target.indexOf('henweb/')===0?'route-test':target.indexOf('new/')===0?'route-modern':'route-legacy').className+=' selected';
      setStatus(firmware==='14.00'?'EXPERIMENTAL':'ROUTE FOUND',firmware==='14.00'?'warn':'ok');
      launch.disabled=false;
      launchLabel.textContent=firmware==='14.00'?'OPEN 14.00 TEST HOST':'LAUNCH MATCHED HOST';
      note.textContent=firmware==='14.00'?'14.00 is a research-stage route and is not a verified stable GoldHEN jailbreak.':'Selected automatically from the firmware routes included in this package. Success requires a compatible exploit.';
    }else{
      selected.textContent='NO MATCHING HOST FILES';setStatus('NO ROUTE','bad');
      launchLabel.textContent='FIRMWARE NOT LISTED';
      note.textContent='This firmware has no mapped route in the supplied package. Avoid selecting a different firmware to force an exploit.';
    }
  }else if(ps5){
    device.textContent='PLAYSTATION 5';fwEl.textContent='PS5';caption.textContent='DIFFERENT DEVICE';
    selected.textContent='PS4 HOST ONLY';setStatus('NOT PS4','bad');
    launchLabel.textContent='PS4 ONLY';note.textContent='This launcher is intended for PlayStation 4. A separate PS5 folder exists in the package.';
  }else{
    device.textContent='BROWSER PREVIEW';fwEl.textContent='--.--';caption.textContent='PREVIEW MODE';
    selected.textContent='OPEN ON PS4 TO AUTO-SELECT';setStatus('PREVIEW','warn');
    launchLabel.textContent='OPEN ON PS4 TO LAUNCH';
  }
  launch.addEventListener('click',function(){if(target && !launch.disabled){launch.disabled=true;launchLabel.textContent='OPENING MODULE...';location.href=target;}},false);
  function updateCache(){
    try{
      var c=window.applicationCache;
      if(!c){cacheEl.textContent='NOT AVAILABLE';return;}
      if(c.status===0){cacheEl.textContent='NOT CACHED';}
      else if(c.status===2||c.status===3){cacheEl.textContent='DOWNLOADING UI';}
      else if(c.status===4){cacheEl.textContent='UI UPDATE READY';}
      else if(c.status===5){cacheEl.textContent='CACHE OBSOLETE';}
      else{cacheEl.textContent='UI CACHE READY';}
    }catch(e){cacheEl.textContent='UNKNOWN';}
  }
  updateCache();
  if(window.applicationCache){
    var evs=['checking','downloading','progress','cached','noupdate','updateready','obsolete'];
    for(var i=0;i<evs.length;i++)window.applicationCache.addEventListener(evs[i],updateCache,false);
    window.applicationCache.addEventListener('error',function(){cacheEl.textContent='CACHE ERROR';},false);
  }
})();
