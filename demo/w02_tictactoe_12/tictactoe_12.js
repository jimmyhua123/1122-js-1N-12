const o='o';
const x='x';
let turn=0;
let done=false;

const container = document.querySelector('#container');

const allLi =document.querySelectorAll('#board li');
const resetBtn =document.querySelector('#reset');


console.log('container',container);
console.log('allLi',allLi);
console.log('reset',resetBtn);


const reset = () => {
    allLi.forEach((item)=>{
        item.classList='';
        item.textContent='+';
    });
    container.style.backgroundColor='#666';
    turn=0;
    done=false;
}



resetBtn.addEventListener('click',reset);