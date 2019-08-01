const firestore = firebase.firestore()


const yr_1 = document.getElementById('yr1')
const yr_2 = document.getElementById('yr2')
const yr_3 = document.getElementById('yr3')
const yr_4 = document.getElementById('yr4')

const sub_yr_1 = document.getElementById('subsel-yr1')
const sub_yr_2 = document.getElementById('subsel-yr2')
const sub_yr_3 = document.getElementById('subsel-yr3')
const sub_yr_4 = document.getElementById('subsel-yr4')

const f1 = document.getElementById('filler1')
const f2 = document.getElementById('filler2')
const f3 = document.getElementById('filler3')
const f4 = document.getElementById('filler4')

var sub = null
yr_1.addEventListener('submit',async (e)=>{
    empty();
    e.preventDefault();
    sub = sub_yr_1.options[sub_yr_1.selectedIndex].value
    console.log(sub)
    var x = await firestore.collection('Subjects').where('subname','==',sub).get()
    var res = (valid_res(x.docs))?x.docs[0].data().resources:"No Notes For this Course"
    console.log(typeof(res))
    if(typeof(res) == "object")
    {
        i = 1
        str = ""
        res.forEach(ele => {
            str = str+'<a href="'+ele+'" class="btn btn-success mx-3 my-1" target="_blank">Resource '+i+'</a></li>' 
            i = i+1
        })
        f1.innerHTML = str
    }
    else
    {
        f1.innerHTML = "<h4>"+res+"</h4>"   
    }
})
yr_2.addEventListener('submit',async (e)=>{
    e.preventDefault();
    empty()
    sub = sub_yr_2.options[sub_yr_2.selectedIndex].value
    var x = await firestore.collection('Subjects').where('subname','==',sub).get()
    var res = (valid_res(x.docs))?x.docs[0].data().resources:"No Notes For this Course"
    console.log(typeof(res))
    if(typeof(res) == "object")
    {
        i = 1
        str = ""
        res.forEach(ele => {
            str = str+'<a href="'+ele+'" class="btn btn-success mx-3 my-1" target="_blank">Resource '+i+'</a></li>' 
            i = i+1
        })
        f2.innerHTML = str
    }
    else
    {
        f2.innerHTML = "<h4>"+res+"</h4>"   
    }
})
yr_3.addEventListener('submit',async (e)=>{
    e.preventDefault();
    sub = sub_yr_3.options[sub_yr_3.selectedIndex].value
    var x = await firestore.collection('Subjects').where('subname','==',sub).get()
    var res = (valid_res(x.docs))?x.docs[0].data().resources:"No Notes For this Course"
    console.log(typeof(res))
    if(typeof(res) == "object")
    {
        i = 1
        str = ""
        res.forEach(ele => {
            str = str+'<a href="'+ele+'" class="btn btn-success mx-3 my-1" target="_blank">Resource '+i+'</a></li>' 
            i = i+1
        })
        f3.innerHTML = str
    }
    else
    {
        f3.innerHTML = "<h4>"+res+"</h4>"   
    }
})
yr_4.addEventListener('submit',async (e)=>{
    e.preventDefault();
    sub = sub_yr_4.options[sub_yr_4.selectedIndex].value
    var x = await firestore.collection('Subjects').where('subname','==',sub).get()
    var res = (valid_res(x.docs))?x.docs[0].data().resources:"No Notes For this Course"
    console.log(typeof(res))
    if(typeof(res) == "object")
    {
        i = 1
        str = ""
        res.forEach(ele => {
            str = str+'<a href="'+ele+'" class="btn btn-success mx-3 my-1" target="_blank">Resource '+i+'</a></li>' 
            i = i+1
        })
        f4.innerHTML = str
    }
    else
    {
        f4.innerHTML = "<h4>"+res+"</h4>"   
    }
})

function valid_res(arr)
{
    if(arr.length == 1)
        return true;
    else    
        return false;
}
function empty()
{
    f1.innerHTML=""
    f2.innerHTML=""
    f3.innerHTML=""
    f4.innerHTML=""
}
