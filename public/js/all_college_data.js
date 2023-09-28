const table = document.querySelector("table");
const userData = document.getElementById("user-data");

fetch("/apidata/allCollegeData",{
    method : "GET",
    headers : {
        "Content-Type":"application/json"
    }
}).then(res => res.json())
.then(data => {

    const tableEmpty = document.querySelector("table tbody");
    let tableWithData = "";

    data.results.forEach(({name, course,city,state,university,contact})=>{
        tableWithData += "<tr>";
        tableWithData += `<td><h2 style="text-align: left;margin:0;">${name}</h2><hr style="margin-bottom:0;"></td>`;
        tableWithData += `<td data-heading="Course">${": "+course}</td>`;
        tableWithData += `<td data-heading="City">${": "+city}</td>`;
        tableWithData += `<td data-heading="State">${": "+state}</td>`;
        tableWithData += `<td data-heading="University">${": "+university}</td>`;
        tableWithData += `<td data-heading="Contact">${": "+contact}</td>`;
        tableWithData += "</tr>";
    });
    tableEmpty.innerHTML = tableWithData;
    }
)

fetch("/apidata/userData",{
    method : "GET",
    headers : {
        "Content-Type":"application/json"
    }
}).then(res => res.json())
.then(data => {
    userData.innerText = data.username;
});