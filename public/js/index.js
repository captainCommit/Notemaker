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
    else if(arr.length == 0)
    {
      await  firestore.collection("Subjects").doc(Sub).set({
            subname : Sub,
            sub_year : getyear(Sub),
            resources : [uploadObj.link_to_resource]
        })
      await dRef.push(uploadObj)
      console.log("Done")
    }
    else
    {
        alert("Error in Query ")
    }
})

function getyear(subname)
{
    year = 0 
    switch(subname)
    {
      case  "phy1":
        year = 1
        break
      case  "che1":
        year = 1
        break
      case  "math1":
        year = 1
        break
      case  "cs":
        year = 1
        break
      case  "eng":
        year = 1
        break
      case  "ee":
        year = 1
        break
      case  "phy2":
        year = 1
        break
      case  "che2":
        year = 1
        break
      case  "math2":
        year = 1
        break
      case  "ele":
        year = 1
        break
      case  "em":
        year = 1
        break
      case  "soc":
        year = 1
        break
      case  "dl":
        year =2
        break
      case  "ds":
        year =2
        break
      case  "dm":
        year =2
        break
      case  "evs":
        year =2
        break
      case  "mp":
        year =2
        break
      case  "pds":
        year = 2
        break
      case  "co":
        year = 2
        break
      case  "daa":
        year = 2
        break
      case  "os":
        year = 2
        break
      case  "sip":
        year = 2
        break
      case  "cn":
        year =3
        break
      case  "ot":
        year =3
        break
      case  "se":
        year =3
        break
      case  "dbms":
        year =3
        break
      case  "ca":
        year =3
        break
      case  "dis":
        year = 3
        break
      case  "it":
        year = 3
        break
      case  "cg":
        year = 3
        break
      case  "flat":
        year = 3
        break
      case  "ied":
        year = 3
        break
      case  "agt":
        year = 4
        break
      case  "cd":
        year = 4
        break
      case  "ai":
        year = 4
        break
      case  "dsp":
        year = 4
        break
      case  "wsn":
        year = 4
        break
      case  "ids":
        year = 4
        break
      default:
        year =0
        break
    }
    return year
}