let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let Discounts = document.getElementById('Discounts');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'craete';
let tmp;
// get total 
function getTotal() {
  if (price.value !== '' && taxes.value !== '' && ads.value !== '') {
    let result = (+price.value + +taxes.value + +ads.value) - +Discounts.value;
    this.total.innerHTML = result;
    this.total.style.background = "#71b691";
  } else {
    this.total.innerHTML = '';
    this.total.style.background = "f1eef0";
  }
}


// craete product
let dataPro;
if(localStorage.product != null){
  dataPro = JSON.parse(localStorage.product)
}else {
   dataPro = [];
}
submit.onclick = function() {
  if (title.value === '' || price.value === '' || taxes.value === '' || ads.value === '' || Discounts.value === '' || category.value === '') {
    alert('برجاء ادخال البيانات');
    return;
  }

  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    Discounts: Discounts.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (mood === 'create') {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mood = 'create';
    submit.innerHTML = 'create';
    count.style.display = 'block';
  }
  dataPro.push(newPro);

  // save localstorage
  localStorage.setItem('product', JSON.stringify(dataPro));
  clearData();
  showData();
}
//cleardata
function clearData(){
  title.value ='';
  price.value ='';
  taxes.value='';
  ads.value ='';
  Discounts.value ='';
  total.innerHTML ='';
  count.value ='';
  category.value ='';
}
//show data
function showData(){
  let table ='';
  for(let i = 0; i < dataPro.length;i++){
    table += `
        <tr>
         <td>${i}</td>
         <td>${dataPro[i].title}</td>
         <td>${dataPro[i].price}</td>
         <td>${dataPro[i].taxes} </td>
         <td>${dataPro[i].ads} </td>
         <td>${dataPro[i].Discounts} </td>
         <td>${dataPro[i].total} </td>
         <td> ${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})"  id="update">update</button> </td>
         <td><button onclick="deletedata( ${i} )"id="delete">delete</button> </td>
         </tr>
          `
  }
  document.getElementById('tbody').innerHTML = table;
  let btnDelete = document.getElementById('deleteAll');
if(dataPro.length > 0){
  btnDelete.innerHTML = `<button onclick="deleteAll()" id="deleteAll">delete All (${dataPro.length})</button>`;
} else {
  btnDelete.innerHTML = '';
}
  }
showData();
// delete dataPro
function deletedata(i)
{
  dataPro.splice(i,1);
  localStorage.product =JSON.stringify(dataPro);
  showData();
}
//deleteAll
function deleteAll(){
  if (dataPro.length === 0) {
    return; // لا يوجد بيانات لحذفها
  }

  if (confirm("هل أنت متأكد من حذف جميع المنتجات؟")) {
    localStorage.clear();
    dataPro.splice(0);
    //Refresh showData
    showData();
  }
}
// update 
function updateData(i){
  title.value = dataPro[i].title;
  price.value  = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  Discounts.value = dataPro[i].Discounts;
  getTotal()
  count.style.display ='none';
  category.value = dataPro[i].category;
  submit.innerHTML ='update';
  mood ='update';
  tmp = i ;
  
}

//search gpt
function search() {
  let searchValue = document.getElementById("search").value.toLowerCase();
  let searchResult = [];

  for (let i = 0; i < dataPro.length; i++) {
    if (
      dataPro[i].title.toLowerCase().includes(searchValue) ||
      dataPro[i].category.toLowerCase().includes(searchValue)
    ) {
      searchResult.push(dataPro[i]);
    }
  }

  let table = "";
  for (let i = 0; i < searchResult.length; i++) {
    table += `
        <tr>
         <td>${i}</td>
         <td>${searchResult[i].title}</td>
         <td>${searchResult[i].price}</td>
         <td>${searchResult[i].taxes} </td>
         <td>${searchResult[i].ads} </td>
         <td>${searchResult[i].Discounts} </td>
         <td>${searchResult[i].total} </td>
         <td> ${searchResult[i].category}</td>
         <td><button  id="update">update</button> </td>
         <td><button onclick="deletedata(${i})" id="delete">delete</button> </td>
         </tr>
          `;
  }

  if (searchResult.length === 0) {
    table = '<tr><td colspan="10">No results found</td></tr>';
  }

  document.getElementById("tbody").innerHTML = table;
}
//end search
function changeText() {
  var button = document.getElementById("myButton");
  if (button.innerHTML === "en") {
    button.innerHTML = "ar";
window.location.href = "System.html";
  } else {
    button.innerHTML = "en";
window.location.href = "System ar.html";
  }
}
function toggleDarkMode() {
  var body = document.body;
  body.classList.toggle("dark-mode");
}