const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}))

var listProduct = [];
var productObject;

app.get("/admin", (req, res) => {
    res.render("home", {
        file: "listproducts",
        title: "Danh sách sản phẩm",
        products: listProduct
    });
})

app.get("/edit", (req, res) => {
    productObject = {
        id: 0,
        name: "",
        price: null,
        sizeS: 0,
        sizeM: 0,
        sizeL: 0,
        photos: '',
        description: ''
    };
    res.render("home", {
        file: "editproducts",
        title: "Cập nhật sản phẩm",
        info: productObject
    });
})

app.get("/edit/:id", (req, res) => {
    const i = req.params.id; 
    productObject = listProduct[i];

    res.render("home", {
        file: "editproducts",
        title: "Cập nhật sản phẩm",
        info: productObject
    });
})

app.post("/", (req, res) => {
    var product = req.body;
    console.log(product.id);

    if(Number(product.id) > 0) {
        listProduct[Number(product.id)-1] = product
    } else {
        product.id = listProduct.length + 1;
        listProduct.push(product);
    }
    res.redirect("/admin");
})

app.listen(3000, () => {
    console.log("Server start on port 3000");
});