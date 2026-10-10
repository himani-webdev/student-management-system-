// ==========================================
// STUDENT MANAGEMENT SYSTEM
// ==========================================


// Student Array //
let students = JSON.parse(localStorage.getItem("students")) ||[];


// ==========================================
// ELEMENTS
// ==========================================

const form = document.getElementById("studentFormElement");

const studentForm = document.getElementById("studentForm");

const tableBody = document.getElementById("studentTableBody");



// ==========================================
// OPEN FORM
// ==========================================
 function openForm() {
    studentForm.style.display = "block";

    document.getElementById("studentForm").scrollIntoView({
        behavior:"smooth"
    });
 }


 // ==========================================
// CLOSE FORM
// ==========================================

function closeForm(){

    studentForm.style.display = "none";

    form.reset();

    document.getElementById("editIndex").value = "";

    document.getElementById("formTitle").innerText = "Add New Student";

    document.getElementById("saveBtn").innerText = "Save Student";

    updatePreview();

}


// ==========================================
// CALCULATE GRADE
// ==========================================

function calculateGrade(percentage){

    if(percentage >=90){
        return "A+";
    } 
    else if(percentage >=80){
        return "A";
    }
    else if(percentage >=70){
        return "B";
    }
    else if(percentage >=60){
        return "C";
    }
    else if(percentage >=50){
        return "D";
    }
    else{
        return "F";
    }
}

// ==========================================
// GET MARKS
// ==========================================

function getMarks(){

    let english = Number(document.getElementById("english").value) || 0;

    let maths = Number(document.getElementById("maths").value) || 0;

    let science = Number(document.getElementById("science").value) || 0;

    let computer = Number(document.getElementById("computer").value) || 0;

    let hindi = Number(document.getElementById("hindi").value) || 0;

    return{
        english,
        maths,
        science,
        computer,
        hindi
    }
}


// ==========================================
// UPDATE PREVIEW
// ==========================================

function updatePreview(){

    const marks = getMarks();

    let total =
         marks.english +
         marks.maths +
         marks.science +
         marks.computer +
         marks.hindi;

    let percentage = total / 5;
    
    let grade = calculateGrade(percentage);


    document.getElementById("previewTotal").innerText =
            total + " / 500";

    document.getElementById("previewPercentage").innerText =
            percentage.toFixed(2) + "%";
            
    document.getElementById("previewGrade").innerText =
            grade;

}


// ==========================================
// LIVE PREVIEW
// ==========================================

document.querySelectorAll(".input-group input").forEach(function(input){
    input.addEventListener("input",updatePreview);
});


// ==========================================
// ADD / UPDATE STUDENT
// ==========================================

form.addEventListener("submit",function (event){

    event.preventDefault();


    let rollNo = document.getElementById("rollNo").value;

    let name = document.getElementById("studentName").value;

    const marks = getMarks();


    let total =
        marks.english +
        marks.maths +
        marks.science +
        marks.computer +
        marks.hindi;

    let percentage = total / 5;
    
    let grade = calculateGrade(percentage);


    let student = {

        rollNo: rollNo,
        name : name,
        english :marks.english,
        maths :marks.maths,
        science :marks.science,
        computer : marks.computer,
        hindi : marks.hindi,
        total : total,
        percentage: percentage,
        grade : grade
    };

    let editIndex = document.getElementById("editIndex").value;

    // UPDATE

    if(editIndex !==""){
        students[editIndex] = student;
        alert("Student Updated Successfully!!🎓")
    }

    // ADD
    else{

        // Check duplicate roll number
        let exists = students.some(function(item){
            return item.rollNo == rollNo;
        });

        if(exists){
            alert("This Roll Number is already exists!!");
            return;
        }


        students.push(student);
        alert("Student Added Successfully!!");
    }

    saveData();
    displayStudents();
    closeForm();
});


// ==========================================
// DISPLAY STUDENTS
// ==========================================

function displayStudents(data = students){

    tableBody.innerHTML = "";

    if(data.length ===0){

        tableBody.innerHTML = `
        <tr>
            <td colspan = "11">
                 No students found
            </td>
        </tr>
        `;

        updateDashboard();

        return;
    }

    data.forEach(function(student,index){

        let originalIndex = students.indexOf(student);

        let row = `

             <tr>
                   <td>${student.rollNo}</td>
                   <td>${student.name}</td>
                   <td>${student.english}</td>
                   <td>${student.maths}</td>
                   <td>${student.science}</td>
                   <td>${student.computer}</td>
                   <td>${student.hindi}</td>
                   <td>${student.total}</td>
                   <td>${student.percentage.toFixed(2)}%</td>

                   <td class= "grade">
                        ${student.grade}
                   </td>

                   <td>
                      <button
                          class="edit-btn"
                          onclick="editStudent(${originalIndex})">
                          Edit
                      </button> 
                      
                      <button
                          class="delete-btn"
                          onclick="deleteStudent(${originalIndex})">
                          Delete
                        </button>

                   </td>

             </tr>
        `;

        tableBody.innerHTML += row;

    });

    updateDashboard();

}
 
// ==========================================
// EDIT STUDENT
// ==========================================

function editStudent(index){
    let student = students[index];

    openForm();

    document.getElementById("formTitle").innerText =
       "Edit Student";

    document.getElementById("saveBtn").innerText =
        "Update Student";
        
    document.getElementById("editIndex").value =
        index;
        
    document.getElementById("rollNo").value =
       student.rollNo;
       
    document.getElementById("studentName").value =
       student.name;
       
    document.getElementById("english").value =
       student.english;

    document.getElementById("maths").value =
       student.maths;
       
    document.getElementById("science").value =
       student.science;
       
    document.getElementById("computer").value =
       student.computer;
       
    document.getElementById("hindi").value =
       student.hindi;
       
       
     updatePreview();  
}

// ==========================================
// DELETE STUDENT
// ==========================================

function deleteStudent(index) {

    let student = students[index];

    let confirmDelete = confirm(
        "Are you sure you want to delete " +
         student.name +
         "?"
    );


    if(confirmDelete){

        students.splice(index,1);

        saveData();

        displayStudents();

        alert("Student Deleted Successfully!!");
    }

}

// ==========================================
// SEARCH STUDENT
// ==========================================

function searchStudent(){

    let searchValue =
        document.getElementById("searchInput").value
        .toLowerCase()
        .trim();


    let filteredStudents = students.filter(function (student){
          return(
            student.name.toLowerCase().includes(searchValue) ||
            student.rollNo.toString().includes(searchValue)
          );

    });

    
    displayStudents(filteredStudents);
    
}

// ==========================================
// SAVE LOCAL STORAGE
// ==========================================

function saveData(){
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


// ==========================================
// DASHBOARD
// ==========================================
function updateDashboard(){
    document.getElementById("totalStudents").innerHTML=students.length;

    if(students.length===0){
        document.getElementById("averagePercentage").innerText="0%";

        document.getElementById("highestPercentage").innerText="0%";


        return;
    }

    let totalPercentage= students.reduce(
        function(sum,student){

            return sum + student.percentage;
        },
        0
    );


    let average =
       totalPercentage/ students.length;

    let highest =
        Math.max(
            ...students.map(function(student){

                return student.percentage;
            })
        );

    document.getElementById("averagePercentage").innerText = 
            average.toFixed(2) + "%";
     
    document.getElementById("highestPercentage").innerText =
             highest.toFixed(2) + "%";        
            
}



// ==========================================
// INITIAL DISPLAY
// ==========================================
displayStudents();
new DataTable('#studentTable');
