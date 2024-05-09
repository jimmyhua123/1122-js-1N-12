const heading1 = document.querySelector('.one');
const heading2 = document.querySelector('.two');
const heading3 = document.querySelector('.three');
const heading4 = document.querySelector('.four');

const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    addColor(1000,heading1,'red')
        .then(() => {
        return addColor(1000,heading2,'green');
        })
        .then(() => {
            return addColor(1000,heading3,'blue');
        })
        .then(() => {
            return addColor(1000,heading4,'purple');
        })
        .catch((error)=>console.log(error));
});

const addColor = (time,element,color) => {    
    return new Promise((resolve, reject) => {
        if(element){
            setTimeout(() => {
                element.style.color = color;
                resolve();
            },time);
        }else{
            reject(new Error(`There is no such element ${element}`));
        }
    });
};


// btn.addEventListener('click', () => {
//     setTimeout(() => {
//         heading1.style.color = 'red';
//         setTimeout(()=>{
//             heading2.style.color = 'green';
//             setTimeout(()=>{
//                 heading3.style.color = 'blue';
//                 setTimeout(()=>{
//                  heading4.style.color = 'purple';
//                 }, 500);
//             }, 1000);
//         }, 2000);
//     }, 1000);
// });