const btn = document.querySelector(".btn");
const url="./api/people.json"

btn.addEventListener("click",() =>{
    getData(url);
} );

function getData(url) {
  const xhr = new XMLHttpRequest();
  console.log("xhr0", xhr);
  xhr.open("GET",url );
  console.log("xhr", xhr);
  xhr.onreadystatechange = function () {
    console.log("xhr", xhr);
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data=JSON.parse(xhr.responseText);
      const displayData = data.map((item) => {
            return `
            <p>${item.name}</p>
            `  ;
      }).join('');
      const element = document.createElement("div");
      element.innerHTML = displayData;
      document.body.appendChild(element); 
    } else {
      console.log({
        status: xhr.status,
        text: xhr.statusText,
      });
    }
  };
  xhr.send();
}

console.log("hello");

