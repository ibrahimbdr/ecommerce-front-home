const products_arr = [
  {
    product_name: "Ctrap face sphere watch",
    product_price: "$55.00",
    product_image: "./images/watches-11.webp",
    product_image_2: "./images/watches-22.webp",
    added_to_cart: false,
  },
  {
    product_name: "Eart metallic watch",
    product_price: "$179.00",
    product_image: "./images/watches-5.webp",
    product_image_2: "./images/watches-6.jpg",
    added_to_cart: false,
  },
  {
    product_name: "Jasic rubber watch",
    product_price: "$333.00",
    product_image: "./images/watches-3.webp",
    product_image_2: "./images/watches-4.webp",
    added_to_cart: false,
  },
  {
    product_name: "Bold metallic watch",
    product_price: "$10.00",
    product_image: "./images/watches-2.webp",
    product_image_2: "./images/watches-1.jpg",
    added_to_cart: false,
  },
  {
    product_name: "Lasic rubber watch",
    product_price: "$389.00",
    product_image: "./images/watches-7.webp",
    product_image_2: "./images/watches-8.jpg",
    added_to_cart: false,
  },
  {
    product_name: "Nimited edition watches",
    product_price: "$439.00",
    product_image: "./images/watches-13.webp",
    product_image_2: "./images/watches-14.webp",
    added_to_cart: false,
  },
];

console.log(localStorage.getItem("products_arr"));

// save the products in the local storage

if (localStorage.getItem("products_arr") === null) {
  localStorage.setItem("products_arr", JSON.stringify(products_arr));
}

let products_arr_storage = JSON.parse(localStorage.getItem("products_arr"));

const productDiv = document.getElementById("product_items_div");

// images lazyloading

document.addEventListener("DOMContentLoaded", function () {
  const lazyloadImages = document.querySelectorAll("img");
  let lazyloadThrottleTimeout;

  function lazyload() {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    lazyloadThrottleTimeout = setTimeout(function () {
      const scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function (img) {
        if (img.offsetTop < window.innerHeight + scrollTop) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
        }
      });
      if (lazyloadImages.length == 0) {
        document.removeEventListener("scroll", lazyload);
        window.removeEventListener("resize", lazyload);
        window.removeEventListener("orientationChange", lazyload);
      }
    }, 20);
  }

  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});

// back to top button effect
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const intersecting = entry.isIntersecting;
      if (intersecting)
        document.querySelector(".back_to_top").style.display = "none";
      else document.querySelector(".back_to_top").style.display = "flex";
    });
  },
  { threshold: 1 }
);

observer.observe(document.querySelector(".header"));

// drawer controller

function openDrawer() {
  document.querySelector(".menu_drawer").style.display = "block";
}

function closeDrawer() {
  document.querySelector(".menu_drawer").style.display = "none";
}

// functions for products actions
function addToCartFunc(index) {
  products_arr_storage[index].added_to_cart = true;
  localStorage.setItem("products_arr", JSON.stringify(products_arr_storage));
  console.log(`${products_arr_storage[index].product_name} added to cart`);
  document.getElementById(`add_to_cart_btn_${index}`).style.display = "none";
  document.getElementById(`remove_from_cart_btn_${index}`).style.display =
    "block";
  document.getElementById("cart_products_numbers").innerHTML =
    Number(document.getElementById("cart_products_numbers").innerHTML) + 1;
}

function RemoveFromCartFunc(index) {
  products_arr_storage[index].added_to_cart = false;
  localStorage.setItem("products_arr", JSON.stringify(products_arr_storage));
  console.log(`${products_arr_storage[index].product_name} removed from cart`);
  document.getElementById(`add_to_cart_btn_${index}`).style.display = "block";
  document.getElementById(`remove_from_cart_btn_${index}`).style.display =
    "none";
  document.getElementById("cart_products_numbers").innerHTML =
    Number(document.getElementById("cart_products_numbers").innerHTML) - 1;
}

