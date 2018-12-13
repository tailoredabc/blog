const ma = 'Hétfő';
const kellDolgozni = false;

if (ma === 'Hétfő' && kellDolgozni === true) {
  console.log('Fúj');
} else if ((ma === 'Hétfő' && kellDolgozni === false) || ma === 'Péntek') {
  console.log('Hurrá!!');
} else {
  console.log('Kitartás!');
}
