import { getAjax, postAjax, jwtToken, url } from "./api-ajax.js";
import {
    getAllCategory, getAllProduct, getColorByProductName
    , getSizeByProductName, getUserCart, addProductToCart
} from "./api-call.js";

let listProduct = []
let page = 0
const limit = 20

function updateLoadMoreButton(limit, listProductLength) {
    //check if there is no more product then remove button
    if (listProductLength < limit) {
        console.log("No more product");
        let placeholder = document.querySelector(".js-load-more").closest("div"); // Get the closest div of the .js-load-more button
        let out = `
            <span class="flex-c-m stext-101 cl5 size-103 bg2 bor1 p-lr-15 trans-04 faded js-load-more">
                Load More
            </span>
        `;
        placeholder.innerHTML = out;
    }
}


$(document).ready(function () {

    getAllCategory()
    getUserCart()
    getAllProduct(page, limit)
        .then(products => {
            listProduct = products
            updateLoadMoreButton(limit, listProduct.length)
            console.log(listProduct)
        })
        .catch(err => {
            console.log(err)
        })


    //load more product js
    $(document).on('click', '.js-load-more', function (e) {
        // Ngăn action mặc định của thẻ
        e.preventDefault()
        ++page
        getAllProduct(page, limit)
        updateLoadMoreButton(limit)
    })

    //quick view product js
    $(document).on("click", ".js-show-modal1", function () {
        //lấy productId từ button
        let id = $(this).attr("productId")

        //tìm product theo id
        let product = listProduct.find(product => product.id == id)

        //gán product vào modal
        $("#product-name").text(product.name)
        $("#product-price").text("$" + product.price)
        $("#product-description").text(product.description)
        $("#product-image").attr("src", "images/product-01.jpg")

        //fetch và gán size vào modal
        getColorByProductName(product.name)

        //fetch và gán color vào modal
        getSizeByProductName(product.name)

    })

    //add to cart js
    $(document).on('click', '.js-addcart-detail', function () {
        var productName = $('#product-name').html();
        var productPrice = $('#product-price').html();
        var sizeId = $('#size-option option:selected').attr('sizeId');
        var colorId = $('#color-option option:selected').attr('colorId');
        var quantity = $('.num-product').val();

        console.log("Product Name: " + productName);
        console.log("Product Price: " + productPrice);
        console.log("Product Size: " + sizeId);
        console.log("Product Color: " + colorId);
        console.log("Product quantity: " + quantity);

        addProductToCart(productName, quantity, sizeId, colorId)
    })

})