//LLAMAMOS A LOS CONTENEDORES DE LAS TABS Y DE CHECKOUT
const sectionTabs = document.querySelector("#tabs");
const sectionCheckout = document.querySelector("#paypal-button-container");
const checkoutContainer = document.getElementById('checkout-container')
const totalContainer = document.getElementById('total_container')
sectionCheckout.classList.add("hide");
checkoutContainer.classList.add("hide");
totalContainer.classList.add("hide");


const callGeneralProductsApi = () => {
    const url = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?keywords=jewelry&includes=MainImage,Images:3&limit=&category=jewelry&api_key=wsx5gs9dbm720tz6pzr1a3pl`;
    let sectionName = "jewelry";

    fetch(url)
        .then(r => r.json())
        .then(data => {
            const dataInfo = data.results;
            printData(dataInfo, sectionName)
        })
        .catch(e => console.log(e));

}
callGeneralProductsApi();


//FUNCIÓN PARA LLAMAR A LA API EN CADA CLICK EN EL NOMBRE DE LA SECCIÓN
const callApi = e => {
    const sectionClick = event.currentTarget;
    const sectionName = sectionClick.dataset.section;

    const url = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?keywords=${sectionName}&includes=MainImage,Images:3&limit=50&category=jewelry&api_key=wsx5gs9dbm720tz6pzr1a3pl`;


    fetch(url)
        .then(r => r.json())
        .then(data => {
            const dataInfo = data.results;
            printData(dataInfo, sectionName)

        })
        .catch(e => console.log('e'));
}



//FUNCIÓN PARA PINTAR PRODUCTOS EN CADA SECCIÓN
const printData = (data, sectionName) => {

    sectionTabs.classList.remove("hide");


    sectionCheckout.classList.add("hide");
    checkoutContainer.classList.add("hide");
    totalContainer.classList.add("hide");

    const containerSection = document.querySelector(`#${sectionName}`);

    data.forEach(item => {

        let itemProduct = JSON.stringify(item);

        let photo = item.Images;

        //.split(/[,.*-]/g)
        let titleItem = item.title.split(/[()/,.*-]/g);
        let descriptionItem = item.description.split(/[,.*-]/g);

        let template = `
        <div class="card">
          <div class="card-image">
            <img class="activator" height="200px" src=${item.MainImage.url_570xN}>
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${titleItem[0]}<i class="material-icons right">more_vert</i></span>
            <p>Price: ${item.price} USD</p>
            <p>Quedan: ${item.quantity}</p>
            <button data-product-id=${item.listing_id} data-price=${item.price} data-title=${titleItem[0]} data-image=${item.MainImage.url_570xN} onclick="changeButtonMode(this, ${item.listing_id})" class='btn-style'>Add to cart</button>
          </div>
          <div class="card-reveal">
            <span max-height="100px" class="card-title grey-text text-darken-4">${titleItem[0]}<i class="material-icons right">close</i></span>
            <p>${descriptionItem[0]}</p>
            <p>Materials: ${item.materials}</p>
          </div>
        </div>
        `;
        const containerProduct = document.createElement("div");
        containerProduct.classList.add("col");
        containerProduct.classList.add("m6");
        containerProduct.innerHTML = template;
        containerSection.appendChild(containerProduct);

    })
}

let cartProducts = []


function changeButtonMode(button, id) {
    let info = event.target.dataset;
    let data = JSON.parse(JSON.stringify(info))
    //console.log(info);
    //console.log(button);

    if (button.innerHTML === 'Add to cart') {
        button.innerHTML = 'Remove from cart'
        button.classList.add("red")
        addToCart(data)
    } else if (button.innerHTML === 'Remove from cart') {
        button.classList.add("purple3")
        button.innerHTML = 'Add to cart'
        button.classList.remove("red");
         removeFromCart(data);
    }
}

function addToCart(data) {
    //console.log(data);
   cartProducts.push(data);
    increaseCounter();
    console.log(data);
}

function increaseCounter() {
    let containerCounter = document.getElementById("counter-items");
    let elementsInArr = cartProducts.length;
    containerCounter.innerText = elementsInArr;
    // console.log(elementsInArr);
}

function removeFromCart(data) {

  let indexOfItemToDelete = cartProducts.indexOf(data)+1;
  cartProducts.splice(indexOfItemToDelete, 1);
  decreaseCounter()
}

