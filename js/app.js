// Initialize Firebase
var config = {
    apiKey: "AIzaSyB_O-N-451D3HGA4ZMpDyPBMub6THA0ork",
    authDomain: "lovecommerce-ddada.firebaseapp.com",
    databaseURL: "https://lovecommerce-ddada.firebaseio.com",
    projectId: "lovecommerce-ddada",
    storageBucket: "lovecommerce-ddada.appspot.com",
    messagingSenderId: "639464110271"
  };
  firebase.initializeApp(config);
  
  
  const callGeneralProductsApi = () => {
    const url = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?keywords=jewelry&includes=MainImage,Images:3&limit=50&category=jewelry&api_key=wsx5gs9dbm720tz6pzr1a3pl`;
    let sectionName = "jewelry";
  
    fetch( url )
        .then( r => r.json() )
        .then( data => { const dataInfo = data.results;
            printData(dataInfo, sectionName) })
        .catch( e => console.log( e ) );
  
  }
  callGeneralProductsApi();
  
  //FUNCIÓN PARA LLAMAR A LA API EN CADA CLICK EN EL NOMBRE DE LA SECCIÓN
  const callApi = e => {
    const sectionClick = event.currentTarget;
    const sectionName = sectionClick.dataset.section;
  
    const url = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?keywords=${sectionName}&includes=MainImage,Images:3&limit=50&category=jewelry&api_key=wsx5gs9dbm720tz6pzr1a3pl`;
  
  
    fetch( url )
        .then( r => r.json() )
        .then( data => { const dataInfo = data.results;
            printData(dataInfo, sectionName) })
        .catch( e => console.log( 'Something went wrong' ) );
  }
  
  
  //FUNCIÓN PARA PINTAR PRODUCTOS EN CADA SECCIÓN
  const printData = (data, sectionName) => {
  
      const containerSection = document.querySelector(`#${sectionName}`);
  
      data.forEach(item => {
        let photo = item.Images;
  
          let titleItem = item.title.split(".");
          let template =`
          <img class="responsive-img" src=${item.MainImage.url_570xN}>
          <h5>${titleItem[0]}</h5>
          <p>Price: ${item.price}${item.currency_code}</p>
          <p>Quedan: ${item.quantity}</p>
          <button data-product-id=${item.listing_id} onclick="changeButtonMode(this,${item.listing_id})" class='btn btn-primary'>Agregar a carrito</button>
          `;
  
          const containerProduct = document.createElement("div");
          containerProduct.classList.add("col");
          containerProduct.classList.add("m4");
          containerProduct.innerHTML = template;
          containerSection.appendChild(containerProduct);
  
      })
  }

  function changeButtonMode(button, id) {
    if (button.innerHTML === 'Agregar a carrito'){
      button.innerHTML = 'Quitar del carrito'
      button.classList.add("red")
      addToCart(button, id)
    }else{
      button.innerHTML = 'Agregar a carrito'
      button.classList.remove("red");
    //   removeFromCart(button);
   }
}
  
//   const addToCart = (button, id) => {

//     let cartStorage = localStorage.getItem("cart");
//     let cartIds;
//       if (cartStorage === null) {
//         cartIds = [];
//       } else {
//         cartIds = JSON.parse(cartStorage);
//       }
//     cartIds.push(id);
//     localStorage.setItem("cart", JSON.stringify(cartIds));
//     changeButtonMode(button)
//     // increaseCounter()
//   }


//   function increaseCounter() {

//     let containerCounter = document.getElementById("counter-items");
//     let stringIds = localStorage.getItem("cart")
//     let strIdToArr = (JSON.parse(stringIds)).length;
//     console.log(strIdToArr);
//     containerCounter.innerText = strIdToArr;

//   }


//   const removeFromCart = id => {
//     let cartInfo = JSON.parse(localStorage.getItem("cart"));
//     let indexOfItemToDelete = cartInfo.indexOf(id);
//     cartInfo.splice(indexOfItemToDelete, 1);
//     localStorage.setItem("cart", JSON.stringify(cartInfo));
//     decreaseCounter()
//   }


//   function decreaseCounter() {

//     let containerCounter = document.getElementById("counter-items");
//     let stringIds = localStorage.getItem("cart")
//     let strIdToArr = (JSON.parse(stringIds)).length;
//     console.log(strIdToArr);
//     containerCounter.innerText = strIdToArr;

//   }

  

  
  
  (function($){
  
      $(document).ready(function(){
          $('#etsy-search').bind('submit', function() {
              api_key = "your_api_key";
              terms = $('#etsy-terms').val();
              etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords="+
                  terms+"&limit=12&includes=Images:1&category=jewelry&api_key=wsx5gs9dbm720tz6pzr1a3pl";
  
              $('#etsy-images').empty();
              $('<p></p>').text('Searching for '+terms).appendTo('#etsy-images');
  
              $.ajax({
                  url: etsyURL,
                  dataType: 'jsonp',
                  success: function(data) {
                      if (data.ok) {
                          $('#etsy-images').empty();
                          if (data.count > 0) {
                              $.each(data.results, function(i,item) {
                                  $("<img/>").attr("src", item.Images[0].url_75x75).appendTo("#etsy-images").wrap(
                                      "<a href='" + item.url + "'></a>"
                                  );
                                  if (i%4 == 3) {
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
  /*
  const printData = (data, sectionName) => {
      const containerSection = document.querySelector(`#${sectionName}`);
      data.forEach(item => {
        let photo = item.Images;
        console.log(photo);
          let descriptionItem = item.description.split(".");
          let template =`
          <h5>${item.title}</h5>
          <p>${descriptionItem[0]}</p>
          <img src=${item.MainImage.url_570xN}>
          <p>Materials: ${item.materials}</p>
          <p>Price: ${item.price}${item.currency_code}</p>
          <p>Quedan: ${item.quantity}</p>
          `;
          const containerProduct = document.createElement("div");
          containerProduct.classList.add("col");
          containerProduct.classList.add("m3");
          containerProduct.innerHTML = template;
          containerSection.appendChild(containerProduct)
          photo.forEach(photoGallery => {
          let templateGallery =`
            <img class="responsive-img" src=${photoGallery.url_170x135}>
            `;
          containerProduct.insertAdjacentHTML('afterend', templateGallery);
          })
      })
  }
  */

