const adminContent=document.getElementById("adminContent");

const systemLogs=document.getElementById("systemLogs");

function logAction(action){

const logs=JSON.parse(

localStorage.getItem("systemLogs")||"[]"

);

logs.unshift({

time:new Date().toLocaleString("ar-SA"),

action:action

});

localStorage.setItem(

"systemLogs",

JSON.stringify(logs)

);

loadLogs();

}

function loadLogs(){

const logs=JSON.parse(

localStorage.getItem("systemLogs")||"[]"

);

if(logs.length===0){

systemLogs.innerHTML="لا توجد عمليات حتى الآن.";

return;

}

systemLogs.innerHTML="";

logs.forEach(log=>{

systemLogs.innerHTML+=`

<div class="logItem">

<b>${log.time}</b>

<br>

${log.action}

</div>

`;

});

}

function updateStatistics(){

document.getElementById("employeesCount").textContent=

getEmployees().length;

document.getElementById("supervisorsCount").textContent=

getSupervisors().length;

document.getElementById("vehiclesCount").textContent=

getVehicles().length;

document.getElementById("plansCount").textContent=

Object.keys(plans).length;

let totalSites=0;

Object.values(plans).forEach(plan=>{

totalSites+=plan.sites.length;

});

document.getElementById("sitesCount").textContent=

totalSites;

document.getElementById("missionsCount").textContent=

JSON.parse(

localStorage.getItem("missionHistory")||"[]"

).length;

}

updateStatistics();

loadLogs();function showEmployees(){

const employees=getEmployees();

let html=`

<h2>إدارة الموظفين</h2>

<div class="toolbar">

<input
type="text"
id="employeeSearch"
placeholder="ابحث بالاسم أو رقم ID">

<button
id="addEmployeeBtn">

➕ إضافة موظف

</button>

</div>

<table class="adminTable">

<thead>

<tr>

<th>الاسم</th>

<th>رقم ID</th>

<th>السيارة</th>

<th>اللابتوب</th>

<th>تعديل</th>

<th>حذف</th>

</tr>

</thead>

<tbody>

`;

employees.forEach((emp,index)=>{

html+=`

<tr>

<td>${emp.name}</td>

<td>${emp.id}</td>

<td>${(emp.carLetters||[]).join("")} ${emp.carNumbers||""}</td>

<td>${emp.laptop||""}</td>

<td>

<button
class="editEmployee"
data-index="${index}">

✏️

</button>

</td>

<td>

<button
class="deleteEmployee"
data-id="${emp.id}">

🗑

</button>

</td>

</tr>

`;

});

html+=`

</tbody>

</table>

`;

adminContent.innerHTML=html;

}

document

.getElementById("employeesBtn")

.addEventListener(

"click",

showEmployees

);document.addEventListener("input",function(e){

if(e.target.id!=="employeeSearch"){

return;

}

const keyword=e.target.value.toLowerCase();

document.querySelectorAll(".adminTable tbody tr").forEach(row=>{

const text=row.textContent.toLowerCase();

row.style.display=text.includes(keyword)?"":"none";

});

});

document.addEventListener("click",function(e){

if(e.target.id!=="addEmployeeBtn"){

return;

}

adminContent.innerHTML=`

<h2>إضافة موظف جديد</h2>

<div class="formGrid">

<label>اسم الموظف</label>

<input type="text" id="empName">

<label>رقم ID</label>

<input type="text" id="empID">

<label>حروف السيارة</label>

<input type="text" id="empLetters" maxlength="3">

<label>أرقام السيارة</label>

<input type="text" id="empNumbers" maxlength="4">

<label>رقم اللابتوب</label>

<input type="text" id="empLaptop">

<button id="saveEmployee">

💾 حفظ الموظف

</button>

</div>

`;

});