function veiwProduct(index) {
  console.log(document.getElementById(`layer_${index}`));
  console.log(
    document.getElementById(products_arr_storage[index].product_name)
  );
  const mediumScreen = window.matchMedia("(max-width: 768px)");

  document.getElementById(`layer_${index}`).style.display = "block";
  document.getElementById(
    products_arr_storage[index].product_name
  ).style.display = "flex";

  if (mediumScreen.matches) {
    document.getElementById(
      products_arr_storage[index].product_name
    ).style.display = "block";

    document.getElementById(
      products_arr_storage[index].product_name
    ).style.top = "18%";
  }
}

function hideProduct(index) {
  console.log(document.getElementById(`layer_${index}`));
  console.log(
    document.getElementById(products_arr_storage[index].product_name)
  );
  document.getElementById(`layer_${index}`).style.display = "none";
  document.getElementById(
    products_arr_storage[index].product_name
  ).style.display = "none";
}

function viewCart() {
  document.getElementById("cart_div").innerHTML = "";

  products_arr_storage.forEach((product) => {
    if (product.added_to_cart === true) {
      const cart_product = document.createElement("div");
      cart_product.innerHTML = `
                  <img src=${product.product_image} width='150px'/>
                  <div class="cart_details">
                      <h5>${product.product_name}</h5>
                      <h6>${product.product_price}</h6>
                  </div>
                  `;
      cart_product.classList.add("cart_product");
      document.getElementById("cart_div").appendChild(cart_product);
    }
  });

  if (document.getElementById("cart_div").innerHTML === "") {
    document.getElementById("cart_div").innerHTML = `
   <div class='cart_product'>
    <div class='cart_empty'>
        <div class="cart_empty_img">
            <svg class="svg-icon-4" viewBox="0 0 20 20">
                <path
                fill="none"
                d="M17.671,13.945l0.003,0.002l1.708-7.687l-0.008-0.002c0.008-0.033,0.021-0.065,0.021-0.102c0-0.236-0.191-0.428-0.427-0.428H5.276L4.67,3.472L4.665,3.473c-0.053-0.175-0.21-0.306-0.403-0.306H1.032c-0.236,0-0.427,0.191-0.427,0.427c0,0.236,0.191,0.428,0.427,0.428h2.902l2.667,9.945l0,0c0.037,0.119,0.125,0.217,0.239,0.268c-0.16,0.26-0.257,0.562-0.257,0.891c0,0.943,0.765,1.707,1.708,1.707S10,16.068,10,15.125c0-0.312-0.09-0.602-0.237-0.855h4.744c-0.146,0.254-0.237,0.543-0.237,0.855c0,0.943,0.766,1.707,1.708,1.707c0.944,0,1.709-0.764,1.709-1.707c0-0.328-0.097-0.631-0.257-0.891C17.55,14.182,17.639,14.074,17.671,13.945 M15.934,6.583h2.502l-0.38,1.709h-2.312L15.934,6.583zM5.505,6.583h2.832l0.189,1.709H5.963L5.505,6.583z M6.65,10.854L6.192,9.146h2.429l0.19,1.708H6.65z M6.879,11.707h2.027l0.189,1.709H7.338L6.879,11.707z M8.292,15.979c-0.472,0-0.854-0.383-0.854-0.854c0-0.473,0.382-0.855,0.854-0.855s0.854,0.383,0.854,0.855C9.146,15.596,8.763,15.979,8.292,15.979 M11.708,13.416H9.955l-0.189-1.709h1.943V13.416z M11.708,10.854H9.67L9.48,9.146h2.228V10.854z M11.708,8.292H9.386l-0.19-1.709h2.512V8.292z M14.315,13.416h-1.753v-1.709h1.942L14.315,13.416zM14.6,10.854h-2.037V9.146h2.227L14.6,10.854z M14.884,8.292h-2.321V6.583h2.512L14.884,8.292z M15.978,15.979c-0.471,0-0.854-0.383-0.854-0.854c0-0.473,0.383-0.855,0.854-0.855c0.473,0,0.854,0.383,0.854,0.855C16.832,15.596,16.45,15.979,15.978,15.979 M16.917,13.416h-1.743l0.189-1.709h1.934L16.917,13.416z M15.458,10.854l0.19-1.708h2.218l-0.38,1.708H15.458z"
                ></path>
            </svg>
        </div>
        <h4 class="cart_empty_text">Cart is empty</h4>
    </div>
   </div>
  `;
  }
  document.getElementById("cart_div").style.display === "block"
    ? (document.getElementById("cart_div").style.display = "none")
    : (document.getElementById("cart_div").style.display = "block");

  console.log(document.getElementById("cart_div"));
}

