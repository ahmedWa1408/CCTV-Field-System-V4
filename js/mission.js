const selectedPlan = localStorage.getItem("selectedPlan");

if (!selectedPlan) {
    window.location.href = "index.html";
}

const currentPlan = plans[selectedPlan];

const planNumber = document.getElementById("planNumber");
const routeName = document.getElementById("routeName");
const sitesTable = document.getElementById("sitesTable");
const progressFill = document.getElementById("progressFill");
const progressValue = document.getElementById("progressValue");
const currentLocation = document.getElementById("currentLocation");

planNumber.value = currentPlan.number;
routeName.value = currentPlan.name;

function updateClock() {

    const now = new Date();

    document.getElementById("liveTime").textContent =
        now.toLocaleTimeString("ar-SA");

    document.getElementById("todayDate").textContent =
        now.toLocaleDateString("ar-SA");

    document.getElementById("todayName").textContent =
        now.toLocaleDateString("ar-SA", {
            weekday: "long"
        });

}

updateClock();

setInterval(updateClock, 1000);

sitesTable.innerHTML = "";currentPlan.sites.forEach((site, index) => {

    const row = document.createElement("tr");

    row.innerHTML = `

    <td>${index + 1}</td>

    <td class="siteCode">${site.code}</td>

    <td>
        <button class="mapBtn"
        onclick="openMap('${site.map}')">
        📍 فتح الموقع
        </button>
    </td>

    <td class="arrivalCell">
        🔴 لم يصل
    </td>

    <td>
        <select class="statusSelect">

            <option value="working">🟢 يعمل</option>

            <option value="notworking">🟠 لا يعمل</option>

            <option value="workingClean">🟤 يعمل ولا توجد مخالفات</option>

            <option value="notworkingViolation">🟣 لا يعمل وتوجد مخالفات</option>

            <option value="notworkingClean">🔴 لا يعمل ولا توجد مخالفات</option>

        </select>
    </td>

    <td>
        <select class="storageSelect">

            <option ${site.storage==="فلاش"?"selected":""}>فلاش</option>

            <option ${site.storage==="2 فلاش"?"selected":""}>2 فلاش</option>

            <option ${site.storage==="3 فلاشات"?"selected":""}>3 فلاشات</option>

            <option ${site.storage==="هارديسك"?"selected":""}>هارديسك</option>

            <option ${site.storage==="يسحب يدوي"?"selected":""}>يسحب يدوي</option>

            <option ${site.storage==="أونلاين"?"selected":""}>أونلاين</option>

        </select>
    </td>

    <td>
        <input type="datetime-local" class="startFolder">
    </td>

    <td>
        <input type="datetime-local" class="endFolder" readonly>
    </td>

    <td>
        <input type="text" class="watchHours" placeholder="تحسب تلقائياً ويمكن تعديلها">
    </td>
    `;    row.innerHTML += `

    <td>

        <select class="xmlSelect">

            <option ${site.xml ? "selected" : ""}>يوجد</option>

            <option ${!site.xml ? "selected" : ""}>لا يوجد</option>

        </select>

    </td>

    <td>

        <input
        type="file"
        class="imageUpload"
        accept="image/*"
        multiple>

    </td>

    <td>

        <textarea
        class="noteBox"
        placeholder="اكتب الملاحظات..."></textarea>

    </td>

    <td>

        <button class="approveSite">

            ✔

        </button>

    </td>

    `;

    sitesTable.appendChild(row);

});

updateProgress();function openMap(link){

    if(!link){

        alert("رابط الموقع غير متوفر.");

        return;

    }

    window.open(link,"_blank");

}

function updateProgress(){

    const buttons=document.querySelectorAll(".approveSite");

    let completed=0;

    buttons.forEach(btn=>{

        if(btn.classList.contains("done")){

            completed++;

        }

    });

    const total=buttons.length;

    const percent=total===0?0:Math.round((completed/total)*100);

    progressFill.style.width=percent+"%";

    progressValue.textContent=percent+"%";

    currentLocation.textContent=completed+" / "+total;

}function getDistance(lat1, lon1, lat2, lon2){

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;

    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =

    Math.sin(dLat / 2) * Math.sin(dLat / 2) +

    Math.cos(lat1 * Math.PI / 180) *

    Math.cos(lat2 * Math.PI / 180) *

    Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;

}

function checkArrival(userLat,userLng){

    const rows=document.querySelectorAll("#sitesTable tr");

    rows.forEach((row,index)=>{

        const site=currentPlan.sites[index];

        if(!site.lat || !site.lng){

            return;

        }

        const distance=getDistance(

            userLat,

            userLng,

            site.lat,

            site.lng

        );

        const cell=row.querySelector(".arrivalCell");

        if(distance<=5){

            cell.innerHTML="🟢 تم الوصول";

            cell.style.color="#0b8c4f";

        }else{

            cell.innerHTML="🔴 لم يصل";

            cell.style.color="#d62828";

        }

    });

}function updateGPS(){

    if(!navigator.geolocation){

        alert("هذا الجهاز لا يدعم خدمة الموقع.");

        return;

    }

    navigator.geolocation.watchPosition(

    function(position){

        const lat=position.coords.latitude;

        const lng=position.coords.longitude;

        const speed=position.coords.speed;

        document.getElementById("gpsStatus").textContent="متصل";

        if(speed!==null){

            document.getElementById("speedNow").textContent=

            Math.round(speed*3.6)+" كم/س";

        }else{

            document.getElementById("speedNow").textContent=

            "0 كم/س";

        }

        checkArrival(lat,lng);

    },

    function(){

        document.getElementById("gpsStatus").textContent=

        "غير متصل";

    },

    {

        enableHighAccuracy:true,

        maximumAge:5000,

        timeout:10000

    });

}

