function main() {
    
    function updateBatteryStatus(battery) {
        var battery_val = battery.level * 100;
        var color = "darkgreen";
        if(battery_val < 60 && battery_val > 35)
            color = "darkorange";
        else if(battery_val <= 35)
            color = "darkred";
        
        var batteryFill = document.getElementById('percent-fill');
        batteryFill.style.width = `${3.15 * Number(battery_val)}px`;
        batteryFill.style.backgroundColor = color;

        var percentLevel = document.getElementById('level');
        percentLevel.innerText = battery_val + "%";

        var chargingText = document.getElementById('charging');
        var isCharging = battery.charging ? 'Charging' : 'Not Charging';
        chargingText.innerText = "Your Battery is " + isCharging;

        var notchargingText = document.getElementById('notcharging');
        if(battery.charging) {
            notchargingText.innerText = "Time remaning to Full Charge: "+ (battery.chargingTime/3600000).toFixed(2) + " hrs";
        }
        else {
            notchargingText.innerText = "Time Remaining: " + (battery.dischargingTime/3600000).toFixed(2) + " hrs";
        }
    }

    navigator.getBattery().then(function(battery) {
        updateBatteryStatus(battery);
    });
}
document.addEventListener('DOMContentLoaded', main);