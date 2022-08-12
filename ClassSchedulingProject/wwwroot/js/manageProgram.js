const manageProgram = {};
manageProgram.save = function (id){
    let tableRowElement = $(`#${id} td`);
    let programID = document.getElementById("programID").value;

    var newPost = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            ProgramId : Number(document.getElementById("programID").value)
        }
    }
    try{
       newPost.body.Id = Number(id.split("-")[1])
    }catch{
        newPost.body.Id = -1;
    }
    if(id==="tableRow-NEW"){
        newPost.body.Id = -4;
    }
    
    tableRowElement.each(function(i, o){
        switch(o.firstChild.getAttribute("data")){
            case "QuarterNumber": newPost.body.QuarterNumber = Number(o.firstChild.value); break;
            case "CoursePrefix": newPost.body.CoursePrefix = o.firstChild.value.toString(); break;
            case "CourseNumber": newPost.body.CourseNumber = Number(o.firstChild.value); break;
            case "Title": newPost.body.Title = o.firstChild.value.toString(); break;
            case "Component": newPost.body.Component = o.firstChild.value.toString(); break;
            case "QuarterNumber": newPost.body.QuarterNumber = Number(o.firstChild.value); break;
            case "CourseCredits": newPost.body.Credits = parseFloat(o.firstChild.value); break;
        }
    })
    newPost.body = JSON.stringify(newPost.body);
    fetch("/home/saveProgramEventTemplate", newPost).then(data => data.json().then(function(data){
        // window.location.reload();
    }))

}
manageProgram.fetchEventTemplates = function (element){
    localStorage.setItem("programID", document.getElementById("programID").value);
    if(element.value === "addNewProgram") return manageProgram.addProgram();
    fetch(`/home/fetchEventTemplates?programID=${element.value}`).then(data => data.json()).then(function(data) {
        let eventTemplates = JSON.parse(data.programTemplates);
        eventTemplates.sort((a, b) => a.QuarterNumber > b.QuarterNumber ? 1 : -1);
        programTable.render(eventTemplates);
    })
}
manageProgram.delete = function(id){
    if(confirm("Deleting this course will delete all associated events in the database. Please reframe from using this option.")){
        if(confirm("Are you sure you want to delete this course?")){
            fetch(`/home/deleteCourse?courseID=${Number(id)}`).then(data => data.json).then(function(data){
                console.log(data);
                window.location.reload();
            });
        }
    }
}
manageProgram.addProgram = function(){
    let newProgramName = prompt("Program Name");
    let type = prompt("Program type (AAS or BAS?)");
    let version = prompt("Program Version (Integer)")
    console.log(newProgramName, type, version);
    fetch(" ")
}

const programTable = {
    tableBody : $("#mangeProgramTableBody"),
    destroy : function(){
        this.tableBody.text("")
    },
    render : function(eventTemplates){
        this.destroy();
        eventTemplates.forEach(element => {
            this.tableBody.append($(`<tr id="tableRow-${element.Id}">
            <td><input data="QuarterNumber" type="number" min="1" max="8" value="${element.QuarterNumber}"></td>
            <td><select data="CoursePrefix">
                <option value="${element.CoursePrefix}">${element.CoursePrefix}</option>
                <option value="CSI">CSI</option>
                <option value="CNT">CNT</option>
            </select></td>
            <td><input data="CourseNumber" type="text" value="${element.CourseNumber}"></td>
            <td><input data="Title" type="text" value="${element.Title}"></td>
            <td><select data="Component">
                <option value="${element.Component}">${element.Component}</option>
                <option value="Lecture">Lecture</option>
                <option value="Lab">Lab</option>
                <option value="IndStudy">Ind Study</option>
            </select></td>
            <td><input data="CourseCredits" type="text" value="${element.Credits}"></td>
            <td><a id="@course.Id" href="#" onclick="manageProgram.save('tableRow-${element.Id}')">Save</a></td>
            <td><a href="#" class="text-danger" onclick="manageProgram.delete('${element.Id}')">Delete</a></td> 
        </tr>`))
        });
        this.tableBody.append($(`
        <tr id="tableRow-NEW">
            <td><input data="QuarterNumber" type="number" min="1" max="8" placeholder=""></td>
            <td><select data="CoursePrefix">
                <option value="CSI">CSI</option>
                <option value="CNT">CNT</option>
            </select></td>
            <td><input data="CourseNumber" type="number" placeholder=""></td>
            <td><input data="Title" type="text" placeholder=""></td>
            <td><select data="Component">
                <option value="Lecture">Lecture</option>
                <option value="Lab">Lab</option>
                <option value="IndStudy">Ind Study</option>
            </select></td>
            <td><input data="CourseCredits" type="text" placeholder=""></td>
            <td><a id="NULL" href="#" onclick="manageProgram.save('tableRow-NEW')">Save</a></td> 
        </tr>
        `))
    }
};