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
var sub = document.getElementById('sub')


var sRef = null;
var url = ""
document.getElementById('seeform').addEventListener('submit',function(e){
    e.preventDefault();
    console.log("test");
    var x = sub.options[sub.selectedIndex].value;
    switch(x)
    {
        case 'engm':
            url = "Gate_Notes/EngineeringMathematics.pdf"
            break;
        case 'dm':
            url = "Gate_Notes/DiscreteMathematics.pdf"
            break;
        case 'gt':
            url = "Gate_Notes/GraphTheory.pdf"
            break;
        case 'cao':
            url = "Gate_Notes/ComputerArchitecture.pdf"
            break;
        case 'dl':
            url = "Gate_Notes/DigitalLogic.pdf"
            break;
        case 'dsa':
            url = "Gate_Notes/DAAandDS.pdf"
            break;
        case 'toc':
            url = "Gate_Notes/TheoryOfComputation.pdf"
            break;
        case 'cd':
            url = "Gate_Notes/CompilerDesign.pdf"
            break;
        case 'os':
            url = "Gate_Notes/OperatingSystems.pdf"
            break;
        case 'dbms':
            url = "Gate_Notes/DBMS.pdf"
            break;
        case 'cn':
            url = "Gate_Notes/ComputerNetworks.pdf"
            break;
        case 'se':
            url = "Gate_Notes/SoftwareEngineering.pdf"
            break;
        default:
            alert('Wrong Option Chosen !!!');
    }
    sRef = storage.ref(url)
    sRef.getDownloadURL().then(function(url){
    window.open(url,"_blank")
    })
})