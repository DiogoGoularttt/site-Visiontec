$(document).ready(function () {
    // Inicialize o carrossel
    $('.js-carrossel').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

fetch(
        "../data/data.json"
    )
    .then((response) => response.json())
    .then((data) => {
        data.forEach((el) => {
            $(".js-carrossel").slick(
                "slickAdd",
                `
          <div class="card">
              <div class="like"></div>
              <img class="product"
                  src="${el.image}" alt="Foto do produtos - ${el.name}" />
              <h4 class="title-product" title="${el.name}">${el.name}</h4>
              <div class="rating">
                  ${handleRating(el.rating)}
              </div>
              <div class="price">
                  <h5>${handlePrice(el.price)}</h5>
                  <h5>${handlePrice(el.price, true)}</h5>
              </div>
              <a class="add-cart-home">Adicionar ao Carrinho</a>
          </div>
        `
            );
        });
    });

function handleRating(rating) {
    let htmlToReturn = "";
    const maximumRatingStars = 5;

    for (let i = 0; i < rating; i++) {
        htmlToReturn = htmlToReturn + "&#9733;";
    }

    for (let j = 0; j < maximumRatingStars - rating; j++) {
        htmlToReturn = htmlToReturn + "&#9734;";
    }

    return htmlToReturn;
}

function handlePrice(price, discount = false) {
    if (discount) {
        price = price * 0.9;
        // price *= 0.9;
    }
    return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}