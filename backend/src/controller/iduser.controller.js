const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

const db = admin.firestore();
const collectionName = 'users';

module.exports.getIduser = (req, res) => {

  const iduserId = req.query.iduserId;
  firebaseHelper
    .firestore
    .getDocument(db, collectionName, iduserId)
    .then(doc => res.status(200).send(doc))
    .catch(err => res.status(400).send('Error'));
};


module.exports.getIduser = async (req, res) => {
  let data = [];
  const optionsRef = db.collection(collectionName);
  await optionsRef.get()
    .then(snapshot => snapshot.forEach(doc => {
      data.push(doc.data());
    }))
    .then(doc => res.status(200).send(data))
    .catch(err => res.status(400).send('Error'));
};


module.exports.createIduser = (req, res) => {
  let data = req.body;

  firebaseHelper
    .firestore
    .createDocumentWithID(db, collectionName, data.iduserId, data)
    .then(doc => res.status(201).send(`Create iduser ${data.iduserId} Successfully !`))
    .catch(err => res.status(400).send('Error'));
};


module.exports.updateIduser = (req, res) => {
  const iduserId = req.params.iduserId;
  let data = req.body;

  firebaseHelper
    .firestore
    .updateDocument(db, collectionName, iduserId, data)
    .then(doc => res.status(200).send(`Update iduser ${iduserId} successfully !!!`))
    .catch(err => res.status(400).send('Error'));
};


module.exports.deleteIduser = (req, res) => {
  const iduserId = req.params.iduserId;
  firebaseHelper
    .firestore
    .deleteDocument(db, collectionName, iduserId)
    .then(doc => res.status(200).send(`Delete iduser ${iduserId} successfully !!!`))
    .catch(err => res.status(400).send('Error'));
};

module.exports.getUserbyid =  (req, res) => {
  let iduser = req.query.uid;
  db.collection('users').doc(iduser).get().then(data => { console.log(data.data())
  res.status(200).send(data.data()) 
  })
  
};

module.exports.updateUserid = (req,res) =>{
  let uid = req.body.uid;
  db.collection('users').doc(uid).set({
    name:req.body.name,
    email:req.body.email,
    photourl:req.body.photourl,
    birthday:req.body.birthday,
  }).then(()=>{
    res.status(200).send("ok")
  })
  
};