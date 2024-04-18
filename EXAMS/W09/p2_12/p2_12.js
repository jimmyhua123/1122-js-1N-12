const calculateBtn = document.querySelector('#calculate');
const bmiResult = document.querySelector('#result');
const suggest = document.querySelector('#suggest');
const weightInput = document.querySelector('#weight');
const heightInput = document.querySelector('#height');

function bmiCalc_xx(height, weight) {
  return weight / (height * height);
}
function bmi_normal_low(height) {
  return 18.5 * (height * height);
}
function bmi_normal_high(height) {
  return 24 * (height * height);
}

function wwInput() {
  return parseFloat(weightInput.value);
}
function hhInput() {
  return parseFloat(heightInput.value);
}

calculateBtn.addEventListener('click', () => {
  height = hhInput().toFixed(2);
  height = height / 100;
  weight = wwInput().toFixed(2);
  console.log("height ", height);
  console.log("weight ", weight);
  bmicalc = bmiCalc_xx(height, weight).toFixed(1);
  if (bmicalc < 18.5) {
    bmiResult.textContent = `Your BMI is ${bmicalc} Underweight`;
    suggest.textContent = `add at aleast ${(bmi_normal_low(height)-weight).toFixed(1)} kg to normal`;
  } else if (bmicalc >= 18.5 && bmicalc < 24) {
    bmiResult.textContent = `Your BMI is ${bmicalc} Normal`;
    suggest.textContent = ``;
  }else if ( bmicalc > 24) {
    bmiResult.textContent = `Your BMI is ${bmicalc} Overweight`;
    suggest.textContent = `reduse at aleast ${(weight-bmi_normal_high(height)).toFixed(1)} kg to normal`;
  }
  
});
