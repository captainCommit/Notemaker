const auth = firebase.auth()
const login = document.getElementById('login-form')
const data = document.getElementById('course-form')
var user = auth.currentUser

if(user)
{
    $('#login-form').hide();
    $('#course-form').show();
}
else
{
    $('#login-form').show();
    $('#course-form').hide();
}