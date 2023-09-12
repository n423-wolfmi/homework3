function initListeners() {
    $("#submit").on("click", () => {
        let fn = $("#fName").val()
        let ln = $("#lName").val()
        let age = $("#age").val()
        let phone = $("#phone").val()
        let email = $("#email").val()
        let classes = $("#classes").val().split(",")
        let finalClassArray = []
    
        let studentObj = {
            fName: fn,
            lName: ln,
            age: age,
            phone: phone,
            email: email,
            classes: []
        }
    
        $.each(classes, (idx, loopClass) => {
            let trimClass = {className: loopClass.trim()}
            finalClassArray.push(trimClass)
        })
    
        studentObj.classes = finalClassArray
    
        $("input:text").val("")
    
        addStudent(studentObj)
    })
    $("#getStudents").on("click", () => {
        getStudents()
    })
}

function addStudent(student) {  
    let allStudents = JSON.parse(localStorage.getItem("Students")) //array of all students
    allStudents.push(student) //add new student to array
    localStorage.setItem("Students", JSON.stringify(allStudents)) //store all students array to local storage
}

function getStudents() {
    $("#display").html("") //clear display
    let allStudents = JSON.parse(localStorage.getItem("Students")) //get students from local storage

    //for each student, display data
    //for each class, display class on student div
    $.each(allStudents, (idx, student) => {
        $("#display").append(`
            <div class="student" id="student${idx}">
                <div class="studentBanner">${student.fName} ${student.lName}</div>
                <p><b>Age:</b> ${student.age}</p>
                <p><b>Phone:</b> ${student.phone}</p>
                <p><b>Email:</b> ${student.email}</p>
                <b>Classes:</b>
            </div>
        `)
        $.each(student.classes, (classIdx, cls) => {
            let lastInArr = student.classes.slice(-1)
            if(cls.className == lastInArr[0].className) {
                $(`#student${idx}`).append(`<span> ${cls.className}</span>`)
            } else {
                $(`#student${idx}`).append(`<span> ${cls.className}, </span>`)
            }
        }) 
    })
}

/**
 * The function checks if localStorage is available and creates an empty "Students" array if it doesn't
 * exist.
 * @returns If the `classes` variable exists in the `localStorage`, then nothing is returned.
 * Otherwise, an empty array is set as the value for the "Students" key in the `localStorage`.
 */
function connectToStorage() {
    if(localStorage) {
        let students = localStorage.getItem("Students")
        if(students) {
            return
        } else {
            localStorage.setItem("Students", "[]")
        }
    } else {
        console.log("No storage detected")
    }
}
 
$(document).ready(function () {
    connectToStorage()
    initListeners()
});
