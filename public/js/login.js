const signUp = document.getElementById("signUp");
const signIn = document.getElementById("signIn");
const container = document.getElementById("container");
const signUpBtn = document.getElementById("signUpBtn");
const loginBtn = document.getElementById("loginBtn");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

signUp.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signIn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

function signupsss(event){
 event.preventDefault()
 const email = document.getElementById('email').value;
const name = document.getElementById('name').value;
const password = document.getElementById('password').value;

const obj = {
    name,
    email,
    password
}
console.log(obj)

    axios
    .post('http://localhost:3000/signup', obj)
    .then((response)=>{
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
}
signUpBtn.addEventListener('click',signupsss)
