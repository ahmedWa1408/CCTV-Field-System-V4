const adminContent=document.getElementById("adminContent");

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

updateStatistics();document.getElementById("employeesBtn").addEventListener("click",function(){

const employees=getEmployees();

let html=`

<h2>إدارة الموظفين</h2>

<div class="toolbar">

<input
type="text"
id="employeeSearch"
placeholder="ابحث بالاسم أو رقم ID">

<button id="newEmployee">

➕ إضافة موظف

</button>

</div>

<table class="adminTable">

<thead>

<tr>

<th>الاسم</th>

<th>ID</th>

<th>السيارة</th>

<th>اللابتوب</th>

<th>تعديل</th>

<th>حذف</th>

</tr>

</thead>

<tbody>

`;

employees.forEach((emp,index)=>{

const letters=(emp.carLetters||[]).join("");

const numbers=emp.carNumbers||"";

const laptop=emp.laptop||"";

html+=`

<tr>

<td>${emp.name}</td>

<td>${emp.id}</td>

<td>${letters} ${numbers}</td>

<td>${laptop}</td>

<td>

<button class="editEmployee"

data-index="${index}">

✏️

</button>

</td>

<td>

<button class="deleteEmployee"

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

});document.addEventListener("click",function(e){

if(e.target.classList.contains("deleteEmployee")){

const id=e.target.dataset.id;

if(!confirm("هل تريد حذف هذا الموظف؟")){

return;

}

deleteEmployee(id);

updateStatistics();

document.getElementById("employeesBtn").click();

}

if(e.target.classList.contains("editEmployee")){

const index=e.target.dataset.index;

const employees=getEmployees();

const emp=employees[index];

adminContent.innerHTML=`

<h2>تعديل بيانات الموظف</h2>

<div class="formGrid">

<label>اسم الموظف</label>

<input
type="text"
id="editName"
value="${emp.name}">

<label>رقم ID</label>

<input
type="text"
id="editID"
value="${emp.id}">

<label>حروف السيارة</label>

<input
type="text"
id="editLetters"
value="${(emp.carLetters||[]).join('')}">

<label>أرقام السيارة</label>

<input
type="text"
id="editNumbers"
value="${emp.carNumbers||""}">

<label>رقم اللابتوب</label>

<input
type="text"
id="editLaptop"
value="${emp.laptop||""}">

<button id="saveEmployeeEdit">

💾 حفظ التعديلات

</button>

`;

document.getElementById("saveEmployeeEdit").addEventListener("click",function(){

saveEmployee({

name:document.getElementById("editName").value,

id:document.getElementById("editID").value,

carLetters:

document.getElementById("editLetters").value.split(""),

carNumbers:

document.getElementById("editNumbers").value,

laptop:

document.getElementById("editLaptop").value

});

alert("تم حفظ التعديلات");

updateStatistics();

document.getElementById("employeesBtn").click();

});

}

});document.addEventListener("input",function(e){

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

if(e.target.id!=="newEmployee"){

return;

}

adminContent.innerHTML=`

<h2>إضافة موظف جديد</h2>

<div class="formGrid">

<label>اسم الموظف</label>

<input type="text" id="newName">

<label>رقم ID</label>

<input type="text" id="newID">

<label>حروف السيارة</label>

<input type="text" id="newLetters" maxlength="3">

<label>أرقام السيارة</label>

<input type="text" id="newNumbers" maxlength="4">

<label>رقم اللابتوب</label>

<input type="text" id="newLaptop">

<button id="saveNewEmployee">

💾 حفظ الموظف

</button>

</div>

`;

});

document.addEventListener("click",function(e){

if(e.target.id!=="saveNewEmployee"){

return;

}

saveEmployee({

name:document.getElementById("newName").value,

id:document.getElementById("newID").value,

carLetters:document.getElementById("newLetters").value.split(""),

carNumbers:document.getElementById("newNumbers").value,

laptop:document.getElementById("newLaptop").value

});

alert("تمت إضافة الموظف بنجاح");

updateStatistics();

document.getElementById("employeesBtn").click();

});document.getElementById("vehiclesBtn").addEventListener("click",function(){

const vehicles=getVehicles();

let html=`

<h2>إدارة السيارات</h2>

<div class="toolbar">

<input
type="text"
id="vehicleSearch"
placeholder="ابحث برقم أو حروف السيارة">

<button id="newVehicle">

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

});

document.addEventListener("click",function(e){

if(!e.target.classList.contains("deleteVehicle")){

return;

}

if(!confirm("هل تريد حذف السيارة؟")){

return;

}

deleteVehicle(

e.target.dataset.letters,

e.target.dataset.numbers

);

updateStatistics();

document.getElementById("vehiclesBtn").click();

});document.getElementById("supervisorsBtn").addEventListener("click",function(){

const supervisors=getSupervisors();

let html=`

<h2>إدارة المشرفين</h2>

<div class="toolbar">

<input
type="text"
id="supervisorSearch"
placeholder="ابحث بالاسم أو رقم ID">

<button id="newSupervisor">

➕ إضافة مشرف

</button>

</div>

<table class="adminTable">

<thead>

<tr>

<th>الاسم</th>

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

});

document.addEventListener("click",function(e){

if(!e.target.classList.contains("deleteSupervisor")){

return;

}

if(!confirm("هل تريد حذف هذا المشرف؟")){

return;

}

deleteSupervisor(

e.target.dataset.id

);

updateStatistics();

document.getElementById("supervisorsBtn").click();

});document.addEventListener("click",function(e){

if(e.target.id==="newSupervisor"){

adminContent.innerHTML=`

<h2>إضافة مشرف جديد</h2>

<div class="formGrid">

<label>اسم المشرف</label>

<input type="text" id="supName">

<label>رقم ID</label>

<input type="text" id="supID">

<button id="saveSupervisor">

💾 حفظ

</button>

</div>

`;

}

if(e.target.id==="saveSupervisor"){

saveSupervisor({

name:document.getElementById("supName").value,

id:document.getElementById("supID").value

});

alert("تمت إضافة المشرف");

updateStatistics();

document.getElementById("supervisorsBtn").click();

}

if(e.target.classList.contains("editSupervisor")){

const index=e.target.dataset.index;

const supervisors=getSupervisors();

const sup=supervisors[index];

adminContent.innerHTML=`

<h2>تعديل بيانات المشرف</h2>

<div class="formGrid">

<label>اسم المشرف</label>

<input type="text" id="editSupName" value="${sup.name}">

<label>رقم ID</label>

<input type="text" id="editSupID" value="${sup.id}">

<button id="updateSupervisor">

💾 حفظ التعديلات

</button>

</div>

`;

document.getElementById("updateSupervisor").addEventListener("click",function(){

saveSupervisor({

name:document.getElementById("editSupName").value,

id:document.getElementById("editSupID").value

});

alert("تم حفظ التعديلات");

updateStatistics();

document.getElementById("supervisorsBtn").click();

});

}

});document.getElementById("plansBtn").addEventListener("click",function(){

let html=`

<h2>إدارة الخطط</h2>

<table class="adminTable">

<thead>

<tr>

<th>رقم الخطة</th>

<th>اسم المسار</th>

<th>عدد المواقع</th>

<th>تعديل</th>

<th>إدارة المواقع</th>

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
class="editPlan"
data-plan="${plan.number}">

✏️

</button>

</td>

<td>

<button
class="manageSites"
data-plan="${plan.number}">

📍

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

});

document.addEventListener("click",function(e){

if(!e.target.classList.contains("editPlan")){

return;

}

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
id="editPlanName"
value="${plan.name}">

<button
id="savePlan"
data-plan="${plan.number}">

💾 حفظ

</button>

</div>

`;

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

<button
id="newSite"
data-plan="${plan.number}">

➕ إضافة موقع

</button>

<table class="adminTable">

<thead>

<tr>

<th>رمز الموقع</th>

<th>وحدة التخزين</th>

<th>XML</th>

<th>خرائط Google</th>

<th>تعديل</th>

<th>حذف</th>

</tr>

</thead>

<tbody>

`;

plan.sites.forEach((site,index)=>{

html+=`

<tr>

<td>${site.code}</td>

<td>${site.storage}</td>

<td>${site.xml?"يوجد":"لا يوجد"}</td>

<td>

<button

class="openSiteMap"

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

if(e.target.id==="newSite"){

const planNumber=e.target.dataset.plan;

adminContent.innerHTML=`

<h2>إضافة موقع جديد</h2>

<div class="formGrid">

<label>رمز الموقع</label>
<input type="text" id="siteCode">

<label>رابط Google Maps</label>
<input type="text" id="siteMap">

<label>خط العرض (Latitude)</label>
<input type="number" step="any" id="siteLat">

<label>خط الطول (Longitude)</label>
<input type="number" step="any" id="siteLng">

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

<button id="saveSite"

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

alert("تمت إضافة الموقع بنجاح");

updateStatistics();

document.querySelector(

'.manageSites[data-plan="'+planNumber+'"]'

)?.click();

}

if(e.target.classList.contains("deleteSite")){

const planNumber=e.target.dataset.plan;

const index=parseInt(e.target.dataset.index);

if(!confirm("هل تريد حذف هذا الموقع؟")){

return;

}

plans[planNumber].sites.splice(index,1);

alert("تم حذف الموقع");

updateStatistics();

document.querySelector(

'.manageSites[data-plan="'+planNumber+'"]'

)?.click();

}

if(e.target.classList.contains("openSiteMap")){

const map=e.target.dataset.map;

if(map){

window.open(map,"_blank");

}else{

alert("لا يوجد رابط للموقع.");

}

}

});
