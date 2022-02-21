let classList = document.querySelector(".class-list");
let performanceList = document.querySelector(".performance-list");

const fetchClassDropDown = async (url)=>{
    try{
        let res = await fetch(url);
        let classDropdown = await res.json();
        classDropdown.map((element)=>{
            let option = document.createElement("option")
            let value = element.split(" ");
            option.value = value[1];
            option.appendChild( document.createTextNode(element));
            classList.appendChild(option)
        })
    }
    catch(err){
        console.log(err);
    }
}

const fetchPerformanceData = async (url)=>{
  try{
    let res = await fetch(url);
    let performanceLevel = await res.json();
    performanceLevel.map((element)=>{
        let option = document.createElement("option")
        option.value = element;
        option.appendChild( document.createTextNode(element));
        performanceList.appendChild(option)
    })
  }
  catch(err){
      console.log(err);
  }
}
fetchClassDropDown("http://localhost:3000/classDropdown");
fetchPerformanceData("http://localhost:3000/performanceLevel");

const fetchClasses= async (url)=>{
  try{
    let res = await fetch(url);
    let classes = await res.json();
    let getReportBtn = document.querySelector(".getReportBtn");
    getReportBtn.addEventListener("click", () => getReportDetails(classes));
    return classes;
  }
  catch(err){
      console.log(err);
  }
}
fetchClasses("http://localhost:3000/classes");
function getReportDetails(classes){
    let selectedClass = classes.filter((ele) => ele.className == classList.value);
    if(selectedClass.length != 0){
        let filteredStudents = selectedClass[0].studentresults.filter((studentObj) => studentObj.peformanceLevel == performanceList.value);
        if(filteredStudents.length != 0){
            displayTable(filteredStudents);
        }else{
            displayTable(selectedClass[0].studentresults);
        }
    }
    else{
        let tableBody = document.querySelector(".table_body");
        tableBody.innerHTML="";
    }
   
}
const callingSorting = async () => {
  let classes = await fetchClasses("http://localhost:3000/classes");
  let selectedClass = classes.filter((ele) => ele.className == classList.value);
  if(selectedClass.length != 0){
      let filteredStudents = selectedClass[0].studentresults.filter((studentObj) => studentObj.peformanceLevel == performanceList.value);
      if(filteredStudents.length != 0){
          sortByname(filteredStudents)
      }else{
        sortByname(selectedClass[0].studentresults);
      }
  }
}
document.getElementById("studentName").addEventListener("click", callingSorting)
const displayTable = (tabelData)=>{
    let tableBody = document.querySelector(".table_body");
    tableBody.innerHTML="";
    tabelData.map((tableObj)=>{
        let tr = document.createElement("tr");
        if(table.performanceLevel == avo)
        tr.innerHTML=`<td style="">${tableObj.studentName}</td>
                        <td style="">${tableObj.rank}</td>
                        <td style="">${tableObj.completedPercent}<span class=${tableObj.peformanceLevel}></span> ${tableObj.peformanceLevel}</td>
                        <td style="">${tableObj.mid1Score}</td>
                        <td style="">${tableObj.mid2score}</td>
                        <td style="">${tableObj.finalscore}</td>`
        tableBody.appendChild(tr)
    })
}

let ascending = true;
function sortByname(tableValues){
    let icon = document.querySelector(`.studentName-icon`);
    if(ascending){
        tableValues.sort((a, b) => {
            icon.innerHTML=`<i class="fas fa-arrow-up"></i>`;
            let fa = a.studentName.toLowerCase();
            let fb = b.studentName.toLowerCase();
            return(fa <= fb ? -1 : 1)
        });
       
        displayTable(tableValues);
        ascending = false;
    }
    else{
        tableValues.sort((a, b) => {
            icon.innerHTML=`<i class="fas fa-arrow-down"></i>`;
            let fa = a.studentName.toLowerCase();
            let fb = b.studentName.toLowerCase();
            return(fa < fb ? 1 : -1)
        });
        displayTable(tableValues);
        ascending = true;
    }
}