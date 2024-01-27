let shopCart = document.querySelector(".shopCart");
let aside = document.querySelector("aside");
let allCarts = document.querySelector(".allCarts");
let btnClose = document.getElementById("close");
let allCartAdd = document.querySelector(".allCartAdd");
let allDetaill = document.querySelector(".allDetaill");
let logo = document.querySelector(".logo");
let allProducts = [];
let allData = [];
let spanPlace = document.querySelector(".shopCart span")
let estTrouve = false;


if(localStorage.length>0){
    storigeData = JSON.parse(localStorage.getItem("shoppingProduct"));
    allData = allData.concat(storigeData);
    CalcNumberProduct();
    allData.forEach(elm =>{
        afficherProductShoppingCart(elm.nbr, elm.prix, elm.img, elm.nom);
    })
}


// Ouvrire la bare de shopping cart
shopCart.addEventListener("click", function(){
    aside.classList.toggle("open");
    document.body.classList.toggle("widthBody");
    allCarts.classList.toggle("media");
})


// fermer la bare de shopping cart
btnClose.addEventListener("click", function(){
    aside.classList.remove("open");
    document.body.classList.remove("widthBody");
    allCarts.classList.remove("media");
})

// Afficher tous les produits comme des carts on page Home
function afficherAllProductInHome(){
        allProducts.forEach(elm =>{
            allCarts.innerHTML += `<div class="cart">
                                        <img src=${elm.image} alt="">
                                        <div class="nomProduct"><h3>${elm.name}</h3></div>
                                        <div class="prixProduct"><h4>$<span>${elm.price}</span></h4></div>
                                        <div class="btnAdd">
                                            <button>Add To Cart</button>
                                        </div>
                                  </div>`
        })
}

// afficher les produits dans la bare de shopping cart
function afficherProductShoppingCart(nbr, price, img, nom){
    let estCartTrouver = false;
    document.querySelectorAll(".cartAdd").forEach(cart=>{
        if(cart.querySelector("h4").innerHTML ==nom){
            estCartTrouver = true;
            cart.querySelector("h5 span").innerHTML = parseInt(price);
            cart.querySelector(".update h5").innerHTML = nbr;
        }
    })

    if(!estCartTrouver){
        allCartAdd.innerHTML += `<div class="cartAdd">
                                    <img src=${img} alt="">
                                    <h4>${nom}</h4>
                                    <h5>$<span>${price}</span></h5>
                                    <div class="update">
                                        <button class="sustraction">-</button>
                                        <h5>${nbr}</h5>
                                        <button class="addition">+</button>
                                    </div>
                                </div> `;

        //button "+" pour ajouter un produit
        let additionBtns = document.querySelectorAll(".addition");
        console.log(additionBtns)
        additionBtns.forEach(elm =>{
            elm.addEventListener("click", function(){
                allData.forEach(data =>{
                    if(data.nom == elm.parentElement.parentElement.querySelector("h4").innerHTML){
                        data.prix += price;
                        data.nbr++;
                        localStorage.setItem("shoppingProduct", JSON.stringify(allData));
                        CalcNumberProduct();
                        elm.parentElement.querySelector("h5").innerHTML = data.nbr;
                        elm.parentElement.parentElement.querySelector("h5 span").innerHTML = data.prix;
                        
                    }
                })
                
            })
        })

        //button "-" pour sustracter un produit
        let sustractionBtns = document.querySelectorAll(".sustraction");
        console.log(sustractionBtns)
        sustractionBtns.forEach((elm,index) =>{
            elm.addEventListener("click", function(){
                allData.forEach(data =>{
                    if(data.nom == elm.parentElement.parentElement.querySelector("h4").innerHTML){
                        data.prix -= price;
                        data.nbr--;
                        localStorage.setItem("shoppingProduct", JSON.stringify(allData));
                        CalcNumberProduct();
                        if(data.nbr <= 0){
                            allData.splice(index, 1);
                            localStorage.setItem("shoppingProduct", JSON.stringify(allData));
                            elm.parentElement.parentElement.remove();
                        }else{
                            elm.parentElement.querySelector("h5").innerHTML = data.nbr;
                            elm.parentElement.parentElement.querySelector("h5 span").innerHTML = data.prix;
                        }
                         
                    }
                })
                
            })
        })
    }

}

// Calculer le numbre de shopping cart
function CalcNumberProduct(){
    let span = 0;
    allData.forEach(data =>{
        span += data.nbr;
    })
    spanPlace.innerHTML = span;
}


// ajouter produit quand je click sur button "Add" ou "+"
function addProduct(btn){
    allData.forEach(data =>{
        if(data.nom == nomProduct){
            data.prix += prixPoduct;
            data.nbr++;
            afficherProductShoppingCart(data.nbr, data.prix, data.img, data.nom);
            localStorage.setItem("shoppingProduct", JSON.stringify(allData));
            estTrouve = true;
            console.log(allData)
        }
    })

    if(!estTrouve){
            let obj ={
                img: imageProduct,
                nom: nomProduct,
                prix : prixPoduct ,
                nbr : 1
            }
            allData.push(obj);
            afficherProductShoppingCart(obj.nbr, obj.prix, obj.img, obj.nom);
            localStorage.setItem("shoppingProduct", JSON.stringify(allData));
            console.log(allData)
    }

    CalcNumberProduct();
}


fetch("products.json")
    .then(rep => rep.json())
    .then(data => {

        // apporter tous les donnees qui on a dans fichier json
        allProducts = allProducts.concat(data);
        console.log(allProducts);

        afficherAllProductInHome();

        //afficher les detaills sur le produit
        let imagesDetail = document.querySelectorAll(".cart img");
        imagesDetail.forEach(imgD =>{
            imgD.addEventListener("click", function(){
                let description = "";
                allProducts.forEach(elm =>{
                    if(elm.name == imgD.parentElement.querySelector(".nomProduct h3").innerHTML){
                        description = elm.description;
                    }
                })

                allDetaill.style.display = "flex";
                allDetaill.innerHTML = `<div class="titelDetail">
                                            <h1>PRODUCT DETAIL</h1>
                                        </div>
                                        <div class="bodyDetail">
                                            <div class="img">
                                                <div></div>
                                                <img src=${imgD.src} alt="">
                                            </div>
                                            <div class="detaill">
                                                <h1>${imgD.parentElement.querySelector(".nomProduct h3").innerHTML}</h1>
                                                <h3>${imgD.parentElement.querySelector(".prixProduct h4").innerHTML}</h3>
                                                <div class="Allbtns">
                                                    <button class="btn1">Chek Out</button>
                                                    <button class="btn2">Add To Cart</button>
                                                </div>
                                                <div class="description">
                                                    <p>${description}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="footer">
                                            <h1>Similar product</h1>
                                        </div>`;
            })
        })

        //supprimer le detaille
        logo.addEventListener("click",function(){
            allDetaill.innerHTML = "";
            allDetaill.style.display = "none";
        })

        //ajouter un produit dans la bare de shopping
        let btnAddToCart = document.querySelectorAll(".btnAdd button");
        btnAddToCart.forEach(btn =>{
            btn.addEventListener("click", function(){
                imageProduct = btn.parentElement.parentElement.querySelector("img").src;
                nomProduct = btn.parentElement.parentElement.querySelector(".nomProduct h3").innerHTML;
                prixPoduct = parseInt(btn.parentElement.parentElement.querySelector(".prixProduct h4 span").innerHTML);
                addProduct(btn);
            })
        })

    })