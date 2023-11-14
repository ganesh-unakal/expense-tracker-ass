const signUp = document.getElementById("signUp");
const signIn = document.getElementById("signIn");
const container = document.getElementById("container");
const signUpBtn = document.getElementById("signUpBtn");
const loginBtn = document.getElementById("loginBtn");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const email = document.getElementById('email');
const name = document.getElementById('name');
const password = document.getElementById('password');


signUp.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signIn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

async function signupsss(event) {
    event.preventDefault()
    try {
        if (name.value && email.value && password.value) {
            const reposne = await axios
                .post('http://localhost:3000/signup', {
                    'name': name.value,
                    'email': email.value,
                    'password': password.value
                })
            console.log(reposne);
            console.log(reposne.data);
            alert('User signed up sucessfully')
        } else {
            alert('please fill in all fields');
        }
    } catch (error) {
        alert('user already exists',error.reposne.data.error);
    }

}
signUpBtn.addEventListener('click', signupsss)


async function loginHandler(event) {
    event.preventDefault();

    if (loginEmail && loginPassword) {
        if (loginEmail.value && loginPassword.value) {
            try {
                const response = await axios.post('http://localhost:3000/login', { 'email': loginEmail.value, 'password': loginPassword.value });
                console.log(response);
            } catch (error) {
                console.log(error);
                alert('Invalid Email or Password');
                console.log(error.response.data.error);
                alert(error.response.data.error);
            }
        } else {
            alert('Enter All the Fields')
        }
    }
}

loginBtn.addEventListener('click', loginHandler)