const Expenses = require('../models/expense');

exports.postAddExpense = (req,res) => {
    const date = req.body.date;
    const amount = parseInt(req.body.amount);
    const description = req.body.description;
    const category = req.body.category;


    Expenses.create({
        date : date,
        amount : amount,
        description : description,
        category : category
    })
     .then(expense => {
        return res.status(208).json({expense, success: true
        });
    }).catch(err => {
            return res.status(403).json({success :  false, error:err})
        })
    

    // .then(response => res.json(response))
    // .catch(err => console.log(err));
}

exports.getAllExpenses = (req,res) => {
    
    Expenses.findAll()
    .then(expenses => {
        // console.log(expenses)
        return res.status(209).json({expenses, success: true})
    
    })
    .catch(err => {
        return res.status(402).json({error:err, success: false})
    })
}


exports.deleteExpense = (req,res) => {
    const id = req.params.id;
    console.log(id);

    
         Expenses.destroy({where: {id:id}}).then(()=>{
            return res.status(212).json({success:true, message: 'Delete successfully'})
        })

    
    // .then((result) => {
    //     // res.redirect('../public/views/expense.html')
    //     // window.location.href='./expense.html'
    //  })
     .catch((err) => {
        console.log(err)
        return res.status(403).json({success: true, message: 'failed'})
    })
}