function updateClock(){

const now=new Date();

const time=now.toLocaleTimeString("ar-SA");

const date=now.toLocaleDateString("ar-SA",{

weekday:"long",

year:"numeric",

month:"long",

day:"numeric"

});

document.getElementById("liveClock").textContent=time;

document.getElementById("todayDate").textContent=date;

document.getElementById("lastUpdate").textContent=date;

}

setInterval(updateClock,1000);

updateClock();const stats={

plans:6,

sites:0,

missions:0,

success:100

};

document.getElementById("plansCount").textContent=stats.plans;

document.getElementById("sitesCount").textContent=stats.sites;

document.getElementById("missionsCount").textContent=stats.missions;

document.getElementById("successRate").textContent=stats.success+"%";
