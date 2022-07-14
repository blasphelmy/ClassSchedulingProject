let e = (s) => {
    return s !== "";
};
window.onload = function () {
    for (let s of i) {
        s = s.split(",,").filter(e);
        $("#instSelection").append($(`<option value="${s[0]}">${s[1]}</option>`));
    }
    for (let x = 0; x < ise.length; x++) {
        let es = ise[x].split(",,").filter(e);
        iseDict.set(es[0], es[1]);
    }
}
function updateEmailSuffix() {
    $(`#basic-addon2`).text(iseDict.get(document.getElementById("instSelection").value));
}