document.addEventListener("click",function(e){

if(e.target.id!=="saveEmployee"){

return;

}

const employees=getEmployees();

const id=document.getElementById("empID").value.trim();

if(employees.some(emp=>emp.id===id)){

alert("رقم ID موجود مسبقاً.");

return;

}

saveEmployee({

name:document.getElementById("empName").value,

id:id,

carLetters:document.getElementById("empLetters").value.split(""),

carNumbers:document.getElementById("empNumbers").value,

laptop:document.getElementById("empLaptop").value

});

logAction("تمت إضافة موظف جديد.");

updateStatistics();

showEmployees();

});document.addEventListener("click",function(e){

if(e.target.classList.contains("deleteEmployee")){

const id=e.target.dataset.id;

if(!confirm("هل تريد حذف هذا الموظف؟")){

return;

}

deleteEmployee(id);

logAction("تم حذف الموظف رقم ID: "+id);

updateStatistics();

showEmployees();

}

if(e.target.classList.contains("editEmployee")){

const index=parseInt(e.target.dataset.index);

const employees=getEmployees();

const emp=employees[index];

adminContent.innerHTML=`

<h2>تعديل بيانات الموظف</h2>

<div class="formGrid">

<label>اسم الموظف</label>

<input
type="text"
id="editEmpName"
value="${emp.name}">

<label>رقم ID</label>

<input
type="text"
id="editEmpID"
value="${emp.id}"
readonly>

<label>حروف السيارة</label>

<input
type="text"
id="editEmpLetters"
maxlength="3"
value="${(emp.carLetters||[]).join("")}">

<label>أرقام السيارة</label>

<input
type="text"
id="editEmpNumbers"
maxlength="4"
value="${emp.carNumbers||""}">

<label>رقم اللابتوب</label>

<input
type="text"
id="editEmpLaptop"
value="${emp.laptop||""}">

<button
id="updateEmployee">

💾 حفظ التعديلات

</button>

</div>

`;

document.getElementById("updateEmployee").addEventListener("click",function(){

saveEmployee({

name:document.getElementById("editEmpName").value,

id:emp.id,

carLetters:document.getElementById("editEmpLetters").value.split(""),

carNumbers:document.getElementById("editEmpNumbers").value,

laptop:document.getElementById("editEmpLaptop").value

});

logAction("تم تعديل بيانات الموظف: "+emp.name);

updateStatistics();

showEmployees();

});

}

});function showVehicles(){

const vehicles=getVehicles();

let html=`

<h2>إدارة السيارات</h2>

<div class="toolbar">

<input
type="text"
id="vehicleSearch"
placeholder="ابحث بحروف أو رقم اللوحة">

<button
id="addVehicleBtn">

➕ إضافة سيارة

</button>

</div>

<table class="adminTable">

<thead>

<tr>

<th>حروف اللوحة</th>

<th>رقم اللوحة</th>

<th>تعديل</th>

<th>حذف</th>

</tr>

</thead>

<tbody>

`;

vehicles.forEach((car,index)=>{

html+=`

<tr>

<td>${car.letters}</td>

<td>${car.numbers}</td>

<td>

<button
class="editVehicle"
data-index="${index}">

✏️

</button>

</td>

<td>

<button
class="deleteVehicle"
data-letters="${car.letters}"
data-numbers="${car.numbers}">

🗑

</button>

</td>

</tr>

`;

});

html+=`

</tbody>

</table>

`;

adminContent.innerHTML=html;

}

document

.getElementById("vehiclesBtn")

.addEventListener(

"click",

showVehicles

);document.addEventListener("input",function(e){

if(e.target.id!=="vehicleSearch"){

return;

}

const keyword=e.target.value.toLowerCase();

document.querySelectorAll(".adminTable tbody tr").forEach(row=>{

const text=row.textContent.toLowerCase();

row.style.display=text.includes(keyword)?"":"none";

});

});

