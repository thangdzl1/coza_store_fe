import { getAjax, postAjax, jwtToken, url } from "./api-ajax.js";
import { getColorByProductName, getSizeByProductName, getProductById, addProductToCart, getUserReviewByProductName, getUserCart } from "./api-call.js";

//fetch productId được đính kèm khi chuyển trang
let params = new URLSearchParams(window.location.search);
let productId = params.get('productId');

$(document).ready(function () {

    getProductById(productId).then(productName => {
        getColorByProductName(productName)
        getSizeByProductName(productName)
        getUserReviewByProductName(productName)
    }).catch(err => {
        console.log(err)
    })

    $(document).on("click", ".js-addcart-detail", function () {
        var productName = $('#product-name').html();
        var productPrice = $('#product-price').html();
        var sizeId = $('#size-option option:selected').attr('sizeId');
        var colorId = $('#color-option option:selected').attr('colorId');
        var quantity = $('.num-product').val();

        addProductToCart(productName, quantity, sizeId, colorId)
        getUserCart()
    })

    $(document).on("click", ".js-addreview", function (){
        // e.preventDefault();
        var review = $('#review').val();
        var name = $('#name').val();
        var email = $('#email').val();
        var stars = $('.item-rating.zmdi-star').length;
        console.log('Review: ' + review);
        console.log('Name: ' + name);
        console.log('Email: ' + email);
        console.log('Stars: ' + stars);

        postAjax(url + '/user-review/add', {
            name: name,
            email: email,
            stars: stars,
            review: review,
            productId: productId
        }, jwtToken)
    });

})