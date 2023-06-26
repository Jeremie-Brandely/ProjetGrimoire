const Books = require("../models/Books");
const fs = require("fs");


exports.getBooks = (req, res, next) => {
    Books.find()
    .then(Books => res.status(200).json(Books))
    .catch(error => res.status(400).json({ error }));
};


exports.createBook = (req, res, next) => {
  delete req.body._id;
  const book = new Books({
    ...req.body
  });
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré !'}))
        .catch(error => res.status(400).json({ error }));
        
    }

   

    exports.getBook = (req, res, next) => {
        Books.findOne({ _id: req.params.id})
        .then(Books => res.status(200).json(Books))
        .catch(error => res.status(404).json({ error }));
      }


exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete bookObject._userId;
    Books.findOne({_id: req.params.id})
        .then((books) => {
            if (books.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Books.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Livre modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

exports.deleteBook = (req, res, next) => {
  Books.findOne({ _id: req.params.id})
       .then(books => {
           if (books.userId != req.auth.userId) {
               res.status(401).json({message: 'Not authorized'});
           } else {
               const filename = books.imageUrl.split('/images/')[1];
               fs.unlink(`images/${filename}`, () => {
                   Book.deleteOne({_id: req.params.id})
                       .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                       .catch(error => res.status(401).json({ error }));
               });
           }
       })
       .catch( error => {
           res.status(500).json({ error });
       });
};




