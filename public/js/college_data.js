const tableVisibility = document.getElementsByClassName("table-container")[0];
const table = document.querySelector("table");
const userData = document.getElementById("user-data");
const clearBtn = document.getElementById("clear-btn"); 
const searchInput= document.getElementById("collegeName");
const error = document.getElementById("error");
const success = document.getElementById("success");

clearBtn.addEventListener("click",()=>{
    searchInput.value ="";
    location.reload();
});

form.addEventListener("submit",()=>{
    const college = {
        collegeName: collegeName.value
    }
    fetch("/apidata/searchCollege",{
        method : "POST",
        body : JSON.stringify(college),
        headers : {
            "Content-Type":"application/json"
        }
    }).then(res => res.json())
    .then(data => {
            if (data.status == "error"){
                success.style.display = "none";
                error.style.display = "block";
                error.innerText = data.error;
            }
            else if(data.status == "success"){
                error.style.display = "none";
                success.style.display = "block";
                success.innerText = data.success;
            }
    
            else{
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
                })
            tableEmpty.innerHTML = tableWithData;
            tableVisibility.style.visibility= "visible";
        }
    });
    setTimeout(() => {
        error.style.display = "none";
        success.style.display = "none";
    }, 3000);
});

fetch("/apidata/userData",{
    method : "GET",
    headers : {
        "Content-Type":"application/json"
    }
}).then(res => res.json())
.then(data => {
    userData.innerText = data.username;
});