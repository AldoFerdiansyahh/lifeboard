import{$}from'../utils.js';import{translate}from'../i18n.js';
export function showToast(message,type='info'){const el=document.createElement('div');el.className=`toast ${type}`;el.textContent=translate(message);$('#toast-root').append(el);setTimeout(()=>el.remove(),3200)}
