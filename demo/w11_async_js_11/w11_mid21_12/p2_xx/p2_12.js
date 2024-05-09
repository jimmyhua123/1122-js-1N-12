const calculateBtn = document.querySelector('#calculate');
const bmiResult = document.querySelector('#result');
const suggest = document.querySelector('#suggest');

function bmiCalc_xx(height, weight) {
  return weight / (height * height);
}
function bmi_normal_low(height) {
  return 18.5 * (height * height);
}
function bmi_normal_high(height) {
  return 24 * (height * height);
}

const calculateBMI = () => {
  const weight=Number(document.querySelector('#weight').value);
  const height=Number(document.querySelector('#height').value/100);

  const bmi = bmiCalc_xx(height, weight);
  const normal_low = bmi_normal_low(height);
  const normal_high = bmi_normal_high(height);

  let status;
  let suggestion;

  if(bmi<18.5){
    status = 'Underweight';
    suggestion = `add at aleast ${(normal_low-weight).toFixed(1)} kg to normal`;
  }else if(bmi<=24){
    status='Normal';
    suggestion = ` `;
  }else{
    status='Overweight';
    suggestion = `reduse at aleast ${(weight-normal_high).toFixed(1)} kg to normal`;
  }

  bmiResult.innerHTML=  `Your BMI is ${bmi.toFixed(1)}. ${status}`;
  suggest.innerHTML= `${suggestion}`;
};



calculateBtn.addEventListener('click', calculateBMI);