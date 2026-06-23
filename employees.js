const employees = [];

function getEmployees() {
    return JSON.parse(localStorage.getItem("employees")) || [];
}

function saveEmployee(employee) {

    let list = getEmployees();

    const index = list.findIndex(item => item.id === employee.id);

    if (index >= 0) {

        list[index] = employee;

    } else {

        list.push(employee);

    }

    localStorage.setItem("employees", JSON.stringify(list));

}

function deleteEmployee(id) {

    let list = getEmployees();

    list = list.filter(item => item.id !== id);

    localStorage.setItem("employees", JSON.stringify(list));

}

function searchEmployee(keyword) {

    const list = getEmployees();

    return list.filter(item =>
        item.name.includes(keyword) ||
        item.id.includes(keyword)
    );

}