updateGPS();document.addEventListener("change",function(e){

    if(!e.target.classList.contains("statusSelect")){

        return;

    }

    const row=e.target.closest("tr");

    const status=e.target.value;

    const image=row.querySelector(".imageUpload");

    const note=row.querySelector(".noteBox");

    row.classList.remove(

        "rowWorking",

        "rowNotWorking",

        "rowWorkingNoViolation",

        "rowNotWorkingViolation",

        "rowNotWorkingNoViolation"

    );

    switch(status){

        case "working":

            row.classList.add("rowWorking");

            image.required=false;

            note.required=false;

        break;

        case "notworking":

            row.classList.add("rowNotWorking");

            image.required=true;

            note.required=true;

        break;

        case "workingClean":

            row.classList.add("rowWorkingNoViolation");

            image.required=false;

            note.required=false;

        break;

        case "notworkingViolation":

            row.classList.add("rowNotWorkingViolation");

            image.required=true;

            note.required=true;

        break;

        case "notworkingClean":

            row.classList.add("rowNotWorkingNoViolation");

            image.required=false;

            note.required=true;

        break;

    }

});function validateSite(row){

    const status=row.querySelector(".statusSelect").value;

    const image=row.querySelector(".imageUpload");

    const note=row.querySelector(".noteBox");

    if(status==="notworking" || status==="notworkingViolation"){

        if(image.files.length===0){

            alert("يجب إرفاق صورة.");

            return false;

        }

        if(note.value.trim()===""){

            alert("يجب كتابة ملاحظة.");

            return false;

        }

    }

    if(status==="notworkingClean"){

        if(note.value.trim()===""){

            alert("يجب كتابة ملاحظة.");

            return false;

        }

    }

    return true;

}

document.addEventListener("click",function(e){

    if(!e.target.classList.contains("approveSite")){

        return;

    }

    const row=e.target.closest("tr");

    if(!validateSite(row)){

        return;

    }

    const start=row.querySelector(".startFolder");

    const end=row.querySelector(".endFolder");

    const watch=row.querySelector(".watchHours");

    end.value=new Date().toISOString().slice(0,16);

    if(start.value){

        const begin=new Date(start.value);

        const finish=new Date(end.value);

        const diff=finish-begin;

        const hours=Math.floor(diff/3600000);

        const minutes=Math.floor((diff%3600000)/60000);

        watch.value=

        hours.toString().padStart(2,"0")

        +":"

        +

        minutes.toString().padStart(2,"0");

    }

    e.target.classList.add("done");

    e.target.disabled=true;

    e.target.innerHTML="✔";

    updateProgress();

});function saveMission(){

    const mission={

        plan:selectedPlan,

        route:currentPlan.name,

        operator:document.getElementById("operatorName").value,

        operatorID:document.getElementById("operatorID").value,

        supervisor:document.getElementById("supervisorName").value,

        supervisorID:document.getElementById("supervisorID").value,

        laptop:document.getElementById("laptopNumber").value,

        plateLetters:[

            document.querySelectorAll(".plateLetter")[0].value,

            document.querySelectorAll(".plateLetter")[1].value,

            document.querySelectorAll(".plateLetter")[2].value

        ],

        plateNumber:document.querySelector(".plateNumber").value,

        progress:progressValue.textContent,

        table:sitesTable.innerHTML,

        saveTime:new Date().toISOString()

    };

    localStorage.setItem(

        "mission_"+selectedPlan,

        JSON.stringify(mission)

    );

}

function loadMission(){

    const saved=

    localStorage.getItem("mission_"+selectedPlan);

    if(!saved){

        return;

    }

    const mission=JSON.parse(saved);

    document.getElementById("operatorName").value=mission.operator;

    document.getElementById("operatorID").value=mission.operatorID;

    document.getElementById("supervisorName").value=mission.supervisor;

    document.getElementById("supervisorID").value=mission.supervisorID;

    document.getElementById("laptopNumber").value=mission.laptop;

    document.querySelectorAll(".plateLetter")[0].value=mission.plateLetters[0];

    document.querySelectorAll(".plateLetter")[1].value=mission.plateLetters[1];

    document.querySelectorAll(".plateLetter")[2].value=mission.plateLetters[2];

    document.querySelector(".plateNumber").value=mission.plateNumber;

    progressValue.textContent=mission.progress;

    sitesTable.innerHTML=mission.table;

}

loadMission();

setInterval(saveMission,5000);

window.addEventListener("beforeunload",saveMission);function finishMission(){

    saveMission();

    const history = JSON.parse(

        localStorage.getItem("missionHistory") || "[]"

    );

    history.unshift({

        plan: selectedPlan,

        route: currentPlan.name,

        operator: document.getElementById("operatorName").value,

        operatorID: document.getElementById("operatorID").value,

        supervisor: document.getElementById("supervisorName").value,

        supervisorID: document.getElementById("supervisorID").value,

        vehicle:

        document.querySelectorAll(".plateLetter")[0].value+

        document.querySelectorAll(".plateLetter")[1].value+

        document.querySelectorAll(".plateLetter")[2].value+

        " "+

        document.querySelector(".plateNumber").value,

        laptop:

        document.getElementById("laptopNumber").value,

        progress:

        progressValue.textContent,

        finishDate:

        new Date().toLocaleString("ar-SA")

    });

    localStorage.setItem(

        "missionHistory",

        JSON.stringify(history)

    );

    localStorage.removeItem(

        "mission_"+selectedPlan

    );

    alert("تم إنهاء المهمة بنجاح");

    window.location.href="index.html";

}

document.querySelector(".finishBtn")

.addEventListener(

    "click",

    finishMission

);
