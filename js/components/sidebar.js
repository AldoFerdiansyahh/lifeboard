const desktop=[['dashboard','⌂','Home'],['schedule','□','Jadwal'],['tasks','✓','Tasks'],['money','₨','Money'],['notes','≡','Notes'],['statistics','◌','Statistics']];
const mobile=[['dashboard','⌂','Home'],['schedule','□','Jadwal'],['tasks','✓','Tasks'],['money','₨','Money'],['more','•••','More']];
const item=([r,i,l])=>`<button class="nav-link" data-route="${r}"><span>${i}</span>${l}</button>`;
export function renderNavigation(){document.querySelector('#desktop-nav').innerHTML=desktop.map(item).join('');document.querySelector('#mobile-nav').innerHTML=mobile.map(item).join('')}
