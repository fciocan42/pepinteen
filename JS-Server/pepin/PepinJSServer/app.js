const crypto = require('crypto');
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // enables parsing of form data
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Home page route
app.get('/', (req, res) => {
    res.render('index');
});

// About page route
app.get('/about', (req, res) => {
    res.render('about');
});

// Blog page route
app.get('/blog', (req, res) => {
    const userAgent = req.get("user-agent");

    fs.readFile('./data/articles.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
        } else {
            const articles = JSON.parse(data).articles;
            // Pentru requesturi din Postman, returnam obiect de tip JSON
            if (userAgent.includes("PostmanRuntime")) {
                res.status(200).send(articles);
            } else {
                // Pentru requesturi din browser randam pagina html
                res.render('blog', { articles: articles });
            }
        }
    });
});

// new-article page route
app.get('/new-article', (req, res) => {
    res.render('new-article');
});

// Adaugare articol nou (POST)
app.post('/new-article', (req, res) => {

    const userAgent = req.get("user-agent");
    console.log(req.files);

    fs.readFile('./data/articles.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
        } else {
            // Obtine imaginea de pe request in caz ca exista
            const { image } = req.files || {};

            // Incarca articolele existente in lista de articole din fisierul din folderul /data
            const articles = JSON.parse(data).articles;

            // Genereaza random idul articolului 
            const articleId = crypto.randomUUID();

            // Creeaza un obiect JSON pentru articol, obiect ce va fi salvat in lista cu toate articolele blogului
            const newArticle = {
                id: articleId,
                title: req.body.title,
                content: req.body.content,
            };

            // Daca avem imagine pe request:
            if (image) {
                // Daca imaginea nu are tipul potrivit (extensie si nu numai) 
                // trebuie sa prevenim incarcarea acesteia
                let imageTypeOk = true

                // TODO verifica daca fisierul primit este o imagine sau nu
                // In caz contrar returnam 400 Bad request si nu salvam imaginea
                // Schimba conditia din if care momentan permite incarcarea oricarui tip de fisier
                if (!imageTypeOk) return res.sendStatus(400);

                // Copiaza imaginea in folderul /img
                const imagePath = __dirname + '/img/article_' + newArticle.id
                console.log(imagePath)
                image.mv(imagePath);
            }


            console.log(req.body);
            console.log(newArticle);

            // Actualizeaza lista de articole si scrie in fisier
            articles.push(newArticle);
            const newData = JSON.stringify({ articles: articles });
            fs.writeFile('./data/articles.json', newData, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Server Error');
                } else if (userAgent.includes("PostmanRuntime")) {
                    // Pentru requesturi din Postman, returnam obiect de tip JSON
                    res.status(200).send(newArticle);
                } else {
                    // Pentru requeesturi din browser randam pagina html
                    res.redirect('blog');
                }
            });
        }
    });
});

// Obtinere articol (GET)
app.get('/article/:id', (req, res) => {
    // Citeste intreg fisierul cu articole
    fs.readFile('./data/articles.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
        } else {
            const id = req.params.id;
            const articles = JSON.parse(data).articles;
            // Cauta in lista de articole pe baza idului si returneaza articolul respectiv
            // Pentru requesturi din Postman, returnam obiect de tip JSON
            // Pentru requesturi din browser randam pagina
            const selectedArticle = articles.filter(article => article.id === id);

            console.log(id, selectedArticle, selectedArticle === []);

            if (selectedArticle.length === 0) {
                // Tratam cazul in care nu gasim un articol cu idul primit in request
                // 404 Not Found
                res.status(404);
                res.render('404');
            } else {
                console.log(selectedArticle);
                // Randam butonul de editare a articolului
                res.render('edit-article', { article: selectedArticle[0] });
            }
        }
    });
});


// Actualizeaza continutul articolului pe baza ID-ului (PUT)
app.put('/article/:id', (req, res) => {
    const userAgent = req.get("user-agent");

    // console.log(userAgent);

    // Citeste intreg fisierul cu articole
    fs.readFile('./data/articles.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
        } else {
            const articles = JSON.parse(data).articles;
            const id = req.params.id;

            // Articolul modificat pe baza requestului primit (titlu nou, continut nou)
            const modifiedArticle = {
                id: id,
                title: req.body.title,
                content: req.body.content
            };

            // Cauta in lista de articole pe baza idului primit ca parametru
            const index = articles.findIndex(article => article.id === id);

            if (index !== -1) {
                // Actualizeaza articolul de la indexul primit in caz ca a fost gasit in lista
                articles[index] = modifiedArticle;

                // Actualizeaza lista de articole si scrie in fiser
                const newData = JSON.stringify({ articles: articles });
                fs.writeFile('./data/articles.json', newData, (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Server Error');
                    } else if (userAgent.includes("PostmanRuntime")) {
                        // Pentru requesturi din Postman, returnam obiect de tip JSON
                        res.status(200).send(modifiedArticle);
                    } else {
                        // Pentru requesturi din browser randam pagina
                        res.redirect('/blog');
                    }
                });

                // TODO Suprascrieti imaginea articolului, momentan updateul schimba doar titlul si continutul articolului

            }

        }
    });
});

// Sterge articol pe baza ID-ului (DELETE)
app.delete('/article/:id', (req, res) => {
    const userAgent = req.get("user-agent");

    // console.log(userAgent);

    // Citeste intreg fisierul cu articole
    fs.readFile('./data/articles.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
        } else {
            const articles = JSON.parse(data).articles;
            const id = req.params.id;

            // Cauta in lista de articole pe baza idului primit ca parametru
            const index = articles.findIndex(article => article.id === id);

            if (index !== -1) {
                // Sterge articolul de la indexul primit in caz ca a fost gasit in lista
                articles.splice(index, 1);

                // Actualizeaza lista de articole si scrie in fiser
                const newData = JSON.stringify({ articles: articles });
                fs.writeFile('./data/articles.json', newData, (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Server Error');
                    } else if (userAgent.includes("PostmanRuntime")) {
                        // Pentru requesturi din Postman, returnam obiect de tip JSON
                        res.status(204).send();
                    } else {
                        // Pentru requesturi din browser randam pagina
                        res.redirect('/blog');
                    }
                });

                // TODO Stergeti si imaginea asociata articolului din folderul img/
                // Imaginea are numele de forma article_<article_uuid>
            }

        }
    });
});

// 404 route
app.get('*', (req, res) => {
    res.status(404).render('404');
});


// Porneste serverul pe portul 3001 
// Accesati in browser http://localhost:3001/
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});