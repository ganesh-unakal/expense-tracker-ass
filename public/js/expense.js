const expenseAmount = document.querySelector('#expense-amount');
const expenseInfo = document.querySelector('#expense-info');
const expenseCategory = document.querySelector('#expense-category');
let btn = document.querySelector('.btn');

const table = document.getElementById('tbodyId');
// let expesneList = document.querySelector('.expense-list');

async function addExpense(e) {
    e.preventDefault();

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth()+1;
    const year = currentDate.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedmonth = month < 10 ? `0${month}` : month

    const dateStr = `${formattedDay}-${formattedmonth}-${year}`

    // const id = document.getElementById('expesne-id').value;

    let obj = {
        date : dateStr,
        amount: parseInt(expenseAmount.value),
        description: expenseInfo.value,
        category: expenseCategory.value
    }
    console.log(obj)
    const res = await axios.post(`http://localhost:3000/add-expenses`, obj)
        .then((reposne) => {
            reposne.data.expense
            console.log(reposne)
        })
    window.location.reload();




    // const id = document.getElementById('expense-id').value;




    //     const li = document.createElement('li');
    //     li.className = ('list-group-item d-flex justify-content-between align-items-center');
    //     const span = document.createElement('span');
    //     span.appendChild(document.createTextNode(`${reponse.data.amount} ${expenseInfo.description} ${expenseCategory.category}`));
    //     li.appendChild(span)
    //    }catch (err){
    //     alert('please fill all fields ')
    //    }

}


btn.addEventListener('click', addExpense)

// const table = document.getElementById('tbodyId');

async function getAllExpenses() {
    try {
        const res = await axios.get("http://localhost:3000/get-allexpenses");
        console.log(res.data);

        // Clear existing table content
        table.innerHTML = '';

        res.data.expenses.forEach((expense) => {
            const id = expense.id;
            const date = expense.date;
            const categoryValue = expense.category;
            const descriptionValue = expense.description;
            const amountValue = expense.amount;

            let tr = document.createElement("tr");
            tr.className = "trStyle";

            let idValue = document.createElement("th");
            idValue.setAttribute("scope", "row");
            idValue.setAttribute("style", "display: none");

            let th = document.createElement("th");
            th.setAttribute("scope", "row");

            tr.appendChild(idValue);
            tr.appendChild(th);

            idValue.appendChild(document.createTextNode(id));
            th.appendChild(document.createTextNode(date));

            let td1 = document.createElement("td");
            td1.appendChild(document.createTextNode(categoryValue));

            let td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(descriptionValue));

            let td3 = document.createElement("td");
            td3.appendChild(document.createTextNode(amountValue));

            let td4 = document.createElement("td");

            let deleteBtn = document.createElement("button");
            deleteBtn.className = "editDelete btn btn-danger delete";
            deleteBtn.appendChild(document.createTextNode("Delete"));
      
            let editBtn = document.createElement("button");
            editBtn.className = "editDelete btn btn-success edit";
            editBtn.appendChild(document.createTextNode("Edit"));
      
            td4.appendChild(deleteBtn);
            td4.appendChild(editBtn);
      

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            table.appendChild(tr);
        });
    } catch (err) {
        console.error("Error getting expenses:", err);
    }
}

document.addEventListener('DOMContentLoaded', getAllExpenses);

async function deleteExpense(e){
    try{
        if(e.target.classList.contains('delete')){
            let tr = e.target.parentElement.parentElement;
            let id = tr.children[0].textContent;
            const res = await axios.get(`http://localhost:3000/delete-expense/${id}`);
            
            window.location.reload()
            console.log('successfully deleted',id)
        }
    }catch {
        (err) => console.log(err);
    }
}

table.addEventListener('click', (e) => {
    deleteExpense(e)
})