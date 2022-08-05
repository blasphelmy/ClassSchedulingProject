const _helpPageRoot = ReactDOM.createRoot(document.getElementById("helpPage"));
function renderHelpPage(){

    _helpPageRoot.render(helpPage())
}
function helpPage(){
    return(
        <div>
            <h3>Please select a program, year and quarter to begin.</h3>
            <br />
            <h5>Help</h5>
            <div style={{marginLeft : "15px", marginTop : "30px"}}>
                <h6>Admins/Admin Assistants</h6>
            </div>
            <div style={{marginLeft : "15px", marginTop : "30px"}}>
                <h6>Instructors</h6>
            </div>
        </div>
    )
}