function changeImg(e, index) {
  e.target.src = products_arr_storage[index].product_image_2;
  e.target.style.animation = "fadeIn 1s";
}

function resetImg(e, index) {
  e.target.src = products_arr_storage[index].product_image;
  e.target.style.animation = "none";
}

function selectImg1(index) {
  document.getElementById(`model_viewed_img_${index}`).src =
    products_arr_storage[index].product_image;
  console.log(document.getElementById("model_viewed_img"));
  document.getElementById("model_img_1").style.border = "2px solid gold";
  document.getElementById("model_img_2").style.border = "none";
}
function selectImg2(index) {
  document.getElementById(`model_viewed_img_${index}`).src =
    products_arr_storage[index].product_image_2;
  console.log(document.getElementById("model_viewed_img"));
  document.getElementById("model_img_1").style.border = "none";
  document.getElementById("model_img_2").style.border = "2px solid gold";
}

// load the products cards

products_arr_storage.forEach((product, index) => {
  const product_card = document.createElement("div");

  product_card.addEventListener("mouseover", () => {
    document.getElementById(`product_price_${index}`).style.animation =
      "1s anim-lineUp ease-out";
    document.getElementById(`product_price_${index}`).style.display = "none";
    document.getElementById(`product_btns_${index}`).style.display = "block";
    document.getElementById(`product_btns_${index}`).style.animation =
      "1s anim-lineUp ease-out";
  });
  product_card.addEventListener("mouseout", () => {
    document.getElementById(`product_price_${index}`).style.display = "block";
    document.getElementById(`product_price_${index}`).style.animation =
      "0.5s anim-lineDown ease-out";
    document.getElementById(`product_btns_${index}`).style.animation =
      "0.5s anim-lineDown ease-out";
    document.getElementById(`product_btns_${index}`).style.display = "none";
  });

  if (product.added_to_cart)
    document.getElementById("cart_products_numbers").innerHTML =
      Number(document.getElementById("cart_products_numbers").innerHTML) + 1;

  product_card.classList.add("card");
  product_card.innerHTML = `
            <div class="card_img">
              <img src="${
                product.product_image
              }" class="product_img" alt="" onmouseover="changeImg(event,${index})" onmouseout="resetImg(event,${index})" />
            </div>
            <div class="card_body">
              <h4 class="product_title">${product.product_name}</h4>
              
            <div class="card_body_sub">
            
            <h4 class="product_price" id="product_price_${index}">${
    product.product_price
  }</h4>
            <div class="product_btns"  id="product_btns_${index}">
              <button class="add_to_cart_btn" id="add_to_cart_btn_${index}" style="${
    product.added_to_cart ? "display: none" : "display: flex"
  }" onclick="addToCartFunc(${index})">
    <svg class="svg-icon-2" viewBox="0 0 20 20">
        <path fill="none" d="M7.93,4.509H9.62v1.689c0,0.233,0.189,0.422,0.422,0.422s0.422-0.189,0.422-0.422V4.509h1.689c0.233,0,0.423-0.189,0.423-0.422s-0.189-0.422-0.423-0.422h-1.689V1.975c0-0.233-0.189-0.422-0.422-0.422S9.62,1.742,9.62,1.975v1.689H7.93c-0.233,0-0.422,0.189-0.422,0.422S7.697,4.509,7.93,4.509 M18.489,8.311H1.595c-0.466,0-0.845,0.378-0.845,0.845V10c0,0.466,0.378,0.845,0.845,0.845h0.169l1.533,7.282l0.007-0.001c0.046,0.183,0.205,0.321,0.402,0.321h12.67c0.198,0,0.356-0.139,0.403-0.321l0.007,0.001l1.533-7.282h0.169c0.466,0,0.845-0.379,0.845-0.845V9.155C19.334,8.689,18.955,8.311,18.489,8.311 M2.626,10.845H5.53l0.266,1.689H2.982L2.626,10.845z M3.16,13.379h2.769l0.267,1.689H3.515L3.16,13.379z M4.049,17.603l-0.355-1.689h2.636l0.267,1.689H4.049z M9.62,17.603H7.441l-0.267-1.689H9.62V17.603z M9.62,15.068H7.041l-0.267-1.689H9.62V15.068z M9.62,12.534H6.641l-0.266-1.689H9.62V12.534z M12.644,17.603h-2.179v-1.689h2.446L12.644,17.603zM13.043,15.068h-2.579v-1.689h2.845L13.043,15.068z M10.464,12.534v-1.689h3.245l-0.266,1.689H10.464z M16.035,17.603h-2.548l0.268-1.689h2.636L16.035,17.603z M16.569,15.068h-2.682l0.267-1.689h2.77L16.569,15.068z M17.103,12.534h-2.814l0.267-1.689h2.903L17.103,12.534z M18.489,10H1.595V9.155h16.895V10z"></path>
    </svg>
  ADD TO CART</button>
              <button class="remove_from_cart_btn" id="remove_from_cart_btn_${index}" style="${
    product.added_to_cart ? "display: flex" : "display: none"
  }" onclick="RemoveFromCartFunc(${index})">
    <svg class="svg-icon-3" viewBox="0 0 20 20">
        <path fill="none" d="M7.836,2.722h4.389c0.242,0,0.439-0.196,0.439-0.439s-0.197-0.439-0.439-0.439H7.836c-0.242,0-0.438,0.196-0.438,0.439S7.595,2.722,7.836,2.722 M18.81,6.672H1.253c-0.484,0-0.878,0.394-0.878,0.878v0.878c0,0.485,0.394,0.877,0.878,0.877h0.176l1.593,7.569l0.008-0.003c0.048,0.191,0.213,0.335,0.418,0.335h13.168c0.205,0,0.369-0.144,0.418-0.335l0.008,0.003l1.593-7.569h0.176c0.484,0,0.878-0.393,0.878-0.877V7.55C19.688,7.065,19.294,6.672,18.81,6.672 M2.325,9.305h3.017l0.277,1.756H2.694L2.325,9.305z M2.879,11.939h2.878l0.277,1.755H3.249L2.879,11.939z M3.803,16.328l-0.369-1.756h2.739l0.277,1.756H3.803z M9.592,16.328H7.328l-0.277-1.756h2.542V16.328z M9.592,13.694h-2.68l-0.277-1.755h2.957V13.694z M9.592,11.062H6.497L6.22,9.305h3.373V11.062z M12.734,16.328H10.47v-1.756h2.542L12.734,16.328zM13.15,13.694h-2.68v-1.755h2.957L13.15,13.694z M10.47,11.062V9.305h3.373l-0.277,1.756H10.47z M16.259,16.328h-2.646l0.277-1.756h2.739L16.259,16.328z M16.813,13.694h-2.785l0.276-1.755h2.878L16.813,13.694z M17.368,11.062h-2.925l0.277-1.756h3.018L17.368,11.062z M18.81,8.428H1.253V7.55H18.81V8.428z"></path>
    </svg>
  REMOVE FROM CART</button>
              <button class="quick_view_btn" onclick="veiwProduct(${index})">QUICK VIEW</button>
            </div>
            </div>  
            
            </div>
            <div class="dim_layer" id="layer_${index}" onclick="hideProduct(${index})"></div>
            <div class="quick_view_modal" id="${product.product_name}">
              <div class="card_img">
              <div class="card_img_gallery">
                <img
                  src=${product.product_image}
                  width="75px"
                  alt=""
                  id="model_img_1"
                  style="cursor: pointer; border: 2px solid gold"
                  onclick="selectImg1(${index})"
                />
                <img
                  src=${product.product_image_2}
                  width="75px"
                  alt=""
                  id="model_img_2"
                  style="cursor: pointer"
                  onclick="selectImg2(${index})"
                />
              </div>
                <img
                  src=${product.product_image}
                  class="product_img"
                  id="model_viewed_img_${index}"
                  alt=""
                />
              </div>
              <div class="product_model_details">
              <h2 class="product_model_title">${product.product_name}</h2>
              <p class="product_model_rate">
              <span>
                <svg class="svg-icon-star-1" viewBox="0 0 20 20">
                    <path d="M 17.684 7.925 l -5.131 -0.67 L 10.329 2.57 c -0.131 -0.275 -0.527 -0.275 -0.658 0 L 7.447 7.255 l -5.131 0.67 C 2.014 7.964 1.892 8.333 2.113 8.54 l 3.76 3.568 L 4.924 17.21 c -0.056 0.297 0.261 0.525 0.533 0.379 L 10 15.109 l 4.543 2.479 c 0.273 0.153 0.587 -0.089 0.533 -0.379 l -0.949 -5.103 l 3.76 -3.568 C 18.108 8.333 17.986 7.964 17.684 7.925 z"></path>
                </svg>
                <svg class="svg-icon-star-2" viewBox="0 0 20 20">
                    <path d="M 17.684 7.925 l -5.131 -0.67 L 10.329 2.57 c -0.131 -0.275 -0.527 -0.275 -0.658 0 L 7.447 7.255 l -5.131 0.67 C 2.014 7.964 1.892 8.333 2.113 8.54 l 3.76 3.568 L 4.924 17.21 c -0.056 0.297 0.261 0.525 0.533 0.379 L 10 15.109 l 4.543 2.479 c 0.273 0.153 0.587 -0.089 0.533 -0.379 l -0.949 -5.103 l 3.76 -3.568 C 18.108 8.333 17.986 7.964 17.684 7.925 z"></path>
                </svg>
                <svg class="svg-icon-star-3" viewBox="0 0 20 20">
                    <path d="M 17.684 7.925 l -5.131 -0.67 L 10.329 2.57 c -0.131 -0.275 -0.527 -0.275 -0.658 0 L 7.447 7.255 l -5.131 0.67 C 2.014 7.964 1.892 8.333 2.113 8.54 l 3.76 3.568 L 4.924 17.21 c -0.056 0.297 0.261 0.525 0.533 0.379 L 10 15.109 l 4.543 2.479 c 0.273 0.153 0.587 -0.089 0.533 -0.379 l -0.949 -5.103 l 3.76 -3.568 C 18.108 8.333 17.986 7.964 17.684 7.925 z"></path>
                </svg>
                <svg class="svg-icon-star-4" viewBox="0 0 20 20">
                    <path d="M 17.684 7.925 l -5.131 -0.67 L 10.329 2.57 c -0.131 -0.275 -0.527 -0.275 -0.658 0 L 7.447 7.255 l -5.131 0.67 C 2.014 7.964 1.892 8.333 2.113 8.54 l 3.76 3.568 L 4.924 17.21 c -0.056 0.297 0.261 0.525 0.533 0.379 L 10 15.109 l 4.543 2.479 c 0.273 0.153 0.587 -0.089 0.533 -0.379 l -0.949 -5.103 l 3.76 -3.568 C 18.108 8.333 17.986 7.964 17.684 7.925 z"></path>
                </svg>
                <svg class="svg-icon-star-5" viewBox="0 0 20 20">
                    <path d="M 17.684 7.925 l -5.131 -0.67 L 10.329 2.57 c -0.131 -0.275 -0.527 -0.275 -0.658 0 L 7.447 7.255 l -5.131 0.67 C 2.014 7.964 1.892 8.333 2.113 8.54 l 3.76 3.568 L 4.924 17.21 c -0.056 0.297 0.261 0.525 0.533 0.379 L 10 15.109 l 4.543 2.479 c 0.273 0.153 0.587 -0.089 0.533 -0.379 l -0.949 -5.103 l 3.76 -3.568 C 18.108 8.333 17.986 7.964 17.684 7.925 z"></path>
                </svg>
              </span>
              (20) Reviews
              </p>
              <h4 class="product_model_price" style="text-align: start">${
                product.product_price
              }</h4>
              <p class="product_model_descr">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Est itaque unde ratione repudiandae,
              </p>
              <div class="product_model_list">
                <ul>
                    <li><span class="product_model_list_title">Vendor:</span> Clockwise</li>
                    <li><span class="product_model_list_title">Tags:</span> Luxries, $10.00+</li>
                    <li><span class="product_model_list_title">Share:</span> <svg class="svg-icon-links" viewBox="0 0 20 20">
                                    <path fill="none" d="M11.344,5.71c0-0.73,0.074-1.122,1.199-1.122h1.502V1.871h-2.404c-2.886,0-3.903,1.36-3.903,3.646v1.765h-1.8V10h1.8v8.128h3.601V10h2.403l0.32-2.718h-2.724L11.344,5.71z"></path>
                                </svg>
                                <svg class="svg-icon-links" viewBox="0 0 20 20">
                                    <path fill="none" d="M18.258,3.266c-0.693,0.405-1.46,0.698-2.277,0.857c-0.653-0.686-1.586-1.115-2.618-1.115c-1.98,0-3.586,1.581-3.586,3.53c0,0.276,0.031,0.545,0.092,0.805C6.888,7.195,4.245,5.79,2.476,3.654C2.167,4.176,1.99,4.781,1.99,5.429c0,1.224,0.633,2.305,1.596,2.938C2.999,8.349,2.445,8.19,1.961,7.925C1.96,7.94,1.96,7.954,1.96,7.97c0,1.71,1.237,3.138,2.877,3.462c-0.301,0.08-0.617,0.123-0.945,0.123c-0.23,0-0.456-0.021-0.674-0.062c0.456,1.402,1.781,2.422,3.35,2.451c-1.228,0.947-2.773,1.512-4.454,1.512c-0.291,0-0.575-0.016-0.855-0.049c1.588,1,3.473,1.586,5.498,1.586c6.598,0,10.205-5.379,10.205-10.045c0-0.153-0.003-0.305-0.01-0.456c0.7-0.499,1.308-1.12,1.789-1.827c-0.644,0.28-1.334,0.469-2.06,0.555C17.422,4.782,17.99,4.091,18.258,3.266"></path>
                                </svg>
                                <svg class="svg-icon-links" viewBox="0 0 20 20">
                                    <path fill="none" d="M14.52,2.469H5.482c-1.664,0-3.013,1.349-3.013,3.013v9.038c0,1.662,1.349,3.012,3.013,3.012h9.038c1.662,0,3.012-1.35,3.012-3.012V5.482C17.531,3.818,16.182,2.469,14.52,2.469 M13.012,4.729h2.26v2.259h-2.26V4.729z M10,6.988c1.664,0,3.012,1.349,3.012,3.012c0,1.664-1.348,3.013-3.012,3.013c-1.664,0-3.012-1.349-3.012-3.013C6.988,8.336,8.336,6.988,10,6.988 M16.025,14.52c0,0.831-0.676,1.506-1.506,1.506H5.482c-0.831,0-1.507-0.675-1.507-1.506V9.247h1.583C5.516,9.494,5.482,9.743,5.482,10c0,2.497,2.023,4.52,4.518,4.52c2.494,0,4.52-2.022,4.52-4.52c0-0.257-0.035-0.506-0.076-0.753h1.582V14.52z"></path>
                                </svg>
                </ul>
              </div>
              </div>
          </div>
  `;

  productDiv.appendChild(product_card);
});
