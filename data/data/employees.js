const employees = [

{

name:"",

id:"",

carLetters:["","",""],

carNumbers:"",

laptop:""

}

];

function saveEmployee(employee){

const list=JSON.parse(localStorage.getItem("employees")||"[]");

const index=list.findIndex(e=>e.id===employee.id);

if(index>=0){

list[index]=employee;

}else{

list.push(employee);

}

localStorage.setItem("employees",JSON.stringify(list));

}

function getEmployees(){

return JSON.parse(localStorage.getItem("employees")||"[]");

}

function searchEmployee(text){

const list=getEmployees();

return list.filter(emp=>

emp.name.includes(text)

);

}
