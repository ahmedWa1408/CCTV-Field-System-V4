const welcomeScreen=document.getElementById("welcomeScreen");

const homePage=document.getElementById("homePage");

const planNumber=document.getElementById("planNumber");

const routeName=document.getElementById("routeName");

setTimeout(function(){

welcomeScreen.style.display="none";

homePage.style.display="block";

},2500);

function updateClock(){

const now=new Date();

document.getElementById("liveTime").textContent=

now.toLocaleTimeString("ar-SA");

document.getElementById("todayDate").textContent=

now.toLocaleDateString("ar-SA");

document.getElementById("todayName").textContent=

now.toLocaleDateString("ar-SA",{

weekday:"long"

});

}

updateClock();

setInterval(updateClock,1000);planNumber.addEventListener("input",function(){

const value=this.value.trim();

if(plans[value]){

routeName.value=plans[value].name;

}else{

routeName.value="";

}

});

document.getElementById("searchPlan").addEventListener("click",function(){

const value=planNumber.value.trim();

if(!plans[value]){

alert("رقم الخطة غير موجود.");

return;

}

routeName.value=plans[value].name;

});

document.getElementById("startMission").addEventListener("click",function(){

const value=planNumber.value.trim();

if(!plans[value]){

alert("اختر رقم خطة صحيح.");

return;

}

localStorage.setItem("selectedPlan",value);

window.location.href="mission.html";

});document.getElementById("historyPage").addEventListener("click",function(){

window.location.href="history.html";

});

document.getElementById("reportsPage").addEventListener("click",function(){

window.location.href="reports.html";

});

document.getElementById("adminPage").addEventListener("click",function(){

window.location.href="admin.html";

});

window.addEventListener("load",function(){

planNumber.focus();

});