document.addEventListener("click",function(e){

if(e.target.id==="addVehicleBtn"){

adminContent.innerHTML=`

<h2>إضافة سيارة جديدة</h2>

<div class="formGrid">

<label>حروف اللوحة</label>

<input
type="text"
id="carLetters"
maxlength="3">

<label>رقم اللوحة</label>

<input
type="text"
id="carNumbers"
maxlength="4">

<button
id="saveVehicle">

💾 حفظ السيارة

</button>

</div>

`;

return;

}

if(e.target.id==="saveVehicle"){

const letters=document.getElementById("carLetters").value.trim();

const numbers=document.getElementById("carNumbers").value.trim();

const vehicles=getVehicles();

if(vehicles.some(v=>v.letters===letters&&v.numbers===numbers)){

alert("السيارة مسجلة مسبقاً.");

return;

}

saveVehicle({

letters:letters,

numbers:numbers

});

logAction("تمت إضافة سيارة جديدة.");

updateStatistics();

showVehicles();

return;

}

if(e.target.classList.contains("deleteVehicle")){

if(!confirm("هل تريد حذف السيارة؟")){

return;

}

deleteVehicle(

e.target.dataset.letters,

e.target.dataset.numbers

);

logAction("تم حذف سيارة.");

updateStatistics();

showVehicles();

}

});document.addEventListener("click",function(e){

if(e.target.classList.contains("editVehicle")){

const index=parseInt(e.target.dataset.index);

const vehicles=getVehicles();

const car=vehicles[index];

adminContent.innerHTML=`

<h2>تعديل بيانات السيارة</h2>

<div class="formGrid">

<label>حروف اللوحة</label>

<input
type="text"
id="editCarLetters"
maxlength="3"
value="${car.letters}">

<label>رقم اللوحة</label>

<input
type="text"
id="editCarNumbers"
maxlength="4"
value="${car.numbers}">

<button
id="updateVehicle">

💾 حفظ التعديلات

</button>

</div>

`;

document.getElementById("updateVehicle").addEventListener("click",function(){

saveVehicle({

letters:document.getElementById("editCarLetters").value.trim(),

numbers:document.getElementById("editCarNumbers").value.trim()

});

logAction("تم تعديل بيانات السيارة.");

updateStatistics();

showVehicles();

});

}

});function showSupervisors(){

const supervisors=getSupervisors();

let html=`

<h2>إدارة المشرفين</h2>

<div class="toolbar">

<input
type="text"
id="supervisorSearch"
placeholder="ابحث بالاسم أو رقم ID">

<button
id="addSupervisorBtn">

➕ إضافة مشرف

</button>

</div>

<table class="adminTable">

<thead>

<tr>

<th>اسم المشرف</th>

<th>رقم ID</th>

<th>تعديل</th>

<th>حذف</th>

</tr>

</thead>

<tbody>

`;

supervisors.forEach((sup,index)=>{

html+=`

<tr>

<td>${sup.name}</td>

<td>${sup.id}</td>

<td>

<button
class="editSupervisor"
data-index="${index}">

✏️

</button>

</td>

<td>

<button
class="deleteSupervisor"
data-id="${sup.id}">

🗑

</button>

</td>

</tr>

`;

});

html+=`

</tbody>

</table>

`;

adminContent.innerHTML=html;

}

document

.getElementById("supervisorsBtn")

.addEventListener(

"click",

showSupervisors

);document.addEventListener("input",function(e){

if(e.target.id!=="supervisorSearch"){

return;

}

const keyword=e.target.value.toLowerCase();

document.querySelectorAll(".adminTable tbody tr").forEach(row=>{

const text=row.textContent.toLowerCase();

row.style.display=text.includes(keyword)?"":"none";

});

});

