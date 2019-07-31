const firebaseConfig = {
    apiKey: "AIzaSyAdZao6GBCsDtUhHxQPqfSUpE6GFA22HBc",
    authDomain: "notemaker-1729.firebaseapp.com",
    databaseURL: "https://notemaker-1729.firebaseio.com",
    projectId: "notemaker-1729",
    storageBucket: "notemaker-1729.appspot.com",
    messagingSenderId: "438852777543",
    appId: "1:438852777543:web:dc5b4257fbe773d6"
  };

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage();
const db = firebase.database();
var form = document.getElementById('msform')
var uname = document.getElementById('name')
var email = document.getElementById('email')
var files = document.getElementById('doc')

files.addEventListener('change',function(e){
    var len = e.target.files.length
    window.names = []
    window.files = e.target.files
    for(var  i = 0;i<len;i++)
    {
        window.names.push(e.target.files[i].name)
    }

})

form.addEventListener('submit',function(e)
{
    window.count = 0
    e.preventDefault();
    if(window.files.length == 0)
    Swal.fire('Hey!!! :(','Select Some Files','error');
    uploadobj = {
            name : uname.value,
            email : email.value,
            files : window.names.toString()
    }
    console.log(window.names.length)
    for(var i = 0; i < window.files.length; i++)
    {
        var sRef = storage.ref('Bulk/'+window.names[i])
        console.log(window.names[i])
        var task = sRef.put(window.files[i]);
        task.on('state_changed',
        function progress(snapshot)
        {
            var percentage = (snapshot.bytesTransferred/ snapshot.totalBytes)*100;
            uploader.value = percentage
            if(percentage == 100)
            {
                window.flag = 1
                window.count +=1
                console.log(window.count);
                if(window.count == window.names.length)
                {
                    db.ref('Bulk').push(uploadobj).then(function()
                    {
                        Swal.fire('Yayy!!!','Your files have been uploaded successfully','success');
                    })
                }
            }
        },
        function error(err)
        {
            Swal.fire('Oops!!!','Some error has occured while uploading '+window.names[i],'error');
            window.flag = 0
        })
    }
})