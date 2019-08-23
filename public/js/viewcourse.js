const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
/* Firebase */

const database = firebase.database()
const storage = firebase.storage()
const firestore = firebase.firestore()

/* Form Values */
var searchInput = document.getElementById('search-query')
var typeInput = document.getElementById('type-of-query')
var submitBtn = document.getElementById('submitbtn')
let cardContainer = document.getElementById('card-container')

/* Modal Values */
const heading = document.getElementById('heading')
const subname = document.getElementById('subname')
const subcode = document.getElementById('subcode')
const year =document.getElementById('year')
const level = document.getElementById('level')
const startingdate = document.getElementById('startingdate')
const length = document.getElementById('length')
const credits_alloted = document.getElementById('credits_alloted')
const has_practical = document.getElementById('has_practical')
const aboutcourse = document.getElementById('aboutcourse')
const prerequisites = document.getElementById('prerequisites')
const instructors = document.getElementById('instructors')
const lecture_notes = document.getElementById('lecture_notes')

submitBtn.addEventListener('click',populate)

async function populate(e)
{   
    e.preventDefault()
    const text = searchInput.value
    const type = typeInput.options[typeInput.selectedIndex].value
    var res = null;
    switch(type)
    {
        case 'name':
            res = await search('subname','==',text)
            break;
        case 'id':
            res = await search('subcode','==',text)
            break;
        case 'year':
            if(isNaN(text))
            {
                Swal.fire('Error','Year Must Be A Number','error')
                return
            }
            res = await search('year','==',text)
            break;
    }
    if(empty(res))
        return
    else
    {
        var subArray = []
        cardContainer.innerHTML = ""
        for(x in res)
        {
            subArray.push(res[x].data())
            createSubCard(res[x].data())
            document.getElementById(res[x].data().subcode).addEventListener('click',clickHandler)        
        }
        window.subArray = subArray
    }
}
async function search(parameter,operation,value)
{
    var res = await firestore.collection('Course').where(parameter,operation,value).get()
    return (res.docs)
}
function empty(res)
{
    if(res.length == 0)
    {
        Swal.fire('Info','Search returned zero results. Please change your query')
        return true;
    }
    else
        return false
}

let createSubCard = (sub)=> 
{
    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer my-3';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h4');
    title.innerText = sub.subname;
    title.className = 'card-title';

    let subtitle = document.createElement('h5');
    subtitle.innerText = sub.subcode;
    subtitle.className = 'card-subtitle mb-2 text-muted'

    let date = document.createElement('h6');
    date.innerText = 'Starting Date : '+sub.startingdate;
    date.className = 'card-subtitle mb-2 text-muted';

    let about = document.createElement('div');
    about.innerText = sub.aboutcourse;
    about.className = 'card-about';

    cardBody.appendChild(title);
    cardBody.appendChild(subtitle);
    cardBody.appendChild(date);
    cardBody.appendChild(about)
    card.appendChild(cardBody);
    card.id = sub.subcode
    cardContainer.appendChild(card);
}
function filter(array,subcode)
{
    return array.filter((e)=>{
        return e.subcode == subcode
    })
}
function clickHandler(e)
{
    const obj = filter(window.subArray,this.id)[0]
    console.log(obj)
    heading.innerText = obj.subname
    
    subname.innerText = obj.subname
    subcode.innerText = obj.subcode
    switch(obj.year)
    {
        case "1":
            year.innerText = "First"
            break;
        case "2":
            year.innerText = "Second"
            break;
        case "3":
            year.innerText = "Third"
            break;
        case "4":
            year.innerText = "Final"
            break;
    }
    level.innerText = (obj.type == "ug")?"Undergraduate" : "Postgraduate"
    length.innerText = obj.length
    credits_alloted.innerText = obj.credits_alloted
    has_practical.innerText = obj.has_practical
    var mm = months[parseInt(obj.startingdate[5]+obj.startingdate[6],10)-1]
    var dd = obj.startingdate[8]+obj.startingdate[9]
    var yyyy = obj.startingdate[0]+obj.startingdate[1]+obj.startingdate[2]+obj.startingdate[3]
    startingdate.innerText = dd+" "+mm+" "+yyyy;
    aboutcourse.innerText = obj.aboutcourse
    prerequisites.innerText = obj.prerequisites
    instructors.innerHTML = ""
    for(x in obj.instructor)
    {
        console.log(obj.instructor[x])
        var col = document.createElement('div')
        col.className = "col-md-3 text-center"

        var imageHolder = document.createElement('div')
        imageHolder.className = "row mt-1"

        var captionHolder = document.createElement('div')
        captionHolder.className = "row mt-1 text-center text-muted"

        var image = document.createElement('img')
        image.src = obj.instructor[x]
        image.height = "100"
        image.width = "100"
        imageHolder.appendChild(image)

        captionHolder.innerText = x

        col.appendChild(imageHolder)
        col.appendChild(captionHolder)
        console.log(col)
        instructors.appendChild(col)
    }
    var count = 1
    lecture_notes.innerHTML = ""
    for(x in obj.lecture_notes)
    {
        var anchor = document.createElement('a')
        anchor.href = obj.lecture_notes[x]
        anchor.class = 'list-group-item list-group-item-action'
        anchor.innerText = 'Lecture '+(count++)
        lecture_notes.appendChild(anchor)
    }
    $('#myModal').modal('show');
}