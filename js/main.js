// Global carousel variables
let currentIndex = 0;
const carouselContainer = document.getElementById("carousel-container");
let slides = [];

// This event listener triggers when the "Get Cocktail" button is clicked.
document.querySelector("button").addEventListener("click", grabCocktail);

// Navigation event listeners:
document.getElementById("next").addEventListener("click", () => {
  if (slides.length > 0) {
    // Move to the next slide and wrap around if at the end
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }
});

document.getElementById("prev").addEventListener("click", () => {
  if (slides.length > 0) {
    // Move to the previous slide; adjust using mod arithmetic
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }
});

// Fetch and build the carousel slides
function grabCocktail() {
  // Get the cocktail term from the input field
  const cocktail = document.querySelector("input").value;
  
  // Clear the carousel container and reset state
  carouselContainer.innerHTML = "";
  slides = [];
  currentIndex = 0;

  // Fetch cocktail data
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
    .then(res => res.json())
    .then(data => {
      if (data.drinks) {
        data.drinks.forEach(drink => {
            // Create a slide for each cocktail
            const slide = document.createElement("div");
            slide.classList.add("slide");

            // Create and append cocktail name
            const title = document.createElement("h2");
            title.textContent = drink.strDrink;
            slide.appendChild(title);

            // Create and append cocktail image
            const img = document.createElement("img");
            img.src = drink.strDrinkThumb;
            slide.appendChild(img);

            // Create and append cocktail instructions
            const instructions = document.createElement("h3");
            instructions.textContent = drink.strInstructions;
            slide.appendChild(instructions);

            // Append the slide to the carousel container and to our slides array
            carouselContainer.appendChild(slide);
            slides.push(slide);
        });

        // Adjust the carousel to show the first slide
        updateCarousel();
      } else {
        // Display a message if no cocktail is found
        carouselContainer.textContent = "No cocktail found.";
      }
    })
    .catch(err => {
      console.error("Error fetching cocktail data:", err);
    });
}

// This function moves the carousel by adjusting the container's transform.
function updateCarousel() {
  // Use the actual width of a slide rather than the container
    const slideWidth = slides.length > 0 ? slides[0].offsetWidth : 0;
    const offset = -currentIndex * slideWidth;
    carouselContainer.style.transform = `translateX(${offset}px)`;
}




