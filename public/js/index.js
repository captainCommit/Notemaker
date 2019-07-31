const firebaseConfig = {
  apiKey: "AIzaSyAdZao6GBCsDtUhHxQPqfSUpE6GFA22HBc",
  authDomain: "notemaker-1729.firebaseapp.com",
  databaseURL: "https://notemaker-1729.firebaseio.com",
  projectId: "notemaker-1729",
  storageBucket: "notemaker-1729.appspot.com",
  messagingSenderId: "438852777543",
  appId: "1:438852777543:web:dc5b4257fbe773d6"
};
/* Firebase Initialization */


firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()
const database = firebase.database()
const firestore = firebase.firestore()

var dRef = firebase.database().ref('contribs')

/* form - data */
const msform = document.getElementById('msform')
const name = document.getElementById('name')
const email = document.getElementById('email')
const sub = document.getElementById('sub')
const data_type = document.getElementById('data_type')
const link = document.getElementById('link')
const doc = document.getElementById('doc')
const submit = document.getElementById('submit')

/* Change Listener */
doc.disabled = true
data_type.addEventListener('change',e =>{
  e.preventDefault();
  var ch = data_type.options[data_type.selectedIndex].value
  switch(ch)
  {
    case 'link':
      doc.disabled = true
      link.disabled = false
      break
    case 'up':
      link.disabled = true
      doc.disabled = false
      break;
  }
})

doc.addEventListener('change',function(e){
  window.file = e.target.files[0];
})


/* Submit Listener */
msform.addEventListener('submit',async (e)=>{
    e.preventDefault()
    var downloadUrl = "to be filled"
    var Name = name.value
    var Email = email.value
    var Sub = sub.options[sub.selectedIndex].value
    var Data_type = data_type.options[data_type.selectedIndex].value
    var Link = link.value
    var uploadObj ={}
    console.log(Data_type)
    if(Data_type == 'link')
    {
        uploadObj = {
          name : Name,
          email : Email,
          sub : Sub,
          type_of_resource : Data_type,
          link_to_resource : Link
        }
    }
    else
    {
      var ref = 'Notes/'+window.file.name
      console.log(ref)
      await storage.ref(ref).put(window.file)
      var url = await storage.ref(ref).getDownloadURL()
      uploadObj = {
        name : Name,
        email : Email,
        sub : Sub,
        type_of_resource : Data_type,
        link_to_resource : url
      }
    }
    var batch = firestore.batch();
    var fRef = firestore.collection('Subjects').where("subname","==",Sub)
    var x = await fRef.get()
    var arr = x.docs
    if(arr.length == 1)
    {
        const object = arr[0]
        var temp = object.data().resources
        temp.push(uploadObj.link_to_resource)
        console.log(temp)
        batch.update(object.ref,{resources : temp})
        await batch.commit()
        await dRef.push(uploadObj)
        console.log('Done')
    }
})