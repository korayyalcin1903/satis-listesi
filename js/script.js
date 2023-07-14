
let productName = document.querySelector(".product-name")
let productPrice = document.querySelector(".product-price")
let productAmount = document.querySelector(".product-amount")

let addBtn = document.querySelector(".add-btn")
let clean = document.querySelector(".clean")

let alertWarning = document.querySelector(".alert")
let tableTitle = document.querySelector(".table-title")

let product = document.querySelector(".products .list-group")

let totalAmount = document.querySelector(".total-amount")

let products = []

window.onload = () => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
        load();
    }
    console.log(products)
    productControl()
}

const productControl = () => {
    if(products.length>0){
        tableTitle.classList.remove("d-none")
        tableTitle.classList.add("d-block")
        tableTitle.classList.add("d-flex")
    }
    else {
        tableTitle.classList.add("d-none")
    }
}

load = () => {
    products.map(products => {
        console.log(products.id, products.productName, products.price, products.amount)
        let prod = `
                <li class="list-group-item list-group-item-info">
                <div class="row">
                    <div class="col-6 d-flex flex-wrap">
                        <span class="product-name">${products.productName}</span>
                    </div>
                    <div class="col-3">${products.price}</div>
                    <div class="col-2">${products.amount}</div>
                    <div class="col-1 btn btn-danger delete" onclick="del(${products.id})"> X </div>
                </div>
                </li>
        `
        product.insertAdjacentHTML("beforeend",prod)
    })
    topla()
}

addBtn.addEventListener("click", () => {
    productControl()
    if(productName.value !== "" && productPrice.value !== "" && productAmount.value !== ""){
        product.innerHTML = ""
        products.push({
            id:Math.floor(Math.random() * (9999999999 - 0) + 0),
            productName:productName.value, 
            price:productPrice.value, 
            amount:productAmount.value
        })
        localStorage.setItem('products', JSON.stringify(products))
        load()
    }
    else {
        alertWarning.classList.remove("d-none")
        alertWarning.classList.add("d-block")
    }
    totalAmount.innerHTML = total
})

clean.addEventListener("click", () => {
    localStorage.removeItem("products")
    product.innerHTML = ""
    productControl()
    location.reload()
})



const topla = () => {
    let total = 0
    products.map(products => {
        total += parseInt(products.price*products.amount)
    })
    
    totalAmount.innerHTML = total
    productControl()
}

const del = (id) => {
    products = products.filter((product) => {
      return product.id !== id
    })
    product.innerHTML = ""
    localStorage.setItem('products', JSON.stringify(products))
    load()
    productControl()
  }
  