import { getAjax, postAjax, jwtToken, url } from "./api-ajax.js";

//get all product from server
export function getAllProduct(page, limit, callback) {
    return new Promise((resolve, reject) => {
        getAjax(
            url + "/product",
            {
                page: page,
                limit: limit
            })
            .done(function (response) {
                let placeholder = document.querySelector("#product-table"); //trỏ đến id của table
                let out = "";
                for (let output of response.data) {
                    // duyệt và tạo ra các button để lọc sản phẩm theo category
                    out += `
                <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${output.category}">

                <div class="block2">
                    <div class="block2-pic hov-img0">
                        <img src="images/product-01.jpg" alt="IMG-PRODUCT">
                        <a href="#"
                            class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" productId = "${output.id}">
                            Quick View
                        </a>
                    </div>
                    <div class="block2-txt flex-w flex-t p-t-14">
                        <div class="block2-txt-child1 flex-col-l ">
                            <a href="product-detail.html?productId=${output.id}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                ${output.name}
                            </a>
                            <span class="stext-105 cl3">
                                $${output.price}
                            </span>
                        </div>
                        <div class="block2-txt-child2 flex-r p-t-3">
                            <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png"
                                    alt="ICON">
                                <img class="icon-heart2 dis-block trans-04 ab-t-l"
                                    src="images/icons/icon-heart-02.png" alt="ICON">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
                `;
                }
                placeholder.innerHTML += out;
                resolve(response.data)
            })
            .fail(function (jqXHR, textStatus) {
                console.log(jqXHR.responseJSON.message)
                reject(jqXHR.responseJSON.message)
            })
    })
}

//get all category from server
export function getAllCategory() {
    getAjax(url + "/category")
        .done(function (response) {

            let placeholder = document.querySelector("#category-filter"); //trỏ đến id của table
            let out = "";
            for (let output of response.data) {
                // duyệt và tạo ra các button để lọc sản phẩm theo category
                out += `
            <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" data-filter=".${output.name}">
            ${output.name}
            </button>
        `;
            }
            //nối chuỗi vào trong thẻ placeholder đã trỏ đến
            placeholder.innerHTML += out;

        })
        .fail(function (jqXHR, textStatus) {
            console.log(jqXHR.responseJSON.message)
        })
}

export function getUserCart() {
    postAjax(url + "/order-detail",
        {
            userId: 29
        },
        jwtToken)
        .done(function (response) {
            let placeholder = document.querySelector(".js-your-cart"); //trỏ đến id của table
            let out = "";
            let totalCartPrice = 0;
            for (let output of response.data) {
                out +=
                    `
                    <li class="header-cart-item flex-w flex-t m-b-12">
                        <div class="header-cart-item-img">
                            <img src="images/item-cart-01.jpg" alt="IMG">
                        </div>
                        <div class="header-cart-item-txt p-t-8">
                            <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                                ${output.productName}
                            </a>
                            <span class="header-cart-item-info">
                            ${output.quantity} x $${output.price}
                            </span>
                        </div>
                    </li>
                `
                totalCartPrice += output.price * output.quantity
            }
            placeholder.innerHTML += out;
            $("#cart-total").text("Total: $ " + totalCartPrice)
        }).fail(function (jqXHR, textStatus) {
            console.log("Failed to get cart!", "error");
        })
}

export function getColorByProductName(name) {
    getAjax(url + "/size", { name: name }, jwtToken)
        .done(function (response) {
            let placeholder = document.querySelector("#size-option"); //trỏ đến id của table
            let out = "<option>Choose an option</option>";
            for (let output of response.data) {
                // duyệt và tạo ra các button để lọc sản phẩm theo category
                out += `
                    <option sizeId = "${output.id}" >${output.name}</option>
                `;
            }
            //nối chuỗi vào trong thẻ placeholder đã trỏ đến
            placeholder.innerHTML = out;

        })
        .fail(function (jqXHR, textStatus) {
            console.log(jqXHR.responseJSON.message)
        })
}

export function getSizeByProductName(name) {
    getAjax(url + "/color", { name }, jwtToken)
        .done(function (response) {

            let placeholder = document.querySelector("#color-option"); //trỏ đến id của table
            let out = "<option>Choose an option</option>";
            for (let output of response.data) {
                // duyệt và tạo ra các button để lọc sản phẩm theo category
                out += `
                <option colorId = "${output.id}" >${output.name}</option>
            `;
            }
            //nối chuỗi vào trong thẻ placeholder đã trỏ đến
            placeholder.innerHTML = out;
        })
        .fail(function (jqXHR, textStatus) {
            console.log(jqXHR.responseJSON.message)
        })
}

export function addProductToCart(productName, quantity, sizeId, colorId) {
    postAjax(url + "/order-detail/add",
        {
            sizeId: sizeId,
            colorId: colorId,
            quantity: quantity,
            productId: productName
        }, jwtToken).done(function (response) {
            //Alert that product is added to cart
            swal(productName, "is added to cart !", "success");
        }).fail(function (jqXHR, textStatus) {
            swal(productName, jqXHR.responseJSON.message, "error");
        })
}
export function getProductById(id) {
    return new Promise((resolve, reject) => {
        getAjax(
            url + "/product/" + id, "",
            jwtToken)
            .done(function (response) {
                let productEntity = response.data
                console.log(productEntity)

                $(".product-name").each(function () {
                    $(this).html(productEntity.name);
                });
                $(".product-description").each(function () {
                    $(this).html('<p class="stext-102 cl3 p-t-23 product-description" >' + productEntity.description + "</p>");
                });

                $("#product-price").html(productEntity.price)
                $("#product-category").html(productEntity.category + '<i class="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>')
                $("#product-image").attr("src", productEntity.image)

                resolve(productEntity.name)
            })
            .fail(function (jqXHR, textStatus) {
                console.log(jqXHR.responseJSON.message)
                reject(jqXHR.responseJSON.message)
            })
    })

}
export function getUserReviewByProductName(name) {
    return new Promise((resolve, reject) => {
        getAjax(url + "/user-review", { name: name }, jwtToken)
            .done(function (response) {
                console.log(response.data)
                let placeholder = document.querySelector(".js-user-review");
                let out = "";
                for (let output of response.data) {
                    let starsHTML = generateStarRating(output.rating);
                    out = `
                <div class="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
					<img src="images/avatar-01.jpg" alt="AVATAR">
				</div>
				<div class="size-207 m-b-18">
					<div class="flex-w flex-sb-m p-b-17">
						<span class="mtext-107 cl2 p-r-20">
							${output.name}
						</span>
						<span class="fs-18 cl11">
                            ${starsHTML}
						</span>
						</div>
						<p class="stext-102 cl6">
							${output.review}
						</p>
				</div>
                `
                placeholder.innerHTML += out;
                }
                
            }).fail(function (jqXHR, textStatus) {
                console.log(jqXHR.responseJSON.message)
                reject(jqXHR.responseJSON.message)
            })
    })
}
export function getProductByCategory(){
    
}
//function for generating star rating
function generateStarRating(rating) {
    let fullStars = Math.floor(rating);
    let halfStar = rating % 1 !== 0 ? 1 : 0;
    let emptyStars = 5 - fullStars - halfStar;

    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="zmdi zmdi-star"></i> ';
    }

    for (let i = 0; i < halfStar; i++) {
        starsHTML += '<i class="zmdi zmdi-star-half"></i> ';
    }

    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="zmdi zmdi-star-outline"></i> ';
    }

    return starsHTML;
}
