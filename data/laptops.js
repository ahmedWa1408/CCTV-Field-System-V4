function getLaptops() {
    return JSON.parse(localStorage.getItem("laptops")) || [];
}

function saveLaptop(laptop) {

    let list = getLaptops();

    const index = list.findIndex(item =>
        item.number === laptop.number
    );

    if (index >= 0) {

        list[index] = laptop;

    } else {

        list.push(laptop);

    }

    localStorage.setItem("laptops", JSON.stringify(list));

}

function deleteLaptop(number) {

    let list = getLaptops();

    list = list.filter(item =>
        item.number !== number
    );

    localStorage.setItem("laptops", JSON.stringify(list));

}

function searchLaptop(keyword) {

    const list = getLaptops();

    return list.filter(item =>
        item.number.includes(keyword)
    );

}
