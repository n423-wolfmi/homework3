function initListeners() {
    
}

$("#submit").on("click", (e) => {
    e.preventDefault()
    let fn = $("#fName").val()
    let ln = $("#lName").val()
    let age = $("#age").val()
    let phone = $("#phone").val()
    let email = $("#email").val()
    let cs = $("#classes").val()
    let newArrClass = cs.split(",")
    let finalClassArray = []

    let userObj = {
        fName: fn,
        lName: ln,
        age: age,
        phone: phone,
        email: email,
        classes: []
    }

    $.each(newArrClass, (idx, newClass) => {
        let cl = {
            "className": newClass.trim()
        }
        finalClassArray.push(cl)
    })

    userObj.classes = finalClassArray

    $("#firstName").val("")
    $("#lastName").val("")
    $("#classes").val("")

    addUser(userObj)
})
$("#getName").on("click", (e) => {
    getUser()
})

/**
 * The function checks if localStorage is available and creates an empty "Students" array if it doesn't
 * exist.
 * @returns If the `classes` variable exists in the `localStorage`, then nothing is returned.
 * Otherwise, an empty array is set as the value for the "Students" key in the `localStorage`.
 */
function connectToStorage() {
    if(localStorage) {
        let students = localStorage.getItem("Students")
        if(classes) {
            return
        } else {
            localStorage.setItem("Students", "[]")
        }
    } else {
        console.log("No storage detected")
    }
}
 
$(document).ready(function () {
    initListeners()
    connectToStorage()
});
