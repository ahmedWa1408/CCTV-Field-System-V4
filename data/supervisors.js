function getSupervisors() {
    return JSON.parse(localStorage.getItem("supervisors")) || [];
}

function saveSupervisor(supervisor) {

    let list = getSupervisors();

    const index = list.findIndex(item =>
        item.id === supervisor.id
    );

    if (index >= 0) {

        list[index] = supervisor;

    } else {

        list.push(supervisor);

    }

    localStorage.setItem("supervisors", JSON.stringify(list));

}

function deleteSupervisor(id) {

    let list = getSupervisors();

    list = list.filter(item =>
        item.id !== id
    );

    localStorage.setItem("supervisors", JSON.stringify(list));

}

function searchSupervisor(keyword) {

    const list = getSupervisors();

    return list.filter(item =>
        item.name.includes(keyword) ||
        item.id.includes(keyword)
    );

}
