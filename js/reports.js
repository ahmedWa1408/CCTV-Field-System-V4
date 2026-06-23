const reportContent=document.getElementById("reportContent");

const missionsCount=document.getElementById("missionsCount");

const completedCount=document.getElementById("completedCount");

const operatorsCount=document.getElementById("operatorsCount");

const hoursCount=document.getElementById("hoursCount");

const violationsCount=document.getElementById("violationsCount");

const completionRate=document.getElementById("completionRate");

function generateReport(){

const history=JSON.parse(

localStorage.getItem("missionHistory")||"[]"

);

missionsCount.textContent=history.length;

completedCount.textContent=history.filter(item=>

item.progress==="100%"

).length;

operatorsCount.textContent=

new Set(

history.map(item=>item.operator)

).size;

hoursCount.textContent=

history.reduce((sum,item)=>

sum+(item.totalHours||0)

,0);

violationsCount.textContent=

history.reduce((sum,item)=>

sum+(item.violations||0)

,0);

completionRate.textContent=

history.length?

Math.round(

(history.filter(item=>item.progress==="100%").length/history.length)*100

)+"%"

:

"0%";

reportContent.innerHTML="";

history.forEach(item=>{

reportContent.innerHTML+=`

<div class="reportItem">

<b>الخطة:</b> ${item.plan}<br>

<b>المسار:</b> ${item.route}<br>

<b>المشغل:</b> ${item.operator}<br>

<b>المشرف:</b> ${item.supervisor}<br>

<b>الإنجاز:</b> ${item.progress}<br>

<hr>

</div>

`;

});

}

document

.getElementById("generateReport")

.addEventListener(

"click",

generateReport

);

generateReport();document.getElementById("printReport").addEventListener("click",function(){

window.print();

});

document.getElementById("pdfReport").addEventListener("click",function(){

window.print();

});

document.getElementById("excelReport").addEventListener("click",function(){

const history=JSON.parse(

localStorage.getItem("missionHistory")||"[]"

);

let csv="رقم الخطة,المسار,المشغل,المشرف,نسبة الإنجاز,تاريخ المهمة\n";

history.forEach(item=>{

csv+=`${item.plan},${item.route},${item.operator},${item.supervisor},${item.progress},${item.finishDate}\n`;

});

const blob=new Blob([csv],{

type:"text/csv;charset=utf-8;"

});

const url=URL.createObjectURL(blob);

const link=document.createElement("a");

link.href=url;

link.download="CCTV_Report.csv";

link.click();

URL.revokeObjectURL(url);

});

document.getElementById("copyReport").addEventListener("click",function(){

navigator.clipboard.writeText(

reportContent.innerText

);

alert("تم نسخ التقرير.");

});
