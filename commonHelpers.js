import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as c,i as l}from"./assets/vendor-77e16229.js";const t=document.querySelector("button[data-start]"),r=document.querySelector("#datetime-picker");let n=null,a=null,m=document.querySelector("span[data-days]"),h=document.querySelector("span[data-hours]"),f=document.querySelector("span[data-minutes]"),y=document.querySelector("span[data-seconds]");t.disabled=!0;const p={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){if(n=e[0],n.getTime()<=Date.now()){l.error({title:"Error",titleColor:"White",message:"Please choose a date in the future",messageColor:"White",backgroundColor:"Red",position:"topRight"}),t.disabled=!0;return}t.disabled=!1}};c(r,p);t.addEventListener("click",()=>{a=setInterval(S,1e3),t.disabled=!0,r.disabled=!0});function S(){const e=b(n-Date.now());if(n-Date.now()>0)m.textContent=o(e.days),h.textContent=o(e.hours),f.textContent=o(e.minutes),y.textContent=o(e.seconds);else{clearInterval(a),r.disabled=!1;return}}function b(e){const s=Math.floor(e/864e5),d=Math.floor(e%864e5/36e5),i=Math.floor(e%864e5%36e5/6e4),u=Math.floor(e%864e5%36e5%6e4/1e3);return{days:s,hours:d,minutes:i,seconds:u}}function o(e){return e.toString().padStart(2,"0")}
//# sourceMappingURL=commonHelpers.js.map
