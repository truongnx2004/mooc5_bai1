document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let name = document.querySelector("#name").value;

  let item = {
    id: new Date().toISOString(),
    name: name.trim(),
  };

  addItemtoUI(item);

  addItemtoLS(item);
});


const addItemtoUI = (item) => {

  const { id, name } = item;
  let newCard = document.createElement("div");
  newCard.className =
    "card d-flex flex-row justify-content-between p-2 mb-3 align-items-center";

  newCard.innerHTML = `
        <span>${name}</span>
        <button data-id = "${id}" class="btn btn-danger btn-sm btn-remove">Remove</button>
  `;

  document.querySelector(".list").appendChild(newCard);
};


const getList = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};


const addItemtoLS = (item) => {

  let list = getList();
  list.push(item);

  localStorage.setItem("list", JSON.stringify(list));
};


const init = () => {
  let list = getList();
  list.forEach((item) => {
    addItemtoUI(item);
  });
};
init();



document.querySelector(".list").addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remove")) {
    console.log(event.target.dataset.id);

    //lấy name
    let nameItem = event.target.previousElementSibling.innerHTML;
    let isConfirmed = confirm(`Bạn có chắc là muốn xóa item : ${nameItem} ?`);
    if (isConfirmed) {

      let idRemove = event.target.dataset.id;
      event.target.parentElement.remove();

      removeItemFromLS(idRemove);
    }
  }
});

const removeItemFromLS = (idRemove) => {
  let list = getList();

  list = list.filter((item) => item.id != idRemove);
  localStorage.setItem("list", JSON.stringify(list));

};

document.querySelector("#btn-remove-all").addEventListener("click", (event) => {
  let isConfirmed = confirm(`Bạn có chắc là muốn xóa hết item không?`);
  if (isConfirmed) {

    document.querySelector("list").innerHTML = " ";

    localStorage.removeItem("list");
  }
});


document.querySelector("#filter").addEventListener("keyup", (event) => {
  let inputValue = event.target.value;
  let list = getList();

  list = list.filter((item) => item.name.includes(inputValue));

  document.querySelector(".list").innerHTML = " ";
  list.forEach((item) => {
    addItemtoUI(item);
  });
});
