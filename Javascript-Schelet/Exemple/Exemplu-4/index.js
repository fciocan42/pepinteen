function changePosition() {
    const left = Math.random() * 300
    const top = Math.random() * 300

    console.log(left, top)
    document.getElementById("catch").style = "position: absolute; left: " + left +
        "px; top:" + top + "px";
}