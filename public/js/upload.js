const storage = firebase.storage();
const db = firebase.database();


var email = document.getElementById('email')
var phno = document.getElementById('phno')
var year = document.getElementById('year')
var course = document.getElementById('course').options[document.getElementById('course').selectedIndex].value;
var type_of_doc = document.getElementById('type')
var type = type_of_doc.options[document.getElementById('type').selectedIndex].value;
var fileinp = document.getElementById('doc')
var uploader = document.getElementById('uploader');
var submit = document.getElementById('submit')
var qpyear = document.getElementById('year_qp');
var qpsub = document.getElementById('sub');
var sRef = null;
var dbRef = null;
type_of_doc.addEventListener('change',function(){
    type = type_of_doc.options[document.getElementById('type').selectedIndex].value;
    if(type == 'qp')
    {
        document.getElementById('hidden').style.visibility = "visible";
        qpyear.setAttribute('required',true)
        qpsub.setAttribute('required',true)
    }
    else
    {
        document.getElementById('hidden').style.visibility = "hidden";
    }
})

fileinp.addEventListener('change',function(e){
     window.file = e.target.files[0];
})


document.getElementById('msform').addEventListener('submit',function(e){
    console.log('test')
    e.preventDefault()
    var x,y;
    var uploadobj = null;
    if(type == "qp")
    {
        x = qpsub.value
        y = qpyear.value
        sRef = storage.ref('Question_Paper/'+y+'/'+x+'/paper.pdf');
    }
    else if(type == "notes")
        sRef = storage.ref('Notes/'+window.file.name);
    else if(type == "books")
        sRef = storage.ref('Books/'+window.file.name);
    else
    {
        sRef = storage.ref('Others/'+window.file.name);
    }
    if(type!= "qp")
    {
        uploadobj = {
            uploaderEmail : email.value,
            uploaderPhno : phno.value,
            uploaderYear : year.value,
            uploaderCourse : course,
            typeOfUpload : type,
            fileName : file.name,
        }
    }
    else
    {
        console.log(x,y)
        uploadobj = {
            uploaderEmail : email.value,
            uploaderPhno : phno.value,
            uploaderYear : year.value,
            uploaderCourse : course,
            typeOfUpload : type,
            fileName : window.file.name,
            QuestionPaperYear : y,
            QuestionPaperSubject : x
        }
    }
    console.log(uploadobj)
    var task = sRef.put(window.file);
    task.on('state_changed',
        function progress(snapshot)
        {
            var percentage = (snapshot.bytesTransferred/ snapshot.totalBytes)*100;
            uploader.value = percentage
            if(percentage == 100)
            {
                uploader.style.display = "hidden"
                dbRef = db.ref('uploader').push(uploadobj).then(function(){
                    Swal.fire('Yayy!!!','Your file has been uploaded successfully','success');
                })
            }
        },
        function error(err)
        {
            Swal.fire('Oops!!!','Some error has occured','error');
        }
    )
})

