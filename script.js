"use strict";

const allEmployees = document.getElementById("all-employees");

let allEmployeesList = [];

async function getEmployees() {
  try {
    const response = await fetch("https://reqres.in/api/users");
    const employees = await response.json();

    const res = await fetch("https://reqres.in/api/users?page=2");
    const employees2 = await res.json();

    allEmployeesList = employees.data.concat(employees2.data);
    // console.log(allEmployeesList);
  } catch (error) {
    console.log(error);
  }
}

let numberOfEmployeesPerPage = 6;
let currentPage = 1;

async function renderEmployees() {
  await getEmployees();
  let tableEmployees = "";
  allEmployeesList
    .filter((numRow, index) => {
      const renderStarts = (currentPage - 1) * numberOfEmployeesPerPage;
      const renderEnds = currentPage * numberOfEmployeesPerPage;

      if (index >= renderStarts && index < renderEnds) return true;
    })
    .forEach((employee) => {
      tableEmployees += `
        <li class="list">
          <img class="round-pict" src="${employee.avatar}"></img>
          <p>${employee.first_name} ${employee.last_name}</p>
          <a class="email" href="mailto: ${employee.email}">Contact</a>
        </li>
        `;
      allEmployees.innerHTML = tableEmployees;
    });
}
renderEmployees();

function prevPage() {
  if (currentPage > 1) currentPage--;
  renderEmployees();
}
function nextPage() {
  if (currentPage * numberOfEmployeesPerPage <= allEmployeesList.length)
    currentPage++;
  renderEmployees();
}

const prevButton = document.querySelector(".prev-page");
const nextButton = document.querySelector(".next-page");

prevButton.addEventListener("click", function () {
  prevPage();
});

nextButton.addEventListener("click", function () {
  nextPage();
});
