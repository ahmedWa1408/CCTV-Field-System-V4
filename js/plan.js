const planInput=document.getElementById("planNumber");

const routeName=document.getElementById("routeName");

const sitesCount=document.getElementById("sitesCount");

const flashCount=document.getElementById("flashCount");

const hardCount=document.getElementById("hardCount");

planInput.addEventListener("input",()=>{

const number=planInput.value;

if(plans[number]){

routeName.value=plans[number].name;

sitesCount.value=plans[number].sites.length;

flashCount.value=plans[number].flash;

hardCount.value=plans[number].hard;

}else{

routeName.value="";

sitesCount.value="";

flashCount.value="";

hardCount.value="";

}

});function startMission(){

const number=planInput.value;

if(!plans[number]){

alert("رقم الخطة غير موجود");

return;

}

if(document.getElementById("operatorName").value.trim()==""){

alert("يرجى إدخال اسم المشغل");

return;

}

localStorage.setItem("selectedPlan",number);

localStorage.setItem("operatorName",document.getElementById("operatorName").value);

localStorage.setItem("operatorID",document.getElementById("operatorID").value);

localStorage.setItem("carNumber",document.getElementById("carNumber").value);

localStorage.setItem("laptopNumber",document.getElementById("laptopNumber").value);

window.location.href="mission.html";

}
