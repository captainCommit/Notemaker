const database = firebase.database()
const auth = firebase.auth()
const firestore = firebase.firestore()
const storage = firebase.storage()
const loginForm = document.getElementById('login-form')
const editForm = document.getElementById('other-forms')
const logout = document.getElementById('logout')
const banner = document.getElementById('profid')
const name = document.getElementById('name')
const list = document.getElementById('list')
var user = auth.currentUser
async function checkAuthState()
{
   
    logout.addEventListener('click',logOut)
    loginForm.addEventListener('submit',logIn)
    if(user != null)
    {
        await getCourses()
        $('#login-form').hide();
        $('#course-form').show(); 
        logout.style.visibility="visible"
        banner.style.visibility = "visible"
        name.innerHTML = user.email  
    }
    else
    {
        $('#login-form').show();
        $('#course-form').hide();
        logout.style.visibility="hidden"
        banner.style.visibility = "hidden"
        name.innerHTML = ""
        $('#login-form').trigger("reset")
    }
}
auth.onAuthStateChanged(async (user)=>{
    console.log(user)
    var user = auth.currentUser
    if(user != null)
    {
        $('#login-form').hide();
        $('#other-forms').show();   
        logout.style.visibility="visible"
        banner.style.visibility = "visible"
        name.innerHTML = user.email
        window.email = user.email;
        await getCourses()
        populate(null)
    }
    else
    {
        $('#login-form').show();
        $('#other-forms').hide();
        logout.style.visibility="hidden"
        banner.style.visibility = "hidden"
        name.innerHTML = ""
        $('#login-form').trigger("reset")
    }
})
async function logIn(e){
    e.preventDefault()
    const email = document.getElementById('emailid')
    const password = document.getElementById('password')
    $('#submitbtn').addClass('active')
    try {
        var x = await auth.signInWithEmailAndPassword(email.value,password.value)
    } catch (error) {
        Swal.fire('Oops',error.message,'error').then(async ()=>{ var x = await getCourses()})
        $('#submitbtn').removeClass('active')
        $('#login-form').trigger("reset")
        return;
    }
    logout.style.visibility="visible"
    banner.style.visibility = "visible"
    name.innerHTML = x.user.email
}
list.addEventListener('change',populate)
async function logOut(e){
    //e.preventDefault()
    $('#submitbtn').removeClass('active')
    try{
        await auth.signOut()
    }
    catch(error)
    {
        Swal.fire('Oops',error.message,'error').then(async ()=>{ var x = await getCourses()})
        return;
    }
    logout.style.visibility="hidden"
    banner.style.visibility = "hidden"
    name.innerHTML = ""
    $('#login-form').trigger("reset")
}
async function getCourses()
{
    var dRef = database.ref('CourseWriter')
    var courseDict = []
    var snapShot = await dRef.orderByChild("addedBy").equalTo(window.email).once('value')
    list.innerHTML = ""
    for(x in snapShot.val())
    {
        var option = document.createElement('option')
        option.setAttribute("value",snapShot.val()[x]['subcode'])
        option.innerHTML = snapShot.val()[x]['subcode']
        courseDict[snapShot.val()[x]['subcode']] = snapShot.val()[x]['courseId']
        list.appendChild(option)
    }
    window.courseDict = courseDict
    list.removeAttribute("disabled");
}
const add_schedule = document.getElementById('addS')
const add_notes = document.getElementById('addnotes')
const add_psets = document.getElementById('addpsets')
const add_books = document.getElementById('addbooks')
const add_syllabus = document.getElementById('addsyllabus')
const remove = document.getElementById('remove')
add_schedule.addEventListener('click',addRowSchedule)
add_notes.addEventListener('click',addRowLecture)
add_psets.addEventListener('click',addRowPsets)
add_books.addEventListener('click',addRowBooks)
add_syllabus.addEventListener('click',addRowSyllabus)
function removeRow(ele)
{
    var e = ele.parentNode.parentNode
    e.remove()
}
function addRowSyllabus()
{
    const table = document.getElementById('syllabus')
    const row = document.createElement('tr')
    const col1 = document.createElement('td')
    const col2 = document.createElement('td')
    const input1 = document.createElement('input')
    const btn = document.createElement('button')
    input1.setAttribute('type','text')
    //input1.required = true
    input1.setAttribute('placeholder','Enter Topic')
    input1.className += "form-control"
    input1.setAttribute('topic','topic')
    input1.id = 'topic'
    btn.className += "btn btn-warning"
    btn.type = "button"
    btn.id = "remove"
    btn.setAttribute('onclick','removeRow(this)')
    btn.innerHTML = '<i class="fa fa-minus"></i>'
    col1.appendChild(input1)
    col2.appendChild(btn)
    row.appendChild(col1)
    row.appendChild(col2)
    table.appendChild(row)
}
function addRowSchedule()
{
    const table = document.getElementById('schedule')
    const row = document.createElement('tr')
    const col1 = document.createElement('td')
    const col2 = document.createElement('td')
    const col3 = document.createElement('td')
    const input1 = document.createElement('input')
    const input2 = document.createElement('input')
    const btn = document.createElement('button')
    input1.setAttribute('type','text')
    //input1.required = true
    input1.setAttribute('placeholder','Enter Date Of Class')
    input1.className += "form-control"
    input1.setAttribute('name','date')
    input1.id = 'date'
    input2.setAttribute('type','text')
    input2.setAttribute('placeholder','Enter Topic Of Class')
    input2.className += "form-control"
    input2.setAttribute('name','topic')
    //input2.required = true
    input2.id = 'topic'
    btn.className += "btn btn-warning"
    btn.type = "button"
    btn.id = "remove"
    btn.setAttribute('onclick','removeRow(this)')
    btn.innerHTML = '<i class="fa fa-minus"></i>'
    col1.appendChild(input1)
    col2.appendChild(input2)
    col3.appendChild(btn)
    row.appendChild(col1)
    row.appendChild(col2)
    row.appendChild(col3)
    table.appendChild(row)
}
function addRowLecture()
{
    const table = document.getElementById('lnotes')
    const row = document.createElement('tr')
    const col1 = document.createElement('td')
    const col2 = document.createElement('td')
    const input1 = document.createElement('input')
    const btn = document.createElement('button')
    input1.setAttribute('type','file')
    input1.setAttribute('accept','application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    input1.id = "lecturelink"
    //input1.required = true
    input1.className += "form-control"
    input1.setAttribute('name','file')
    btn.className += "btn btn-warning"
    btn.type = "button"
    btn.id = "remove"
    btn.setAttribute('onclick','removeRow(this)')
    btn.innerHTML = '<i class="fa fa-minus"></i>'
    col1.appendChild(input1)
    col2.appendChild(btn)
    row.appendChild(col1)
    row.appendChild(col2)
    table.appendChild(row)
}

function addRowPsets()
{
    const table = document.getElementById('psets')
    const row = document.createElement('tr')
    const col1 = document.createElement('td')
    const col2 = document.createElement('td')
    const input1 = document.createElement('input')
    const btn = document.createElement('button')
    input1.setAttribute('type','file')
    input1.setAttribute('accept','application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    input1.id = "psetlink"
    //input1.required = true
    input1.className += "form-control"
    input1.setAttribute('name','file')
    btn.className += "btn btn-warning"
    btn.type = "button"
    btn.id = "remove"
    btn.setAttribute('onclick','removeRow(this)')
    btn.innerHTML = '<i class="fa fa-minus"></i>'
    col1.appendChild(input1)
    col2.appendChild(btn)
    row.appendChild(col1)
    row.appendChild(col2)
    table.appendChild(row)
}
function addRowBooks()
{
    const table = document.getElementById('refbooks')
    const row = document.createElement('tr')
    const col1 = document.createElement('td')
    const col2 = document.createElement('td')
    const col3 = document.createElement('td')
    const input1 = document.createElement('input')
    const input2 = document.createElement('input')
    const btn = document.createElement('button')
    input1.setAttribute('type','text')
    //input1.required = true
    input1.setAttribute('placeholder','Enter Book Name')
    input1.className += "form-control"
    input1.setAttribute('name','bname')
    input1.id = 'bname'
    input2.setAttribute('type','file')
    input2.setAttribute('accept','application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    input2.className += "form-control"
    input2.setAttribute('name','doc')
    input2.id = 'doc'
    btn.className += "btn btn-warning"
    btn.type = "button"
    btn.id = "remove"
    btn.setAttribute('onclick','removeRow(this)')
    btn.innerHTML = '<i class="fa fa-minus"></i>'
    col1.appendChild(input1)
    col2.appendChild(input2)
    col3.appendChild(btn)
    row.appendChild(col1)
    row.appendChild(col2)
    row.appendChild(col3)
    row.id=window.instructor_count
    table.appendChild(row)
}
function showModal()
{
    //e.preventDefault();
    $('#myModal').modal('show')
}
function hideModal()
{
    //e.preventDefault();
    $('#myModal').modal('hide')
}
async function populate(e)
{
    console.log('changed')
    if(e!=null)
    {
        e.preventDefault();
        subId = list.options[list.selectedIndex].value;
    }
    else
    {
        subId =Object.keys(window.courseDict)[0]
    }
    window.currentCoureId = window.courseDict[subId]
    var x = await firestore.collection('Course').where("subcode","==",subId).get()
    var res = (valid_res(x.docs))?x.docs[0].data():"No Notes For this Course"
    window.courseObject = res
    const ms1Marks = document.getElementById('midsem1marks')
    const ms2Marks = document.getElementById('midsem2marks')
    const esMarks = document.getElementById('endsemmarks')
    document.getElementById('midsem1date').value = res['exam_dates']['midsem1']
    document.getElementById('midsem2date').value = res['exam_dates']['midsem2']
    document.getElementById('endsemdate').value = res['exam_dates']['endsem']
    var lec_notes = res['lecture_notes']
    var prob_sets = res['problem_sets']
    var ref_books = res['reference_books']
    var scdle = res['schedule']
    var syll = res['syllabus']
    var marks_list = res['link_to_marks']
    populate_table(lec_notes,"lnotes",'array',{key : "link"},"Lecture Note")
    populate_table(prob_sets,"psets",'array',{key : "link"},"Problem Set")
    populate_table(ref_books,"refbooks","object",{key : 'text' , value : 'link'},"Reference Books")
    populate_table(scdle,"schedule","object",{key : 'text' , value : 'text'},"")
    populate_table(syll,"syllabus",'array',{key : "text"},"")
    if(marks_list['midsem_1'] != "null")
    {
        ms1Marks.innerHTML =""
        ms1Marks.innerHTML = '<p> Marks Already Uploaded </p>'
        window.flag_ms1 = false
    }
    else
    {
        ms1Marks.innerHTML =""
        var input_f = document.createElement('input')
        input_f.type = "file"
        input_f.className = "form-control my-2"
        input_f.id = "midsem-1-marks"
        input_f.name = "midsem-1-marks"
        input_f.accept = "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel"
        ms1Marks.appendChild(input_f)
        window.flag_ms1 = true
    }
    if(marks_list['midsem_2'] != "null")
    {
        ms2Marks.innerHTML = ""
        ms2Marks.innerHTML = '<p> Marks Already Uploaded </p>'
        window.flag_ms2 = false
    }
    else
    {
        ms2Marks.innerHTML = ""
        var input_f = document.createElement('input')
        input_f.type = "file"
        input_f.className = "form-control my-2"
        input_f.id = "midsem-2-marks"
        input_f.name = "midsem-2-marks"
        input_f.accept = "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel"
        ms2Marks.appendChild(input_f)
        window.flag_ms2 = true
    }
    if(marks_list['endsem_3'] != "null")
    {
        esMarks.innerHTML = ""
        esMarks.innerHTML = '<p> Marks Already Uploaded </p>'
        window.flag_es = false
    }
    else
    {
        esMarks.innerHTML = ""
        var input_f = document.createElement('input')
        input_f.type = "file"
        input_f.className = "form-control my-2"
        input_f.id = "endsem-marks"
        input_f.name = "endsem-marks"
        input_f.accept = "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel"
        esMarks.appendChild(input_f)
        window.flag_es = true
    }
}
function populate_table(data,table_id,type,structure,data_tag)
{
    const table = document.getElementById(table_id)
    const btn = document.createElement('button')
    $('#'+table_id).find("tr:gt(1)").remove();
    btn.className += "btn btn-warning"
    btn.type = "button"
    btn.id = "remove"
    btn.setAttribute('onclick','removeRow(this)')
    btn.innerHTML = '<i class="fa fa-minus"></i>'
    var i = 1
    if(type == "array")
    {
        if(structure['key'] == 'link')
        {
            
            data.forEach(element => {
                var row = document.createElement('tr')
                var col1 = document.createElement('td')
                var col2 = document.createElement('td')
                var lnk = document.createElement('a')
                const btn = document.createElement('button')
                btn.className += "btn btn-warning"
                btn.type = "button"
                btn.id = "remove"
                btn.setAttribute('onclick','removeRow(this)')
                btn.innerHTML = '<i class="fa fa-minus"></i>'
                lnk.href = element
                lnk.innerHTML = data_tag +" "+i
                i+=1
                col1.appendChild(lnk)
                col2.appendChild(btn)
                row.appendChild(col1)
                row.appendChild(col2)
                table.appendChild(row)
            });
        }
        else if(structure['key'] == 'text')
        {
            data.forEach(element => {
                var row = document.createElement('tr')
                var col1 = document.createElement('td')
                var col2 = document.createElement('td')
                const btn = document.createElement('button')
                btn.className += "btn btn-warning"
                btn.type = "button"
                btn.id = "remove"
                btn.setAttribute('onclick','removeRow(this)')
                btn.innerHTML = '<i class="fa fa-minus"></i>'
                col1.innerHTML = element
                col2.appendChild(btn)
                row.appendChild(col1)
                row.appendChild(col2)
                table.appendChild(row)
            })
        }
    }
    else if(type == "object")
    {
        if(structure['key'] == 'text' && structure['value'] == 'text')
        {
             for(x in data)
             {
                 var row = document.createElement('tr')
                 var col1 = document.createElement('td')
                 var col2 = document.createElement('td')
                 var col3 = document.createElement('td')
                 var lnk = document.createElement('a')
                const btn = document.createElement('button')
                btn.className += "btn btn-warning"
                btn.type = "button"
                btn.id = "remove"
                btn.setAttribute('onclick','removeRow(this)')
                btn.innerHTML = '<i class="fa fa-minus"></i>'
                 col1.innerHTML = x
                 col2.innerHTML = data[x]
                 col3.appendChild(btn)
                 row.appendChild(col1)
                 row.appendChild(col2)
                 row.appendChild(col3)
                 table.appendChild(row)
             }
        }
        if(structure['key'] == 'text' && structure['value'] == 'link')
        {
            for(x in data)
             {
                 var row = document.createElement('tr')
                 var col1 = document.createElement('td')
                 var col2 = document.createElement('td')
                 var col3 = document.createElement('td')
                 var lnk = document.createElement('a')
                 const btn = document.createElement('button')
                 btn.className += "btn btn-warning"
                 btn.type = "button"
                 btn.id = "remove"
                 btn.setAttribute('onclick','removeRow(this)')
                 btn.innerHTML = '<i class="fa fa-minus"></i>'
                 lnk.href = data[x]
                 lnk.innerHTML = data_tag +" "+i;
                 i+=1; 
                 col1.innerHTML = x
                 col2.appendChild(lnk)
                 col3.appendChild(btn)
                 row.appendChild(col1)
                 row.appendChild(col2)
                 row.appendChild(col3)
                 table.appendChild(row)
             }
        }
    }
}
function valid_res(arr)
{
    if(arr.length == 1)
        return true;
    else    
        return false;
}

/* Updation Procedure */ 
const uploaddocs = document.getElementById('uploadDocs')
const changedate = document.getElementById('changeDate')
const uploadbooks = document.getElementById('uploadBooks')
const submitmarks = document.getElementById('submitMarks')
const changedata = document.getElementById('changeData')
const uplist = document.getElementById('uplist');


uploaddocs.addEventListener('click',uploadDocs)
changedate.addEventListener('click',changeDate)
uploadbooks.addEventListener('click',uploadBooks)
submitmarks.addEventListener('click',submitMarks)
changedata.addEventListener('click',changeData)
function sumbitTable(table,input_types,fields,startIndex) 
{
    var myTab = table
    var array = new Array()
    count = 1
    for(row = 2;row < startIndex ;row++)
    {
        values = {}
        for(c = 0;c<myTab.rows[row].cells.length;c++)
        {
            var element = myTab.rows[row].cells[c].childNodes[0];
            if(element.tagName == 'A')
            {
                values[fields[c]]= element.href
            }
            else if(element.tagName != 'BUTTON')
            {
                values[fields[c]] = element.data.replace('"','')
            }
            else
            {
                console.log()
            }
        }
        if(Object.entries(values).length === 0 && values.constructor === Object)
            continue
        else
            array.push(values)
    }
    // LOOP THROUGH EACH ROW OF THE TABLE.
    for (row = startIndex; row < myTab.rows.length; row++) {
        values = {}
        for (c = 0,props=0; c < myTab.rows[row].cells.length; c++,props++) 
        {   // EACH CELL IN A ROW.
            var element = myTab.rows.item(row).cells[c];
            if(input_types[c] == 'text')
            {
                if(element.childNodes[0].value == "")
                    break
                values[fields[props]] = element.childNodes[0].value
                continue
            }
            if(input_types[c] == 'file')
            {
                if(element.childNodes[0].files.length == 0)
                    break
                values[fields[props]] = element.childNodes[0].files[0]
            }
        }
        if(Object.entries(values).length === 0 && values.constructor === Object)
            continue
        else
            array.push(values)
    }
    if(array.length == 0)
        array = null
    return array
}
async function uploadDocs(){
    uplist.innerHTML = ""
    var newLNotes = sumbitTable( document.getElementById('lnotes'),['file'],['link'],window.courseObject['lecture_notes'].length+2)
    var newPSets = sumbitTable( document.getElementById('psets'),['file'],['link'],window.courseObject['problem_sets'].length+2)
    list.innerHTML = ""
        var lec = []
        var ps = []
        if(newLNotes != null)
        {
            for(x in newLNotes)
            {
                if(typeof(newLNotes[x]['link']) == 'string')
                {
                    lec.push(newLNotes[x]['link'])
                    continue;
                }
                var ref = storage.ref('Course/'+newLNotes[x]['link'].name)
                try{
                    showModal()
                    var res = await ref.put(newLNotes[x]['link'])
                    var p = document.createElement('p')
                    p.innerHTML = newLNotes[x]['link'].name + "has been uploaded successfully"
                    lec.push(await res.ref.getDownloadURL())
                    uplist.appendChild(p)
                }catch(err)
                {
                    hideModal()
                    Swal.fire('Oops',err.message,'error').then(async ()=>{ var x = await getCourses()})
                    return null
                }
            }
            
            hideModal()
        }
        if(newPSets != null)
        {
            for(x in newPSets)
            {
                if(typeof(newPSets[x]['link']) == 'string')
                {
                    ps.push(newPSets[x]['link'])
                    continue;
                }
                var ref = storage.ref('Course/'+newPSets[x]['link'].name)
                try{
                    var res = await ref.put(newPSets[x]['link'])
                    console.log(res)
                    var p = document.createElement('p')
                    p.innerHTML = newPSets[x]['link'].name + " has been uploaded successfully."
                    ps.push(await res.ref.getDownloadURL())
                    uplist.appendChild(p)
                }catch(err)
                {
                    hideModal()
                    Swal.fire('Oops',err.message,'error').then(async ()=>{ var x = await getCourses()})
                    return null
                }
            }
            hideModal()
        }
        console.log(lec.length != 0,JSON.stringify(lec) != JSON.stringify(window.courseObject['lecture_notes']))
        console.log(ps.length != 0,JSON.stringify(ps) != JSON.stringify(window.courseObject['problem_sets']))
        if((lec.length != 0 && JSON.stringify(lec) != JSON.stringify(window.courseObject['lecture_notes']))||(ps.length != 0  && JSON.stringify(ps) != JSON.stringify(window.courseObject['problem_sets'])))  
        {
            writeObject('Course',window.currentCoureId,['lecture_notes','problem_sets'],[lec,ps]).then((res)=>{
                if(res!=null)
                        Swal.fire('Success','Lecture Notes And Problem Sets Have Been Changed Successfully','info').then(async ()=>{ var x = await getCourses()})
                    else
                    {
                        Swal.fire('Sorry','ecture Notes And Problem Sets Could Not Be Changed Successfully','warning').then(async ()=>{ var x = await getCourses()})
                        return
                    }
            })
        }
        else{
            Swal.fire('Phew!!','Nothing to change...','info').then(async ()=>{ var x = await getCourses()})
        }
    }
        
async function uploadBooks(){
    uplist.innerHTML = ""
    var newRefBooks = sumbitTable(document.getElementById('refbooks'),['text','file'],['name','link'],Object.keys(window.courseObject['reference_books']).length+ 2)
    var dict = {}
    var flag = false
    for(x in newRefBooks)
    {
        if(typeof(newRefBooks[x]['link']) == 'string')
        {
            dict[newRefBooks[x]['name']] = newRefBooks[x]['link']
            continue
        }
        else
        {
            if(flag != true)
                showModal()
            flag = true
            var ref = storage.ref('Course/'+newRefBooks[x]['link'].name)
            try {
               var res = await ref.put(newRefBooks[x]['link']) 
               var p = document.createElement('p')
               p.innerHTML = newRefBooks[x]['link'].name+" has been uploaded successfully."
               uplist.appendChild(p)
               dict[newRefBooks[x]['name']] = await res.ref.getDownloadURL()
            } 
            catch (err) {
                    hideModal()
                    Swal.fire('Oops',err.message,'error').then(async ()=>{ var x = await getCourses()})
                    return null
            }
            
        }
    }
    hideModal()
    if(Object.keys(dict).length > 0 && JSON.stringify(dict) != JSON.stringify(window.courseObject['reference_books']))
    {    
        writeObject('Course',window.currentCoureId,['reference_books'],[dict]).then((res)=>{
            if(res!=null)
                    Swal.fire('','List of Reference Books Have Been Updated','success').then(async ()=>{ var x = await getCourses()})
                else
                {
                    Swal.fire('Sorry','List of Reference Books could not be changed please try again','warning').then(async ()=>{ var x = await getCourses()})
                    return
                }
        })
    }
    else{
        Swal.fire('Phew!!','Nothing to change...','info').then(async ()=>{ var x = await getCourses()})
    }
} 
async function changeData(){
    var syl = []
    var sch = {}
    var newSyllabus = sumbitTable(document.getElementById('syllabus'),['text'],['topic'],window.courseObject['syllabus'].length+2)
    var newSchedule = sumbitTable(document.getElementById('schedule'),['text','text'],['date','topic'],Object.keys(window.courseObject['schedule']).length+ 2)
    newSyllabus.forEach(ele => {
        syl.push(ele['topic'])
    })
    newSchedule.forEach(ele => {
        sch[ele['date']]= ele['topic']
    })
    if((Object.keys(sch).length > 0 && JSON.stringify(sch) != JSON.stringify(window.courseObject['schedule']))&&(syl.length != 0 && JSON.stringify(syl) != JSON.stringify(window.courseObject['syllabus'])))
    {    
        writeObject('Course',window.currentCoureId,['syllabus','schedule'],[syl,sch]).then((res)=>{
            if(res!=null)
                    Swal.fire('','Schedule And Syllabus Have Been Updated','success').then(async ()=>{ var x = await getCourses()})
                else
                {
                    Swal.fire('Sorry','Schedule And Syllabus could not be changed please try again','warning').then(async ()=>{ var x = await getCourses()})
                    return
                }
        })
    }
    else{
        Swal.fire('Phew!!','Nothing to change...','info').then(async ()=>{ var x = await getCourses()})
    }
}  
async function changeDate(){
    const MS1 = window.courseObject['exam_dates']['midsem1']
    const MS2 = window.courseObject['exam_dates']['midsem2']
    const ES = window.courseObject['exam_dates']['endsem']
    const ms1 = document.getElementById('midsem1date').value
    const ms2 = document.getElementById('midsem2date').value
    const es = document.getElementById('endsemdate').value
    if(!(ES == es && ms1 == MS1 && ms2 == MS2))
    {
        var x = await Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, change the dates'
                    })
        if(x['value'] == true)
        {
            window.courseObject['exam_dates'] = {midsem1 : ms1,midsem2 : ms2,endsem : es}
            writeObject('Course',window.currentCoureId,['exam_dates'],[{midsem1 : ms1,midsem2 : ms2,endsem : es}]).then((res)=>{
                if(res!=null)
                    Swal.fire('','Dates have been changed','success').then(async ()=>{ var x = await getCourses()})
                else
                {
                    Swal.fire('Sorry','Dates could not be changed please try again','warning').then(async ()=>{ var x = await getCourses()})
                    return
                }
            })
        }
        else
        {
            Swal.fire('','Dates are not changed','info').then(async ()=>{ var x = await getCourses()})
        }
    }
    else{
        Swal.fire('Phew!!','No Update is Required','info').then(async ()=>{ var x = await getCourses()})
    }
}
async function submitMarks(){
    files = []
    var m_dict = {}
    if(window.courseObject['link_to_marks']['midsem_1'] == "null")
    {
        files.push(document.getElementById('midsem-1-marks').files[0])
    }
    else{
        m_dict['midsem_1'] = window.courseObject['link_to_marks']['midsem_1']
    }
    if(window.courseObject['link_to_marks']['midsem_2'] == "null")
    {
        files.push(document.getElementById('midsem-2-marks').files[0])
    }
    else{
        m_dict['midsem_2'] = window.courseObject['link_to_marks']['midsem_2']
    }
    if(window.courseObject['link_to_marks']['endsem_3'] == "null")
    {
        files.push(document.getElementById('endsem-marks').files[0])
    }
    else
    {
        m_dict['endsem_3'] = window.courseObject['link_to_marks']['endsem_3']
    }
    if(files.length == 0)
    {
        Swal.fire('','No files to upload','info').then(async ()=>{ var x = await getCourses()})
        return
    }
    else
    {
        showModal()
        uplist.innerHTML = ""
        for(x in files)
        {
            var ref = storage.ref('Course/'+files[x].name)
            try{
                var res = await ref.put(files[x])
                var p = document.createElement('p')
                p.innerHTML = files[x].name + ' has been uploaded successfully'
                files[x] = await res.ref.getDownloadURL()
                uplist.appendChild(p)
            }
            catch(err)
            {
                hideModal()
                Swal.fire('Oops!!',err.message,'error').then(async ()=>{ var x = await getCourses()})
                return
            }
        }
        hideModal()
        if(m_dict['midsem_1'] == undefined)
        {
            m_dict['midsem_1'] = files[0]
        }
        if(m_dict['midsem_2'] == undefined)
        {
            m_dict['midsem_2'] = files[1]
        }
        if(m_dict['endsem_3'] == undefined)
        {
            m_dict['endsem_3'] = files[2]
        }
    }
    window.courseObject['link_to_marks'] = m_dict
    writeObject('Course',window.currentCoureId,['link_to_marks'],[m_dict]).then((res)=>{
        if(res!=null)
        {
            Swal.fire('Yayy!!!','Marks files have been Uploaded Successfully','success').then(async ()=>{ var x = await getCourses()})
        }
        else
        {
            Swal.fire('Sorry','Marks files could not be uploaded please try again','warning').then(async ()=>{ var x = await getCourses()})
            return
        }
    })
}
function getDate()
{
    var d = new Date(),
        minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'pm' : 'am',
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
}
async function writeObject(collection,id,property,changed_parameter)
{
    
    var batch = firestore.batch()
    var docRef = firestore.collection(collection).doc(id)
    for(x in property)
    {
        var temp = {}
        temp[property[x]] = changed_parameter[x]
        batch.update(docRef,temp)
    }
    try{
        var x = await batch.commit()
        var res = await database.ref('CourseEditor').push({
            type : 'edit',
            courseId : window.currentCoureId,
            addedBy : firebase.auth().currentUser.email,
            subcode : uploadObject['subcode'],
            component : property,
            time : getDate(),
        })
        console.log(res)
        if(res != null)
            return true;
        console.log(res)
    }catch(err)
    {

        Swal.fire('Oops!!',err.message,'error').then(async ()=>{ var x = await getCourses()})
        return false
    }
}