document.addEventListener("click",function(e){

if(e.target.id==="addSupervisorBtn"){

adminContent.innerHTML=`

<h2>إضافة مشرف جديد</h2>

<div class="formGrid">

<label>اسم المشرف</label>

<input
type="text"
id="supName">

<label>رقم ID</label>

<input
type="text"
id="supID">

<button
id="saveSupervisor">

💾 حفظ المشرف

</button>

</div>

`;

return;

}

if(e.target.id==="saveSupervisor"){

const supervisors=getSupervisors();

const id=document.getElementById("supID").value.trim();

if(supervisors.some(s=>s.id===id)){

alert("رقم ID موجود مسبقاً.");

return;

}

saveSupervisor({

name:document.getElementById("supName").value,

id:id

});

logAction("تمت إضافة مشرف جديد.");

updateStatistics();

showSupervisors();

return;

}

if(e.target.classList.contains("deleteSupervisor")){

if(!confirm("هل تريد حذف هذا المشرف؟")){

return;

}

deleteSupervisor(e.target.dataset.id);

logAction("تم حذف مشرف.");

updateStatistics();

showSupervisors();

}

});document.addEventListener("click",function(e){

if(e.target.classList.contains("editSupervisor")){

const index=parseInt(e.target.dataset.index);

const supervisors=getSupervisors();

const sup=supervisors[index];

adminContent.innerHTML=`

<h2>تعديل بيانات المشرف</h2>

<div class="formGrid">

<label>اسم المشرف</label>

<input
type="text"
id="editSupName"
value="${sup.name}">

<label>رقم ID</label>

<input
type="text"
id="editSupID"
value="${sup.id}"
readonly>

<button
id="updateSupervisor">

💾 حفظ التعديلات

</button>

</div>

`;

document.getElementById("updateSupervisor").addEventListener("click",function(){

saveSupervisor({

name:document.getElementById("editSupName").value,

id:sup.id

});

logAction("تم تعديل بيانات المشرف: "+sup.name);

updateStatistics();

showSupervisors();

});

}

});function showPlans(){

let html=`

<h2>إدارة الخطط</h2>

<div class="toolbar">

<button id="addPlanBtn">

➕ إضافة خطة

</button>

</div>

<table class="adminTable">

<thead>

<tr>

<th>رقم الخطة</th>

<th>اسم المسار</th>

<th>عدد المواقع</th>

<th>إدارة المواقع</th>

<th>تعديل</th>

</tr>

</thead>

<tbody>

`;

Object.values(plans).forEach(plan=>{

html+=`

<tr>

<td>${plan.number}</td>

<td>${plan.name}</td>

<td>${plan.sites.length}</td>

<td>

<button
class="manageSites"
data-plan="${plan.number}">

📍 المواقع

</button>

</td>

<td>

<button
class="editPlan"
data-plan="${plan.number}">

✏️

</button>

</td>

</tr>

`;

});

html+=`

</tbody>

</table>

`;

adminContent.innerHTML=html;

}

document

.getElementById("plansBtn")

