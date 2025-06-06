function getCocktail(){
    const cocktail = document.querySelector("input").value;
    const apiURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;
      
      // Fetch data from TheCocktailDB API
      fetch(apiURL)
        .then(response => response.json())  // Parse JSON from response
        .then(data => {
            const slidesContainer = document.getElementById('slides');
            slidesContainer.innerHTML = "";
            const drinks = data.drinks;
          
          // If no drinks found, display a message
          if (!drinks) {
            slidesContainer.innerHTML = '<p>No drinks found.</p>';
            return;
          }

          // Create a slide for each drink
          drinks.forEach((drink, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            // Mark the first slide as active (visible)
            if (index === 0) {
              slide.classList.add('active');
            }

            // Drink image
            const img = document.createElement('img');
            img.src = drink.strDrinkThumb;   // Image URL
            img.alt = drink.strDrink;

            // Drink name (title)
            const title = document.createElement('h2');
            title.textContent = drink.strDrink;

            // Drink instructions
            const instructions = document.createElement('p');
            instructions.textContent = drink.strInstructions;

            // Assemble the slide
            slide.appendChild(img);
            slide.appendChild(title);
            slide.appendChild(instructions);

            // Add slide to the container
            slidesContainer.appendChild(slide);
          });

          // Slider navigation logic
          let currentSlide = 0;
          const slides = document.querySelectorAll('.slide');
          const totalSlides = slides.length;

          // Show the next slide on right arrow click
          document.getElementById('next').addEventListener('click', () => {
            slides[currentSlide].classList.remove('active');         // hide current
            currentSlide = (currentSlide + 1) % totalSlides;         // move index forward
            slides[currentSlide].classList.add('active');            // show new slide
          });

          // Show the previous slide on left arrow click
          document.getElementById('prev').addEventListener('click', () => {
            slides[currentSlide].classList.remove('active');         // hide current
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // move index back (with wrap)
            slides[currentSlide].classList.add('active');            // show new slide
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
};