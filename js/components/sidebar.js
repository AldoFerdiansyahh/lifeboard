import{icon}from'./icons.js';
const desktop=[['dashboard','home','Home'],['schedule','calendar','Schedule'],['tasks','tasks','Tasks'],['money','wallet','Money'],['notes','notes','Notes'],['statistics','chart','Statistics']];
const mobile=[['dashboard','home','Home'],['schedule','calendar','Schedule'],['tasks','tasks','Tasks'],['money','wallet','Money'],['more','more','More']];
const item=([r,i,l])=>`<button class="nav-link" data-route="${r}"><span>${icon(i,20)}</span>${l}</button>`;
export function renderNavigation(){document.querySelector('#desktop-nav').innerHTML=desktop.map(item).join('');document.querySelector('#mobile-nav').innerHTML=mobile.map(item).join('')}
