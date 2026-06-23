const planInput=document.getElementById("planNumber");

const planCard=document.getElementById("planInfo");

const routeNumber=document.getElementById("routeNumber");

const routeName=document.getElementById("routeName");

const sitesCount=document.getElementById("sitesCount");

const storageCount=document.getElementById("storageCount");

const lastMission=document.getElementById("lastMission");

function searchPlan(){

const number=planInput.value.trim();

if(number===""){

alert("أدخل رقم الخطة");

return;

}

if(!plans[number]){

alert("رقم الخطة غير موجود");

planCard.style.display="none";

return;

}

routeNumber.textContent="الخطة رقم "+number;

routeName.textContent=plans[number].name;

sitesCount.textContent=plans[number].sites.length;

storageCount.textContent=(plans[number].flash||0)+(plans[number].hard||0);

lastMission.textContent=localStorage.getItem("lastMission_"+number)||"لا يوجد";

planCard.style.display="block";

}function startMission(){

const number=planInput.value.trim();

if(!plans[number]){

alert("اختر رقم خطة صحيح");

return;

}

localStorage.setItem("selectedPlan",number);

window.location.href="mission.html";

}

function openHistory(){

const number=planInput.value.trim();

if(!plans[number]){

alert("اختر رقم خطة أولاً");

return;

}

localStorage.setItem("selectedPlan",number);

window.location.href="history.html";

}

function resetSearch(){

planInput.value="";

planCard.style.display="none";

planInput.focus();

}
