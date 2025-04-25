const apiUrl = "https://29a1239e-0423-4d8c-a8db-d433f4f2e8ba.mock.pstmn.io";

async function getArrays3() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    //console.log(data);
    // Flatten the data object into an array of elements
    const elements = [].concat(...Object.values(data));
    return elements;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function search(nationality) {
  const elements = await getArrays3();

  // Filter the elements by nationality
  const results = elements.filter(
    (element) => element.nationality === nationality
  );

  // Clear the search results
  const searchResults = document.querySelector("#search-results");
  searchResults.innerHTML = "";

  // Display the search results
  results.forEach((element) => {
    const section = document.createElement("section");
    section.innerHTML = `
    <section class="results">
      <div class="header">
          <p> ${element.name}</p>
          </div>
          <article class="container">
          <p>Nationality: ${element.nationality}</p>
          <p>Year of Mr. Olympia title: ${element.win_mister_olympia}</p>
                <img src="${element.imageP}" alt="${element.name}" class="img-fluid">
                </article>
        </section>
    
    `;
    searchResults.appendChild(section);
  });
}

// Add event listener to the search form
const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the selected nationality
  const nationalitySelect = document.querySelector("#nationality-select");
  const nationality = nationalitySelect.value;
  search(nationality);
});

// Populate the nationality select with the available nationalities
getArrays3().then((elements) => {
  const nationalities = new Set(elements.map((element) => element.nationality));
  const nationalitySelect = document.querySelector("#nationality-select");

  nationalities.forEach((nationality) => {
    const option = document.createElement("option");
    option.value = nationality;
    option.textContent = nationality;
    nationalitySelect.appendChild(option);
  });
});

/* async function getArrays() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    const container = document.querySelector("#container");
    for (let categories in data) {
      const p = document.createElement("p");
      p.textContent = categories;
      container.appendChild(p);
      console.log(categories);
    }
  } catch (error) {
    console.error(error);
  }
} */
/* 
getArrays();

async function getArrays2() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    const container = document.querySelector("#container");
    for (let category in data) {
      const p = document.createElement("p");
      p.textContent = category;
      container.appendChild(p);
      data[category].forEach((element) => {
        const liName = document.createElement("li");
        liName.textContent = `Name: ${element.name}`;
        container.appendChild(liName);
        const liImage = document.createElement("li");
        const img = document.createElement("img");
        img.src = element.imageP;
        liImage.appendChild(img);
        img.classList.add("img-fluid");
        container.appendChild(liImage);
        const liNationality = document.createElement("li");
        liNationality.textContent = `Nationality: ${element.nationality}`;
        container.appendChild(liNationality);
        const liwins = document.createElement("li");
        liwins.textContent = `Number of titles won: ${element.win_mister_olympia}`;
        container.appendChild(liwins);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

getArrays2(); */
