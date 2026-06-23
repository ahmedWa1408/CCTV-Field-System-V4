function getVehicles() {
    return JSON.parse(localStorage.getItem("vehicles")) || [];
}

function saveVehicle(vehicle) {

    let list = getVehicles();

    const index = list.findIndex(item =>
        item.letters === vehicle.letters &&
        item.numbers === vehicle.numbers
    );

    if (index >= 0) {

        list[index] = vehicle;

    } else {

        list.push(vehicle);

    }

    localStorage.setItem("vehicles", JSON.stringify(list));

}

function deleteVehicle(letters, numbers) {

    let list = getVehicles();

    list = list.filter(item =>
        !(item.letters === letters && item.numbers === numbers)
    );

    localStorage.setItem("vehicles", JSON.stringify(list));

}

function searchVehicle(keyword) {

    const list = getVehicles();

    return list.filter(item =>
        item.letters.includes(keyword) ||
        item.numbers.includes(keyword)
    );

}
