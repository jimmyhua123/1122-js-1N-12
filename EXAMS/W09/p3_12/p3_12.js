
function changeImage(index) {
  const player = document.querySelector('#player');
  console.log('player', player);
  switch (index) {
    case 1: {
      console.log('1')      
      break;
    }
    case 2:{
      console.log('2');
      
      break;

    }
    case 3: {
      console.log('3');
      break;

    }
    case 4: {
      console.log('4');
      break;

    }
    case 5: {
      console.log('5');
      break;

    }

  }
}
const main = document.querySelector('.main');
const section = document.querySelector('.section');

function showTKU60() {
  const p = document.querySelector('#menu1');
}

function clearMenu1All() {
  const p = document.querySelector('#menu2');
  main.classList.add('hidden');
  section.classList.add('hidden');
}
