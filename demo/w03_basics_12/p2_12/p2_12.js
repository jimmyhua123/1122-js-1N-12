// 監聽按鈕點擊事件
document.getElementById('btn-c').addEventListener('click', function() {
    convertToFahrenheit();
});

document.getElementById('btn-f').addEventListener('click', function() {
    convertToCelsius();
});

// 轉換到華氏溫度
function convertToFahrenheit() {
    var input = document.getElementById('input-number').value;
    var result = (input * 9/5) + 32;
    displayResult(input + '°C = ' + result.toFixed(2) + ' °F');
}

// 轉換到攝氏溫度
function convertToCelsius() {
    var input = document.getElementById('input-number').value;
    var result = (input - 32) * 5/9;
    displayResult(input + '°F  = ' + result.toFixed(2) + ' °C');
}

// 顯示結果
function displayResult(result) {
    document.getElementById('current-calculation').textContent = result;
}