function decreaseCounter() {
    let containerCounter = document.getElementById("counter-items");
    let elementsInArr = cartProducts.length;
    containerCounter.innerText = elementsInArr;
}



(function ($) {
    $(document).ready(function () {
        $(".button-collapse").sideNav();
        $('.carousel.carousel-slider').carousel({ fullWidth: true });
        $('#etsy-search').bind('submit', function () {
            api_key = "your_api_key";
            terms = $('#etsy-terms').val();
            etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" +
                terms + "&limit=12&includes=Images:1&category=jewelry&api_key=wsx5gs9dbm720tz6pzr1a3pl";

            $('#etsy-images').empty();
            $('<p></p>').text('Searching for ' + terms).appendTo('#etsy-images');

            $.ajax({
                url: etsyURL,
                dataType: 'jsonp',
                success: function (data) {
                    if (data.ok) {
                        $('#etsy-images').empty();
                        if (data.count > 0) {
                            $.each(data.results, function (i, item) {

                                $("<img/>").attr("src", item.Images[0].url_75x75).appendTo("#etsy-images").wrap(
                                    "<a href='" + item.url + "'></a>"
                                );
                                if (i % 4 == 3) {
                                    $('<br/>').appendTo('#etsy-images');
                                }
                            });
                        } else {
                            $('<p>No results.</p>').appendTo('#etsy-images');
                        }
                    } else {
                        $('#etsy-images').empty();
                        alert(data.error);
                    }
                }
            });

            return false;
        })
    });

})(jQuery);



//CUANDO DAMOS CLICK EN CHECKOUT OCULTAMOS LAS TABS Y MOSTRAMOS LA VISTA DE CHECKOUT



const payment = () => {
    sectionTabs.classList.add("hide");
    sectionCheckout.classList.remove("hide");
    checkoutContainer.classList.remove("hide");
    totalContainer.classList.remove("hide");
    checkoutView();
}

const checkoutLink = document.querySelector("#checkout-link");
checkoutLink.addEventListener("click", payment);

let sum = 0;

const checkoutView = () => {

    let template = '';
    let templateTotal = '';
    cartProducts.forEach(product => {

        let title = product.title;
        let image = product.image;
        let price = parseInt(product.price);

        template += `<div class="row purple1">

        <div class="col l4 left">
        <div class="cardImage">
        <img src="${image}" class="cardImage">
        </div>
        </div>

        <div class="col l4 center">
        <div class="cardImage">
        <h3 class="purple4-text title ">${title}</h3>
        </div>
        </div>

        <div class="col l4 right">
        <div class="cardImage">
        <h4 class="price">$${price}</h4>
        </div>
        </div>

      </div>`

        sum = sum + price;


    })
    templateTotal += `<div class="row">
    <div class="col l4 right">
    <div class="cardImage">
    <h4 class="price">Total $${sum}</h4>
    </div>
    </div>
    </div>`;
    totalContainer.innerHTML = templateTotal;
    checkoutContainer.innerHTML = template;

    // const containerProductTotal = document.createElement("div");
    // containerProductTotal.classList.add("col");
    // containerProductTotal.classList.add("m4");
    // containerProductTotal.innerHTML = template;
    // containerSection.appendChild(containerProductTotal);

}

    // let precio = 30;

paypal.Button.render({
    env: 'sandbox', // sandbox | production

    // PayPal Client IDs - replace with your own
    // Create a PayPal app: https://developer.paypal.com/developer/applications/create
    client: {
        sandbox: 'AR7YFz66UBmZT2ujQ13MVC2Wcbrbb168hFA855qN5i-DtD9Uqx6Bk980zpYA_9zEfsVrX3GVy-SSYv_E',
        production: 'AZwtebwVV7oNYII1ZGc4tZF74uhotXDvle87uMGMeSvwvVvZ4oJTQ6JtR611__YSOvXFDyUVaa0aT70V'
    },

    // Show the buyer a 'Pay Now' button in the checkout flow
    commit: true,

    // payment() is called when the button is clicked
    payment: function (data, actions) {

        // Make a call to the REST api to create the payment
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: { total: sum,
                        currency: 'USD' }

                    }
                ]
            }
        });
    },

    // onAuthorize() is called when the buyer approves the payment
    onAuthorize: function (data, actions) {

        // Make a call to the REST api to execute the payment
        return actions.payment.execute().then(function () {
            window.alert('Payment Complete!');
        });
    }

}, '#paypal-button-container');
