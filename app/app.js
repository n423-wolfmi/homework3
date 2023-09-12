function initListeners() {
    $("#submit").on("click", () => {
        let fn = $("#fName").val()
        let ln = $("#lName").val()
        let age = $("#age").val()
        let phone = $("#phone").val()
        let email = $("#email").val()
        let classes = $("#classes").val().split(",")
        let finalClassArray = []
    
        let userObj = {
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
    
        userObj.classes = finalClassArray
    
        $("input:text").val("")
    
        addUser(userObj)
    })
    $("#getInfo").on("click", () => {
        getUser()
    })
}

function addUser(user) {  
    let allUsers = JSON.parse(localStorage.getItem("Students")) //array of all users
    allUsers.push(user) //add new user to array
    localStorage.setItem("Students", JSON.stringify(allUsers)) //store all users array to local storage
}

function getUser() {
    $("#display").html("")
    let allUsers = JSON.parse(localStorage.getItem("Students"))
    $.each(allUsers, (idx, user) => {
        $("#display").append(`
            <p>First Name: ${user.fName}</p>
            <p>Last Name: ${user.lName}</p> 
            <p>Age: ${user.age}</p>
            <p>Phone: ${user.phone}</p>
            <p>Email: ${user.email}</p>
            Classes: 
        `)
        $.each(user.classes, (idx, cls) => {
            console.log(user.classes.cls)
            $("#display").append(`<span> ${cls.className}</span>`)
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
