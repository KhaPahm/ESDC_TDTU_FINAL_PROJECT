const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}))

var listProduct = [];
//Đối tượng sản phẩm
var productObject;
//Đối tượng đơn hàng
var orders;

//Trang chủ admin
app.get("/admin", (req, res) => {
    res.render("home", {
        file: "listproducts",
        title: "Danh sách sản phẩm",
        products: listProduct
    });
})

//Trang edit
app.get("/edit", (req, res) => {
    //Đối tượng chuyền vào
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

//Cập nhật sản phẩm
app.get("/edit/:id", (req, res) => {
    const i = req.params.id; 
    productObject = listProduct[i];

    res.render("home", {
        file: "editproducts",
        title: "Cập nhật sản phẩm",
        info: productObject
    });
})


//Nhận thoogn tin cập nhật hoặc thêm mới
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

//Xem đơn hàng mới
app.get("/neworder", (req, res) => {
    order = {
        id: 1,
        customer: "Phạm Hoàng Khadsasfdasdasdasdas",
        phone: "0386611382",
        address: "19 Nguyễn Hữu Thọ",
        email: "khapham1909@gmail.com",
        pay: "Chưa",
        total: 120000
    }
    res.render("home", {
        file: "order",
        title: "Đơn hàng mới",
        orders: order
    })
})

app.listen(3000, () => {
    console.log("Server start on port 3000");
});