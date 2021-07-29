let fetchResult;
let arrayTest = [];
function getAPI() {
  fetch('https://restcountries.eu/rest/v2/all')
    .then((result) => result.json())
    .then((json) => {
      console.log(json);
      createHeader(json);
      createGui(json);
    });
}
getAPI();

function createGui(json) {
  // fetchResult = json;
  display.innerHTML = '';
  json.forEach((element) => {
    display.innerHTML += `<div class="col">
      <div class="card">
      <div class="card-body">
        <h4>Country name: ${element.name}</h4>
          <p class="card-title">top Level Domain: ${
            element.topLevelDomain[0]
          }</p>
          <p class="card-text">Capital: ${element.capital}</p>
          <p class="card-text">Currency:<br> ${
            element.currencies[0].name
          }  ${getSymbol(element)} </p>
          <p> Borders: ${getBorder(element)}</p>
          <img width="50px" src="${element.flag}">
          </div>
      </div>
    </div>`;
  });
}

function arrayLength(array) {
  return array.length;
}

function createHeader(array) {
  idHeader.innerHTML += `<h1>All country</h1>
  <h2>Number of all countries: ${array.length}</h2>`;
}

// function getCurrencies(currencies) {
//   currencies.forEach(element, (index) => {
//     return element[index].name;
//   });
// }

function getSymbol(array) {
  if (array.currencies[0].symbol) return '-' + array.currencies[0].symbol;
  else return '';
}

function getBorder(array) {
  let result = '';
  if (array.borders.length > 0) {
    array.borders.forEach((element) => {
      result += `${element}, `;
    });
    return result;
  } else {
    return 'None border';
  }
}

function searchResult(array) {
  let arrayResult = array;
  let searchArr = [];
  let nameSearch = idSearch.value.toLowerCase();
  arrayResult.forEach((element) => {
    let checkName = element.name.toLowerCase();
    if (checkName.includes(nameSearch)) searchArr.push(element);
  });
  createGui(searchArr);
}

idBtn.onclick = () => {
  searchResult(fetchResult);
};

function searchResult1(array) {
  let arrayResult = array;
  let searchArr = [];
  let nameSearch = idSearch.value.toLowerCase();
  arrayResult.filter((element) => {
    let checkName = element.name.toLowerCase();
    if (checkName.includes(nameSearch)) searchArr.push(element);
  });
  createGui(searchArr);
}

function search1(val) {
  // console.log(val);
  let result = fetchResult.filter((c) =>
    c.name.toLowerCase().includes(val.toLowerCase())
  );
  console.log(result);
  createGui(result);
}
