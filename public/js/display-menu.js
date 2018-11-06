let dir = "images/";

const displayImage = (option) => {
    let img = document.getElementById("image");
    if (option.value != "") {
        img.src = dir + option.value + ".jpg";
        img.style.display = "";
    } else {
        img.src = "#";
        img.style.display = "none";
    }
};
