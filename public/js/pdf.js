
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

var year = document.getElementById('year')
var sub = document.getElementById('sub')
var cont = document.getElementById('container')
var link = document.getElementById('lnk')
document.getElementById('searchform').addEventListener('submit',function(e){
    e.preventDefault();
    var year_value = year.value
    var sub_value = sub.value
    var path = "Question_Paper/"+year_value+"/"+sub_value+"/paper.pdf"
    console.log(path)
    var sRef = storage.ref(path)
    sRef.getDownloadURL().then(function(url){
        cont.setAttribute('data',url)
        link.setAttribute('href',url)
    }).catch(function(err){
        Swal.fire('Oops','Some error Occured','error');
    })
})