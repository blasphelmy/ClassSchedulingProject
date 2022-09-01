var TableToCSV = (tableID) => {
    var data = [];
    data[0] = [];
    $(`#${tableID} thead tr th`).map(function(i, o){
        if(o.innerText.trim() != "Edit") data[0].push(`"${o.innerText.trim()}"`)
    })
    let i = 1;
    $(`#${tableID} tbody tr`).each(function(){
        $(this).find('td').each(function(){
            data[i] = data[i] || [];
            if($(this).text().trim() != "Edit") data[i].push(`"${$(this).text().trim()}"`)
        })
        i++;
    })
    for(let i = 0; i < data.length; i++){
        data[i] = data[i].join(",");
    }
    data = data.join("\n")
    return data;
}
function downloadFile(id){
    const file = new File([TableToCSV(id)], `${caldata.ProgramName}_${caldata.ProgramType}_${$("#qSel option:selected").text()}_${$("#yearSel option:selected").text()}_created_${new Date().toLocaleDateString()}.csv`, {
        type: 'text/plain',
    })
    const link = document.createElement('a')
    const url = URL.createObjectURL(file)
  
    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
  
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}