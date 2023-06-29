function validate(){
    let date = document.getElementById("date");
    let errDate = document.getElementById('dateValid');
    if(date.value == '' || date.value==null){
        errDate.innerHTML = "Enter Date please!!";
        date.focus();
        errDate.style.display = "block";
        return false;
    }else if(Number(date.value)<=0 || Number(date.value)>31){
        errDate.innerHTML = "Check Date please!!";
        date.focus();
        errDate.style.display = "block";
        return false;
    }
    let month = document.getElementById("month");
    let errMonth = document.getElementById('monthValid');
    if(month.value=='' || month.value==null){
        errMonth.innerHTML = "Enter Month Please!!";
        month.focus();
        if(date.value!=null)
            errDate.style.display = "none";
        errMonth.style.display = "block";
        return false;
    }else if(Number(month.value)<=0 || Number(month.value)>12){
        errMonth.innerHTML = "Check Month Please!!";
        month.focus();
        errMonth.style.display = "block";
        return false;
    }
    let year = document.getElementById("year");
    let errYear = document.getElementById('yearValid');
    if(year.value=='' || year.value==null){
        errYear.innerHTML = "Enter Year Please!!";
        year.focus();
        errYear.style.display = "block";
        if(date.value!=null)
            errDate.style.display = "none";
        if(month.value!=null)
            errMonth.style.display = "none";
        return false;
    }else if(Number(year.value)<1960){
        errYear.innerHTML = "Check Year Please!!";
        year.focus();
        errYear.style.display = "block";
        return false;
    }
    return true;
}

function dayPred(d){
    // alert(date);
    $.ajax({
        url: '/today',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({'date':d}),
        success: function(response){
            document.getElementById('result').innerHTML = response.result+d;
        },
        error: function(error){
            console.log(error);
        }
    });
}

function todayPred(){
    var date = new Date().toJSON().slice(0,10);
    dayPred(date);
    document.getElementById('year').value=date.slice(0,4);
    document.getElementById('month').value=date.slice(5,7);
    document.getElementById('date').value=date.slice(8);
}

function tomorrowPred(){
    var date = new Date();
    date = date.setDate(date.getDate()+1)
    date = new Date(date).toJSON().slice(0,10);
    dayPred(date);
    document.getElementById('year').value=date.slice(0,4);
    document.getElementById('month').value=date.slice(5,7);
    document.getElementById('date').value=date.slice(8);
}
