const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./model/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded())
app.use(express.static('assets'));

var contactList = [
    {
        name: "Ravi",
        phone: "1234555665"
    },
    {
        name: "sone",
        phone: "5444544"
    },
    {
        name: "ddood",
        phone: "145256363"
    }
]

app.get('/', function(req,res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('error in fetching contact fro db');
            return;
        }
        return res.render('home',{ 
            title : " My contact list",
            contact_list: contacts
        });
    })

    
});

app.post('/crete-contact', function(req, res){
    // contactList.push(req.body)
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('Error in creating the contact');
        return;}

        console.log('******', newContact);
        return res.redirect('back');
    })

    // return res.redirect('/');
    
})

app.get('/delete-contact', function(req,res){
    // console.log(req.query);
    let id = req.query.id;

    Contact.findOneAndDelete(id,function(err){
        if(err){
            console.log('error in deleting the contact from databases');
            return;
        }
    return res.redirect('back');
    })
    

});

app.listen(port, function(err){
    if(err){
        console.log("The server have error in running",err);
    }
    console.log("Yup! Server is running on the port :",port);
})