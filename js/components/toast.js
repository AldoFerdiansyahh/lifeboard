import{$}from'../utils.js';
export function showToast(message,type='info'){const el=document.createElement('div');el.className=`toast ${type}`;el.textContent=message;$('#toast-root').append(el);setTimeout(()=>el.remove(),3200)}
