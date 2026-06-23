const historyTable=document.getElementById("historyTable");

const missionDetails=document.getElementById("missionDetails");

const searchInput=document.getElementById("searchInput");

let selectedMission=null;

function loadHistory(){

const history=JSON.parse(

localStorage.getItem("missionHistory")||"[]"

);

historyTable.innerHTML="";

history.forEach((item,index)=>{

const row=document.createElement("tr");

row.innerHTML=`

<td>${item.plan}</td>

<td>${item.route}</td>

<td>${item.operator}</td>

<td>${item.operatorID}</td>

<td>${item.supervisor}</td>

<td>${item.finishDate}</td>

<td>${item.progress}</td>

<td>

<button class="viewMission"

data-index="${index}">

فتح

</button>

</td>

`;

historyTable.appendChild(row);

});

}

loadHistory();document.addEventListener("click",function(e){

if(!e.target.classList.contains("viewMission")){

return;

}

const index=e.target.dataset.index;

const history=JSON.parse(

localStorage.getItem("missionHistory")||"[]"

);

selectedMission=history[index];

missionDetails.innerHTML=`

<h3>الخطة رقم ${selectedMission.plan}</h3>

<p><strong>المسار:</strong> ${selectedMission.route}</p>

<p><strong>المشغل:</strong> ${selectedMission.operator}</p>

<p><strong>ID المشغل:</strong> ${selectedMission.operatorID}</p>

<p><strong>المشرف:</strong> ${selectedMission.supervisor}</p>

<p><strong>ID المشرف:</strong> ${selectedMission.supervisorID}</p>

<p><strong>السيارة:</strong> ${selectedMission.vehicle}</p>

<p><strong>اللابتوب:</strong> ${selectedMission.laptop}</p>

<p><strong>نسبة الإنجاز:</strong> ${selectedMission.progress}</p>

<p><strong>تاريخ إنهاء المهمة:</strong> ${selectedMission.finishDate}</p>

`;

});searchInput.addEventListener("input",function(){

const keyword=this.value.trim().toLowerCase();

const rows=historyTable.querySelectorAll("tr");

rows.forEach(row=>{

const text=row.textContent.toLowerCase();

if(text.includes(keyword)){

row.style.display="";

}else{

row.style.display="none";

}

});

});

document.getElementById("copyMission").addEventListener("click",function(){

if(!selectedMission){

alert("اختر مهمة أولاً");

return;

}

navigator.clipboard.writeText(

JSON.stringify(selectedMission,null,2)

);

alert("تم نسخ بيانات المهمة.");

});

document.getElementById("deleteMission").addEventListener("click",function(){

if(!selectedMission){

alert("اختر مهمة أولاً");

return;

}

if(!confirm("هل تريد حذف هذه المهمة؟")){

return;

}

let history=JSON.parse(

localStorage.getItem("missionHistory")||"[]"

);

history=history.filter(item=>

!(

item.plan===selectedMission.plan &&

item.finishDate===selectedMission.finishDate

)

);

localStorage.setItem(

"missionHistory",

JSON.stringify(history)

);

missionDetails.innerHTML="<p>تم حذف المهمة.</p>";

selectedMission=null;

loadHistory();

});document.getElementById("printMission").addEventListener("click",function(){

    if(!selectedMission){

        alert("اختر مهمة أولاً");

        return;

    }

    window.print();

});

document.getElementById("pdfMission").addEventListener("click",function(){

    if(!selectedMission){

        alert("اختر مهمة أولاً");

        return;

    }

    window.print();

});

document.getElementById("openMission").addEventListener("click",function(){

    if(!selectedMission){

        alert("اختر مهمة أولاً");

        return;

    }

    localStorage.setItem(

        "selectedPlan",

        selectedMission.plan

    );

    window.location.href="mission.html";

});

window.addEventListener("storage",function(){

    loadHistory();

});
