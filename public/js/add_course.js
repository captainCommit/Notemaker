const auth = firebase.auth()

const login = document.getElementById('login-form')
const data = document.getElementById('course-form')
const logout = document.getElementById('logout')
const banner = document.getElementById('profid')
const name = document.getElementById('name')
var user = auth.currentUser

function checkAuthState()
{
    console.log(user)
    logout.addEventListener('click',logOut)
    login.addEventListener('submit',logIn)
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
}
auth.onAuthStateChanged((user)=>{
    console.log(user)
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





























const add_instructor = document.getElementById('addI')
const add_schedule = document.getElementById('addS')
const add_notes = document.getElementById('addnotes')
const add_psets = document.getElementById('addpsets')
const add_books = document.getElementById('addbooks')
const remove = document.getElementById('remove')
add_instructor.addEventListener('click',addRowInstructor)
add_schedule.addEventListener('click',addRowSchedule)
add_notes.addEventListener('click',addRowLecture)
add_psets.addEventListener('click',addRowPsets)
add_books.addEventListener('click',addRowBooks)
function removeRow(ele)
{
    var e = ele.parentNode.parentNode
    e.remove()
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
    input1.required = true
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
    row.id=window.instructor_count
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
    input1.required = true
    input1.setAttribute('placeholder','Enter Date Of Class')
    input1.className += "form-control"
    input1.setAttribute('name','date')
    input1.id = 'date'
    input2.setAttribute('type','text')
    input2.setAttribute('placeholder','Enter Topic Of Class')
    input2.className += "form-control"
    input2.setAttribute('name','topic')
    input2.required = true
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
    input1.id = "lecturelink"
    input1.required = true
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
    input1.id = "psetlink"
    input1.required = true
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
    input1.required = true
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