.addEventListener(

"click",

showPlans

);document.addEventListener("click",function(e){

if(e.target.classList.contains("editPlan")){

const planNumber=e.target.dataset.plan;

const plan=plans[planNumber];

adminContent.innerHTML=`

<h2>تعديل بيانات الخطة</h2>

<div class="formGrid">

<label>رقم الخطة</label>

<input
type="text"
value="${plan.number}"
readonly>

<label>اسم المسار</label>

<input
type="text"
id="planName"
value="${plan.name}">

<button
id="savePlan"
data-plan="${plan.number}">

💾 حفظ التعديلات

</button>

</div>

`;

return;

}

if(e.target.id==="savePlan"){

const planNumber=e.target.dataset.plan;

plans[planNumber].name=

document.getElementById("planName").value;

logAction("تم تعديل اسم الخطة رقم "+planNumber);

showPlans();

updateStatistics();

return;

}

if(e.target.id==="addPlanBtn"){

adminContent.innerHTML=`

<h2>إضافة خطة جديدة</h2>

<div class="formGrid">

<label>رقم الخطة</label>

<input
type="number"
id="newPlanNumber">

<label>اسم المسار</label>

<input
type="text"
id="newPlanName">

<button
id="createPlan">

💾 إنشاء الخطة

</button>

</div>

`;

return;

}

if(e.target.id==="createPlan"){

const number=

document.getElementById("newPlanNumber").value;

const name=

document.getElementById("newPlanName").value;

plans[number]={

number:Number(number),

name:name,

flash:0,

hard:0,

sites:[]

};

logAction("تم إنشاء خطة جديدة رقم "+number);

updateStatistics();

showPlans();

}

});document.addEventListener("click",function(e){

if(!e.target.classList.contains("manageSites")){

return;

}

const planNumber=e.target.dataset.plan;

const plan=plans[planNumber];

let html=`

<h2>

إدارة مواقع الخطة ${plan.number}

</h2>

<div class="toolbar">

<button
id="addSiteBtn"
data-plan="${plan.number}">

➕ إضافة موقع

</button>

</div>

<table class="adminTable">

<thead>

<tr>

<th>#</th>

<th>رمز الموقع</th>

<th>وحدة التخزين</th>

<th>XML</th>

<th>خرائط</th>

<th>تعديل</th>

<th>حذف</th>

</tr>

</thead>

<tbody>

`;

plan.sites.forEach((site,index)=>{

html+=`

<tr>

<td>${index+1}</td>

<td>${site.code}</td>

<td>${site.storage}</td>

<td>${site.xml?"يوجد":"لا يوجد"}</td>

<td>

<button
class="openMap"
data-map="${site.map}">

📍

</button>

</td>

<td>

<button
class="editSite"
data-plan="${plan.number}"
data-index="${index}">

✏️

</button>

</td>

<td>

<button
class="deleteSite"
data-plan="${plan.number}"
data-index="${index}">

🗑

</button>

</td>

</tr>

`;

});

html+=`

</tbody>

</table>

`;

adminContent.innerHTML=html;

});document.addEventListener("click",function(e){

if(e.target.id==="addSiteBtn"){

const planNumber=e.target.dataset.plan;

adminContent.innerHTML=`

<h2>إضافة موقع جديد</h2>

<div class="formGrid">

<label>رمز الموقع</label>

<input
type="text"
id="siteCode">

<label>رابط Google Maps</label>

<input
type="text"
id="siteMap">

<label>خط العرض Latitude</label>

<input
type="number"
step="any"
id="siteLat">

<label>خط الطول Longitude</label>

<input
type="number"
step="any"
id="siteLng">

<label>وحدة التخزين</label>

<select id="siteStorage">

<option>فلاش</option>

<option>2 فلاش</option>

<option>3 فلاشات</option>

<option>هارديسك</option>

<option>يسحب يدوي</option>

<option>أونلاين</option>

</select>

<label>XML</label>

<select id="siteXML">

<option value="true">يوجد</option>

<option value="false">لا يوجد</option>

</select>

<button
id="saveSite"
data-plan="${planNumber}">

💾 حفظ الموقع

</button>

</div>

`;

return;

}

if(e.target.id==="saveSite"){

const planNumber=e.target.dataset.plan;

plans[planNumber].sites.push({

code:document.getElementById("siteCode").value,

storage:document.getElementById("siteStorage").value,

xml:document.getElementById("siteXML").value==="true",

map:document.getElementById("siteMap").value,

lat:parseFloat(document.getElementById("siteLat").value),

lng:parseFloat(document.getElementById("siteLng").value),

status:"working"

});

logAction("تمت إضافة موقع جديد للخطة "+planNumber);

updateStatistics();

showPlans();

}

});document.addEventListener("click",function(e){

if(e.target.classList.contains("deleteSite")){

const planNumber=e.target.dataset.plan;

const index=parseInt(e.target.dataset.index);

if(!confirm("هل تريد حذف هذا الموقع؟")){

return;

}

plans[planNumber].sites.splice(index,1);

logAction("تم حذف موقع من الخطة "+planNumber);

updateStatistics();

showPlans();

return;

}

if(e.target.classList.contains("editSite")){

const planNumber=e.target.dataset.plan;

const index=parseInt(e.target.dataset.index);

const site=plans[planNumber].sites[index];

adminContent.innerHTML=`

<h2>تعديل بيانات الموقع</h2>

<div class="formGrid">

<label>رمز الموقع</label>

<input
type="text"
id="editSiteCode"
value="${site.code}">

<label>رابط Google Maps</label>

<input
type="text"
id="editSiteMap"
value="${site.map}">

<label>Latitude</label>

<input
type="number"
step="any"
id="editSiteLat"
value="${site.lat||""}">

<label>Longitude</label>

<input
type="number"
step="any"
id="editSiteLng"
value="${site.lng||""}">

<label>وحدة التخزين</label>

<select id="editSiteStorage">

<option ${site.storage==="فلاش"?"selected":""}>فلاش</option>

<option ${site.storage==="2 فلاش"?"selected":""}>2 فلاش</option>

<option ${site.storage==="3 فلاشات"?"selected":""}>3 فلاشات</option>

<option ${site.storage==="هارديسك"?"selected":""}>هارديسك</option>

<option ${site.storage==="يسحب يدوي"?"selected":""}>يسحب يدوي</option>

<option ${site.storage==="أونلاين"?"selected":""}>أونلاين</option>

</select>

<label>XML</label>

<select id="editSiteXML">

<option value="true" ${site.xml?"selected":""}>يوجد</option>

<option value="false" ${!site.xml?"selected":""}>لا يوجد</option>

</select>

<button
id="updateSite"
data-plan="${planNumber}"
data-index="${index}">

💾 حفظ التعديلات

</button>

</div>

`;

}

});document.addEventListener("click",function(e){

if(e.target.id!=="updateSite"){

return;

}

const planNumber=e.target.dataset.plan;

const index=parseInt(e.target.dataset.index);

plans[planNumber].sites[index]={

code:document.getElementById("editSiteCode").value,

storage:document.getElementById("editSiteStorage").value,

xml:document.getElementById("editSiteXML").value==="true",

map:document.getElementById("editSiteMap").value,

lat:parseFloat(document.getElementById("editSiteLat").value),

lng:parseFloat(document.getElementById("editSiteLng").value),

status:"working"

};

logAction("تم تعديل الموقع "+plans[planNumber].sites[index].code);

updateStatistics();

showPlans();

}

if(e.target.classList.contains("openMap")){

const map=e.target.dataset.map;

if(map){

window.open(map,"_blank");

}else{

alert("لا يوجد رابط Google Maps لهذا الموقع.");

}

}

});document.getElementById("backupBtn").addEventListener("click",function(){

const backup={

employees:getEmployees(),

supervisors:getSupervisors(),

vehicles:getVehicles(),

laptops:getLaptops(),

plans:plans,

history:JSON.parse(

localStorage.getItem("missionHistory")||"[]"

),

logs:JSON.parse(

localStorage.getItem("systemLogs")||"[]"

),

date:new Date().toLocaleString("ar-SA")

};

const data=JSON.stringify(backup,null,2);

const blob=new Blob([data],{

type:"application/json"

});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="CCTV_Backup.json";

a.click();

URL.revokeObjectURL(url);

logAction("تم إنشاء نسخة احتياطية للنظام.");

});document.getElementById("restoreBtn").addEventListener("click",function(){

const input=document.createElement("input");

input.type="file";

input.accept=".json";

input.onchange=function(){

const file=input.files[0];

if(!file){

return;

}

const reader=new FileReader();

reader.onload=function(){

try{

const backup=JSON.parse(reader.result);

localStorage.setItem(

"employees",

JSON.stringify(backup.employees||[])

);

localStorage.setItem(

"supervisors",

JSON.stringify(backup.supervisors||[])

);

localStorage.setItem(

"vehicles",

JSON.stringify(backup.vehicles||[])

);

localStorage.setItem(

"laptops",

JSON.stringify(backup.laptops||[])

);

localStorage.setItem(

"missionHistory",

JSON.stringify(backup.history||[])

);

localStorage.setItem(

"systemLogs",

JSON.stringify(backup.logs||[])

);

if(backup.plans){

Object.keys(backup.plans).forEach(key=>{

plans[key]=backup.plans[key];

});

}

logAction("تمت استعادة نسخة احتياطية.");

updateStatistics();

alert("تمت استعادة النسخة الاحتياطية بنجاح.");

location.reload();

}catch(error){

alert("ملف النسخة الاحتياطية غير صالح.");

}

};

reader.readAsText(file);

};

input.click();

});
