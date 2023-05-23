let totalPages = 0;
let currentPage = 1;

fetch("./js/data.json")
  .then((response) => response.json())
  .then((data) => {
    totalPages = Math.ceil(data.length / 10);

    const total = document.querySelector("h3");
    total.textContent = "Total: " + data.length;

    const items = 10;

    presentItems(data);

    createPagination();

    function presentItems(data) {
      const start = (currentPage - 1) * items;
      const end = start + items;

      const itemsOnPage = data.slice(start, end);
      const list = document.querySelector("ul");
      list.innerHTML='';

    itemsOnPage.forEach((item) => {
      var newItem = document.createElement("li");
      newItem.className = "contact-item cf";
      var newDiv = document.createElement("div");
      newDiv.className = "contact-details";
      var newImg = document.createElement("img");
      newImg.className = "avatar";
      newImg.setAttribute("src", item.image);
      list.appendChild(newItem);
      newItem.appendChild(newDiv);
      newDiv.appendChild(newImg);
      var name = document.createElement("h3");
      name.textContent = item.name;
      newDiv.appendChild(name);
      var newSpan = document.createElement("span");
      newSpan.className = "email";
      newSpan.textContent = item.email;
      newDiv.appendChild(newSpan);
      var divDetails = document.createElement("div");
      divDetails.className = "joined-details";
      newItem.appendChild(divDetails);
      var spanJoin = document.createElement("span");
      spanJoin.className = "date";
      spanJoin.textContent = "Joined " + item.joined;
      divDetails.append(spanJoin);
      list.appendChild(newItem);
    });
  }

  function createPagination(){
    const pages = document.getElementById("pages");
    pages.innerHTML='';

    for (let page = 1; page <= totalPages; page++) {
     
      var newPage = document.createElement("li");
      pages.appendChild(newPage);
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = page;
      newPage.appendChild(link);


      if (page === currentPage) {
        link.classList.add("active");
      }

      link.addEventListener("click", () =>{
        currentPage = page;
        presentItems(data);
        createPagination();
  });
}
  }
})

  .catch((error) => {
    console.error(error);
  });
