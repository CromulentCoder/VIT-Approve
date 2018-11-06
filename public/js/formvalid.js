// ON BLUR EVENT CAN BE ADDED IF REQUIRED:
// const validInput = (element) => {
//     let val;
//     if (element.type === "text") {
//         val = element.value;
//     } else if (element.type === "number"){
//         val = parseInt(element.value, 10);
//     }
//     if (val === "" || isNaN(val)) {
//         element.classList.add("danger");
//     } else {
//         element.classList.remove("danger");
//     }
// }

// Helper function to loop through all options and see if any is selected
// Return false if none selected
const checkSelected = (obj) => {
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].checked === true) {
            return true;
        }
    }
    return false;
}


// Function to validate Hostel form
const validForm = () => {

    // Hostel field
    let hostel = document.getElementsByName("hostel")[0];
    let valid = true;

    if (hostel.value === "") {
        document.getElementById("herr").innerHTML = "Please choose a hostel";
        document.getElementById("herr").classList.add("danger-msg");
        hostel.classList.add("danger");
        valid = false;
    } else {
        document.getElementById("herr").innerHTML = "";
        document.getElementById("herr").classList.remove("danger-msg");
        hostel.classList.remove("danger");
    }

    // Distance field
    let distance = document.getElementsByName("distance");
    if (checkSelected(distance) === false) {
        document.getElementById("derr").innerHTML = "Please choose an option";
        document.getElementById("derr").classList.add("danger-msg");
        valid = false;
    } else {
        document.getElementById("derr").innerHTML = "";
        document.getElementById("derr").classList.remove("danger-msg");
    }

    // Infrastructure field
    let infra = document.getElementsByName("infrastructure");
    if (checkSelected(infra) === false) {
        document.getElementById("ierr").innerHTML = "Please choose an option";
        document.getElementById("ierr").classList.add("danger-msg");
        valid = false;
    } else {
        document.getElementById("ierr").innerHTML = "";
        document.getElementById("ierr").classList.remove("danger-msg");
    }

    // Cleanliness field
    let clean = document.getElementsByName("cleanliness");
    if (checkSelected(clean) === false) {
        document.getElementById("cerr").innerHTML = "Please choose an option";
        document.getElementById("cerr").classList.add("danger-msg");
        valid = false;
    } else {
        document.getElementById("cerr").innerHTML = "";
        document.getElementById("cerr").classList.remove("danger-msg");
    }

    // Staff field
    let staff = document.getElementsByName("staff");
    if (checkSelected(staff) === false) {
        document.getElementById("serr").innerHTML = "Please choose an option";
        document.getElementById("serr").classList.add("danger-msg");
        valid = false;
    } else {
        document.getElementById("serr").innerHTML = "";
        document.getElementById("serr").classList.remove("danger-msg");
    }

    // Room field
    let room = document.getElementsByName("room");
    if (checkSelected(room) === false) {
        document.getElementById("rerr").innerHTML = "Please choose an option";
        document.getElementById("rerr").classList.add("danger-msg");
        valid = false;
    } else {
        document.getElementById("rerr").innerHTML = "";
        document.getElementById("rerr").classList.remove("danger-msg");
    }

    // Lift field
    let lift = document.getElementsByName("lift")[0];
    if (isNaN(parseInt(lift.value, 10))) {
        document.getElementById("lerr").innerHTML = "Please enter a number";
        document.getElementById("lerr").classList.add("danger-msg");
        lift.classList.add("danger");
        valid = false;
    } else if (parseInt(lift.value, 10) < 0 || parseInt(lift.value, 10) > 5) {
        document.getElementById("lerr").innerHTML = "Number must be between 0 and 5";
        document.getElementById("lerr").classList.add("danger-msg");
        lift.classList.add("danger");
        valid = false;
    } else {
        document.getElementById("lerr").innerHTML = "";
        document.getElementById("lerr").classList.remove("danger-msg");
        lift.classList.remove("danger");
    }

    // Overall experience field
    let exp = document.getElementsByName("experience");
    if (checkSelected(exp) === false) {
        document.getElementById("xerr").innerHTML = "Please choose an option";
        document.getElementById("xerr").classList.add("danger-msg");
        valid = false;
    } else {
        document.getElementById("xerr").innerHTML = "";
        document.getElementById("xerr").classList.remove("danger-msg");
    }

    // Return false if form not validated
    return valid;  
}

// Function to validate Mess form
const validMessForm = () => {

    // Mess field
    let mess = document.getElementsByName("mess")[0];
    let valid = true;

    if (mess.value === "") {
        document.getElementById("merr").innerHTML = "Please choose a mess";
        document.getElementById("merr").classList.add("danger-msg");
        mess.classList.add("danger");
        valid = false;
    } else {
        document.getElementById("merr").innerHTML = "";
        document.getElementById("merr").classList.remove("danger-msg");
        mess.classList.remove("danger");
    }

    // Quality field
    let quality = document.getElementsByName("quality");
    if (checkSelected(quality) === false) {
        document.getElementById("qerr").innerHTML = "Please choose an option";
        document.getElementById("qerr").classList.add("danger-msg");
        valid = false;
    } else {
        document.getElementById("qerr").innerHTML = "";
        document.getElementById("qerr").classList.remove("danger-msg");
    }

    // Utensils field
    let utensils = document.getElementsByName("utensils");
    if (checkSelected(utensils) === false) {
        document.getElementById("uerr").innerHTML = "Please choose an option";
        document.getElementById("uerr").classList.add("danger-msg");
        valid = false;
    } else {
        document.getElementById("uerr").innerHTML = "";
        document.getElementById("uerr").classList.remove("danger-msg");
    }

    // Variety field
    let variety = document.getElementsByName("variety");
    if (checkSelected(variety) === false) {
        document.getElementById("verr").innerHTML = "Please choose an option";
        document.getElementById("verr").classList.add("danger-msg");
        valid = false;
    } else {
        document.getElementById("verr").innerHTML = "";
        document.getElementById("verr").classList.remove("danger-msg");
    }

    // Staff field
    let staff = document.getElementsByName("staff");
    if (checkSelected(staff) === false) {
        document.getElementById("serr").innerHTML = "Please choose an option";
        document.getElementById("serr").classList.add("danger-msg");
        valid = false;
    } else {
        document.getElementById("serr").innerHTML = "";
        document.getElementById("serr").classList.remove("danger-msg");
    }

    // Overall experience field
    let exp = document.getElementsByName("experience");
    if (checkSelected(exp) === false) {
        document.getElementById("xerr").innerHTML = "Please choose an option";
        document.getElementById("xerr").classList.add("danger-msg");
        valid = false;
    } else {
        document.getElementById("xerr").innerHTML = "";
        document.getElementById("xerr").classList.remove("danger-msg");
    }

    // Return false if form not validated
    return valid;  
}
