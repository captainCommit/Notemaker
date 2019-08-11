/* Login Procedure */
const auth = firebase.auth()
const database = firebase.database()
const login = document.getElementById('login-form')
const course_form = document.getElementById('course-form')
const logout = document.getElementById('logout')
const banner = document.getElementById('profid')
const name = document.getElementById('name')
var user = auth.currentUser

function checkAuthState()
{
   
    logout.addEventListener('click',logOut)
    login.addEventListener('submit',logIn)
    console.log(user)
    if(user != null)
    {
        $('#login-form').hide();
        $('#course-form').show(); 
        logout.style.visibility="visible"
        banner.style.visibility = "visible"
        name.innerHTML = user.email
        window.email = user.email  
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
auth.onAuthStateChanged((user)=>{
    console.log(user)
    window.user = user
    if(user != null)
    {
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
})
async function logIn(e){
    e.preventDefault()
    const email = document.getElementById('emailid')
    const password = document.getElementById('password')
    window.email = email.value
    window.password = password.value
    $('#submitbtn').addClass('active')
    try {
        var x = await auth.signInWithEmailAndPassword(email.value,password.value)
    } catch (error) {
        Swal.fire('Oops',error.message,'error')
        $('#submitbtn').removeClass('active')
        $('#login-form').trigger("reset")
        return;
    }
    logout.style.visibility="visible"
    banner.style.visibility = "visible"
    name.innerHTML = x.user.email
}
async function logOut(e){
    //e.preventDefault()
    $('#submitbtn').removeClass('active')
    try{
        await auth.signOut()
    }
    catch(error)
    {
        Swal.fire('Oops',error.message,'error')
        return;
    }
    logout.style.visibility="hidden"
    banner.style.visibility = "hidden"
    name.innerHTML = ""
    $('#login-form').trigger("reset")
}

/* Table Manipulation */

const add_instructor = document.getElementById('addI')
const add_schedule = document.getElementById('addS')
const add_notes = document.getElementById('addnotes')
const add_psets = document.getElementById('addpsets')
const add_books = document.getElementById('addbooks')
const add_syllabus = document.getElementById('addsyllabus')
const remove = document.getElementById('remove')
add_instructor.addEventListener('click',addRowInstructor)
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
function addRowInstructor()
{
    const table = document.getElementById('instructors')
    const row = document.createElement('tr')
    const col1 = document.createElement('td')
    const col2 = document.createElement('td')
    const col3 = document.createElement('td')
    const input1 = document.createElement('input')
    const input2 = document.createElement('input')
    const btn = document.createElement('button')
    input1.setAttribute('type','text')
    //input1.required = true
    input1.setAttribute('placeholder','Enter Name')
    input1.className += "form-control"
    input1.setAttribute('name','name')
    input1.id = 'name'
    input2.setAttribute('type','file')
    input2.setAttribute('accept','image/*')
    input2.className += "form-control"
    input2.setAttribute('name','img')
    input2.id = 'img'
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
/*Display Modal */

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

/* Form Submit*/

const firestore = firebase.firestore()
const storage = firebase.storage()
//form element variable - course_form
const SubCode = document.getElementById('subcode')
const SubName = document.getElementById('subname')
const Year = document.getElementById('year')
const Credits = document.getElementById('credits')
const Practical = document.getElementById('practical')
const AboutCourse = document.getElementById('aboutcourse')
const Instructors = document.getElementById('instructors')
const Syllabus = document.getElementById('syllabus')
const Schedule = document.getElementById('schedule')
const Lecture_Notes = document.getElementById('lnotes')
const PSets = document.getElementById('psets')
const midsem_1_date = document.getElementById('midsem1date')
const midsem_2_date = document.getElementById('midsem2date')
const endsem_date = document.getElementById('endsemdate')
const Midsem_I_Marks = document.getElementById('midsem1')
const Midsem_II_Marks = document.getElementById('midsem2')
const EndSem = document.getElementById('endsem')
const Prerequisites = document.getElementById('prerequisites')
const Level = document.getElementById('level')
const StartingDate = document.getElementById('startingdate')
const Length = document.getElementById('length')
const RefBooks = document.getElementById('refbooks')
const list = document.getElementById('list')
course_form.addEventListener('submit',submitForm)

var upload_list = {}
var courseObject = {}
function sumbitTable(table,input_types,fields,need_upload,upload_tag) {
    var myTab = table
    var array = new Array()
    count = 1
    // LOOP THROUGH EACH ROW OF THE TABLE.
    for (row = 2; row < myTab.rows.length; row++) {
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
    if(need_upload == true)
        upload_list[upload_tag] = array
    return array
}
function submitForm(e)
{
    e.preventDefault();
    courseObject['subname'] = SubName.value
    courseObject['subcode'] = SubCode.value
    courseObject['year'] = Year.value
    courseObject['credits'] = Credits.value
    courseObject['hasPractical'] = Practical.options[Practical.selectedIndex].value
    courseObject['aboutCourse'] = AboutCourse.value
    courseObject['startingDate'] = StartingDate.value
    courseObject['midsem_1_date'] = midsem_1_date.value
    courseObject['midsem_2_date'] = midsem_2_date.value
    courseObject['endsem_date'] = endsem_date.value
    courseObject['midsem_1_marks'] = Midsem_I_Marks.files[0]
    courseObject['midsem_2_marks'] = Midsem_II_Marks.files[0]
    courseObject['endsem_marks'] = EndSem.files[0]
    courseObject['prerequisites'] = Prerequisites.value
    courseObject['level'] = Level.options[Level.selectedIndex].value
    courseObject['length'] = Length.options[Length.selectedIndex].value
    courseObject['Instructors'] = sumbitTable(Instructors,['text','file'],['iname','link'],true,"Instructors")
    courseObject['Syllabus'] = sumbitTable(Syllabus,['text'],['topic'],false,"")
    courseObject['Schedule'] = sumbitTable(Schedule,['text','text'],['date','topic'],false,"")
    courseObject['Lecture_Notes'] = sumbitTable(Lecture_Notes,['file'],['link'],true,"Lecture_Notes")
    courseObject['Problem_Sets'] = sumbitTable(PSets,['file'],['link'],true,"Problem_Sets")
    courseObject['Reference_Books'] = sumbitTable(RefBooks,['text','file'],['bname','link'],true,"Reference_Books")
    upload().then(async courseObject => {
        if(courseObject == null)
        {
            Swal.fire('Sorry','Due to some files could not be uploaded could not be added. Please try again','error')
            $('#course-form').trigger('reset')
            return;
        }
        else
        {
            var uploadObject = {}
            uploadObject['subname'] = courseObject['subname']
            uploadObject['subcode'] = courseObject['subcode']
            uploadObject['year'] = courseObject['year']
            uploadObject['aboutcourse'] = courseObject['aboutCourse']
            uploadObject['prerequisites'] = courseObject['prerequisites']
            uploadObject['credits_alloted'] = courseObject['credits']
            uploadObject['type'] = courseObject['level']
            uploadObject['length'] = courseObject['length']
            uploadObject['has_practical'] = (courseObject['has_practical'] == "Yes")?true:false
            uploadObject['startingdate'] = courseObject['startingDate']
            uploadObject['instructor'] = {} //map
            for(x in courseObject['Instructors'])
            {
                var iname = courseObject['Instructors'][x]['iname']
                var link = courseObject['Instructors'][x]['link']
                uploadObject['instructor'][iname] = link
            }
            uploadObject['lecture_notes'] = [] //array
            for(x in courseObject['Lecture_Notes'])
            {
                uploadObject['lecture_notes'].push(courseObject['Lecture_Notes'][x]['link'])
            }
            uploadObject['exam_dates'] = { endsem : courseObject['endsem_date'], midsem1 : courseObject['midsem_1_date'], midsem2 : courseObject['midsem_2_date']} //object
            uploadObject['link_to_marks'] = { endsem_3 : courseObject['endsem_marks'],midsem_1 : courseObject['midsem_1_marks'],midsem_2 : courseObject['midsem_2_marks']} //object
            uploadObject['problem_sets'] = [] //array
            for(x in courseObject['Problem_Sets'])
            {
                uploadObject['problem_sets'].push(courseObject['Problem_Sets'][x]['link'])
            }
            uploadObject['syllabus'] = [] //array
            for(x in courseObject['Syllabus'])
            {
                uploadObject['syllabus'].push(courseObject['Syllabus'][x]['topic'])
            }
            uploadObject['reference_books'] = {} //map
            for(x in courseObject['Reference_Books'])
            {
                var bname = courseObject['Reference_Books'][x]['bname']
                var link = courseObject['Reference_Books'][x]['link']
                uploadObject['reference_books'][bname] = link
            }
            uploadObject['schedule'] = {}
            for(x in courseObject['Schedule'])
            {
                var date = courseObject['Schedule'][x]['date']
                var topic = courseObject['Schedule'][x]['topic']
                uploadObject['schedule'][date] = topic
            }
            console.log(uploadObject)
            try {
                    var res = await firestore.collection('Course').add(uploadObject)
                    Swal.fire('Yayy!!','The course is added succesfully','success')
                    try
                    {
                    await database.ref('CourseWriter').push({
                        courseId : res.id,
                        addedBy : firebase.auth().currentUser.email,
                        subcode : uploadObject['subcode'],
                        time : getDate(),
                        })
                    }
                    catch(error)
                    {
                        console.log('error : ',error.message)
                    }
            } 
            catch (error) 
            {
                Swal.fire('Oops',error.message,'error')
            }
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

async function upload()
{
    var temp = courseObject
    for(var prop in upload_list)
    {
        var obj = upload_list[prop]
        for(var ele in obj)
        {
            if(obj.length == 0)
                continue
            var file = obj[ele]['link']
            if(file == undefined)
            {
                temp[prop][ele]['link'] = "undefined"
                continue
            }
            sRef = storage.ref('Course/'+file.name)
            try {
                showModal();
                var url = await sRef.put(file) 
                list.innerHTML += file.name+" has been uploaded successfully<br>"
                console.log(file.name+" has been uploaded successfully")
            } catch (error) {
                Swal.fire('Oops!!!',url.message,'error');
                return null;
            }
            finally
            {
                try {
                    temp[prop][ele]['link'] = await url.ref.getDownloadURL()
                } catch (error) {
                    Swal.fire('Oops!!!',url.message,'error');
                    return null;
                }
            }
        }
    }
    var arr = ['midsem_1_marks','midsem_2_marks','endsem_marks']
    for(x in arr)
    {
        var file = temp[arr[x]]
        if( x == undefined)
            continue
        else
        {
            if(file == undefined)
            {
                temp[arr[x]] = "null"
                continue
            }
            sRef = storage.ref('Course/'+file.name)
            try {
                var url = await sRef.put(file) 
                list.innerHTML += file.name+" has been uploaded successfully<br>"
                console.log(file.name+" has been uploaded successfully")
            } catch (error) {
                Swal.fire('Oops!!!',url.message,'error');
                return null;
            }
            finally
            {
                try {
                    temp[arr[x]] = await url.ref.getDownloadURL()
                } catch (error) {
                    Swal.fire('Oops!!!',url.message,'error');
                    return null;
                }
            }
        }
    }
    if(checkProperties(temp) == false)
    {
        hideModal()
        list.innerHTML=""
        $('#course-form').trigger("reset")
    }
    else
        temp = null
    return temp
}
function checkProperties(obj) {
    for (var key in obj) {
        if (obj[key] != null && obj[key] != "" && obj[key] != undefined)
        {
            console.log(key);
            
            return false;
        }
    }
    return true;
}
