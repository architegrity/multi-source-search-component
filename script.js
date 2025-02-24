// script.js
import { config, popularSearches } from './config.js'; // Import the config and popularSearches
import { cardTemplate } from './templates/cardTemplate.js'; // Import the card template
import { tableTemplate } from './templates/tableTemplate.js'; // Import the table template

// Application state
let selectedSources = ["All Data Sources"]; // Default to "All Data Sources"
let searchQuery = ""; // Current search query
let results = {}; // Search results
let suggestions = []; // Suggestions for the search input
let highlightedSuggestionIndex = -1; // Index of the currently highlighted suggestion

// DOM Elements
const dropdownButton = document.querySelector(".dropdown-button");
const dropdownContent = document.querySelector(".dropdown-content");
const dropdown = document.querySelector(".dropdown");
const searchQueryInput = document.getElementById("search-query");
const clearSearchButton = document.getElementById("clear-search");
const searchButton = document.getElementById("search-button");
const suggestionsDropdown = document.getElementById("suggestions");
const popularSearchesContainer = document.getElementById("popular-searches");
const searchResultsContainer = document.getElementById("search-results");

// Clear results container on page load
searchResultsContainer.innerHTML = "";

/**
 * Initialize frequent searches based on selected data sources.
 */
function initializePopularSearches() {
  popularSearchesContainer.innerHTML = ""; // Clear existing badges

  if (selectedSources.includes("All Data Sources")) {
    // Show one item per data source when "All Data Sources" is selected
    Object.entries(popularSearches).forEach(([category, terms]) => {
      if (terms.length > 0) {
        const badge = document.createElement("div");
        badge.className = "badge";
        badge.textContent = terms[0]; // Show only the first item
        badge.addEventListener("click", () => {
          searchQueryInput.value = terms[0];
          searchQuery = terms[0];
          handleSearch();
          searchQueryInput.dispatchEvent(new Event("input")); // Trigger suggestions
          suggestionsDropdown.style.display = "none"; // Close suggestions dropdown
        });
        popularSearchesContainer.appendChild(badge);
      }
    });
  } else if (selectedSources.length === 1) {
    // Show three items when only one data source is selected
    const source = selectedSources[0];
    if (popularSearches[source]) {
      popularSearches[source].slice(0, 3).forEach((term) => {
        const badge = document.createElement("div");
        badge.className = "badge";
        badge.textContent = term;
        badge.addEventListener("click", () => {
          searchQueryInput.value = term;
          searchQuery = term;
          handleSearch();
          searchQueryInput.dispatchEvent(new Event("input")); // Trigger suggestions
          suggestionsDropdown.style.display = "none"; // Close suggestions dropdown
        });
        popularSearchesContainer.appendChild(badge);
      });
    }
  } else {
    // Show one item per selected data source when multiple data sources are selected
    selectedSources.forEach((source) => {
      if (popularSearches[source] && popularSearches[source].length > 0) {
        const badge = document.createElement("div");
        badge.className = "badge";
        badge.textContent = popularSearches[source][0]; // Show only the first item
        badge.addEventListener("click", () => {
          searchQueryInput.value = popularSearches[source][0];
          searchQuery = popularSearches[source][0];
          handleSearch();
          searchQueryInput.dispatchEvent(new Event("input")); // Trigger suggestions
          suggestionsDropdown.style.display = "none"; // Close suggestions dropdown
        });
        popularSearchesContainer.appendChild(badge);
      }
    });
  }
}

// Initialize frequent searches on page load
initializePopularSearches();

// Populate dropdown options
// Populate dropdown options with icons
dropdownContent.innerHTML = `
  <label><input type="checkbox" value="All Data Sources" checked> <i class="fas fa-layer-group"></i> All Data Sources</label>
  ${config.categories
    .map(
      (category) => `
    <label><input type="checkbox" value="${category.name}"> <i class="${category.icon}"></i> ${category.name}</label>
  `
    )
    .join("")}
`;

// Toggle dropdown visibility
dropdownButton.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent the click from propagating to the document
  dropdown.classList.toggle("active"); // Toggle the "active" class on the dropdown
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove("active"); // Close the dropdown
  }
});

// Handle checkbox changes in the dropdown
dropdownContent.addEventListener("change", (e) => {
  if (e.target.tagName === "INPUT") {
    const checkboxes = Array.from(dropdownContent.querySelectorAll("input"));
    const allDataSourcesCheckbox = checkboxes.find(checkbox => checkbox.value === "All Data Sources");

    if (e.target.value === "All Data Sources" && e.target.checked) {
      // If "All Data Sources" is selected, deselect all other checkboxes
      checkboxes.forEach(checkbox => {
        if (checkbox.value !== "All Data Sources") {
          checkbox.checked = false;
        }
      });
    } else if (e.target.value !== "All Data Sources" && e.target.checked) {
      // If a specific data source is selected, deselect "All Data Sources"
      allDataSourcesCheckbox.checked = false;
    }

    // Update the selectedSources array
    selectedSources = checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    initializePopularSearches(); // Reinitialize frequent searches

    // Only perform search if the query is not empty
    if (searchQuery.trim() !== "") {
      handleSearch();
    } else {
      // Clear results if the query is empty
      searchResultsContainer.innerHTML = "";
    }
  }
});

// Handle search input changes
searchQueryInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  highlightedSuggestionIndex = -1; // Reset the highlighted suggestion
  if (searchQuery.length > 1) {
    // Generate suggestions from selected categories
    suggestions = config.categories
      .filter((category) => selectedSources.includes(category.name) || selectedSources.includes("All Data Sources"))
      .flatMap((category) => {
        // Apply maxSuggestions limit per category
        return category.dataSource
          .map((item) => ({
            ...item,
            score: calculateScore(item, searchQuery), // Calculate score for each item
            category: category.name, // Add category name for filtering
            order: category.order // Add category order for sorting
          }))
          .filter((item) => item.score > 0) // Filter out items with no match
          .sort((a, b) => b.score - a.score) // Sort by score in descending order
          .slice(0, category.maxSuggestions); // Apply per-category maxSuggestions limit
      })
      .sort((a, b) => {
        // Sort by order first, then by score
        if (a.order !== -1 && b.order !== -1) {
          return a.order - b.order; // Lower order numbers come first
        }
        return b.score - a.score; // Fallback to score if order is -1
      })
      .slice(0, 10); // Global limit for total suggestions (optional)

    renderSuggestions();
  } else {
    suggestions = [];
    renderSuggestions();
  }
});

// Close suggestions dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!suggestionsDropdown.contains(e.target) && !searchQueryInput.contains(e.target)) {
    suggestionsDropdown.style.display = "none"; // Close the suggestions dropdown
  }
});

// Trigger suggestions when clicking on the search input (if it has text)
searchQueryInput.addEventListener("click", () => {
  if (searchQueryInput.value.length > 1) {
    searchQueryInput.dispatchEvent(new Event("input")); // Trigger suggestions
  }
});

// Clear search input and reset state
clearSearchButton.addEventListener("click", () => {
  searchQueryInput.value = "";
  searchQuery = "";
  suggestions = [];
  renderSuggestions();
  searchQueryInput.classList.remove("mandatory"); // Remove the mandatory highlight
  searchResultsContainer.innerHTML = ""; // Clear the results container
});

// Handle search button click
searchButton.addEventListener("click", () => {
  const query = searchQuery.trim().toLowerCase();

  // Check if the search query is empty
  if (query === "") {
    searchResultsContainer.innerHTML = `<p class="error-message">Search input is required.</p>`;
    searchQueryInput.classList.add("mandatory"); // Highlight the input as mandatory
    return; // Exit the function early
  }

  // Remove the mandatory highlight if the query is not empty
  searchQueryInput.classList.remove("mandatory");

  // Perform the search
  handleSearch();
  suggestionsDropdown.style.display = "none"; // Close the suggestions dropdown
});

// Handle Enter key press in the search input
searchQueryInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchQuery.trim().toLowerCase();

    // Check if the search query is empty
    if (query === "") {
      searchResultsContainer.innerHTML = `<p class="error-message">Search input is required.</p>`;
      searchQueryInput.classList.add("mandatory"); // Highlight the input as mandatory
      return; // Exit the function early
    }

    // Remove the mandatory highlight if the query is not empty
    searchQueryInput.classList.remove("mandatory");

    // Perform the search
    handleSearch();
    suggestionsDropdown.style.display = "none"; // Close the suggestions dropdown
  }
});

// Handle arrow key navigation in the suggestions dropdown
searchQueryInput.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    // Move down the suggestions list
    e.preventDefault(); // Prevent the cursor from moving in the input
    highlightedSuggestionIndex = Math.min(highlightedSuggestionIndex + 1, suggestions.length - 1);
    renderSuggestions();
  } else if (e.key === "ArrowUp") {
    // Move up the suggestions list
    e.preventDefault(); // Prevent the cursor from moving in the input
    highlightedSuggestionIndex = Math.max(highlightedSuggestionIndex - 1, -1);
    renderSuggestions();
  } else if (e.key === "Enter" && highlightedSuggestionIndex >= 0) {
    // Select the highlighted suggestion
    const selectedSuggestion = suggestions[highlightedSuggestionIndex];
    selectSuggestion(selectedSuggestion.name);
  }
});

/**
 * Perform the search and update the results.
 */
function handleSearch() {
  results = {};
  const query = searchQuery.toLowerCase();

  if (selectedSources.includes("All Data Sources")) {
    // Search across all categories
    config.categories.forEach((category) => {
      category.dataSource
        .filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(query)
          )
        )
        .forEach((item) => {
          results[category.name] = [...(results[category.name] || []), item];
        });
    });
  } else {
    // Search only in selected categories
    selectedSources.forEach((source) => {
      const category = config.categories.find((cat) => cat.name === source);
      if (category) {
        category.dataSource
          .filter((item) =>
            Object.values(item).some((value) =>
              String(value).toLowerCase().includes(query)
            )
          )
          .forEach((item) => {
            results[category.name] = [...(results[category.name] || []), item];
          });
      }
    });
  }

  // Remove duplicates from results
  Object.keys(results).forEach((key) => {
    results[key] = [...new Set(results[key])];
  });

  renderResults();
}

/**
 * Format the suggestion label using the template and item fields.
 * @param {string} template - The label template (e.g., "${id} - ${name}").
 * @param {object} item - The item containing the fields.
 * @returns {string} - The formatted label.
 */
 function formatSuggestionLabel(template, item) {
  return template.replace(/\${(.*?)}/g, (match, field) => item[field] || "");
}

/**
 * Render the suggestions dropdown.
 */
 function renderSuggestions() {
  suggestionsDropdown.innerHTML = suggestions
    .map(
      (item, index) => {
        const category = config.categories.find((cat) => cat.name === item.category);
        const labelTemplate = category?.suggestionLabel || "${id} - ${name}"; // Default template
        const label = formatSuggestionLabel(labelTemplate, item);

        return `
          <div class="suggestion ${index === highlightedSuggestionIndex ? "highlighted" : ""}" data-suggestion="${item.name}">
            <i class="${category?.icon || "fas fa-question"}"></i>
            ${highlightText(label, searchQuery)}
          </div>
        `;
      }
    )
    .join("");
  suggestionsDropdown.style.display = suggestions.length > 0 ? "block" : "none";

  // Attach click event listeners to the suggestion items
  const suggestionItems = suggestionsDropdown.querySelectorAll(".suggestion");
  suggestionItems.forEach((item) => {
    item.addEventListener("click", () => {
      const selectedSuggestion = suggestions.find(
        (suggestion) => suggestion.name === item.dataset.suggestion
      );
      if (selectedSuggestion) {
        selectSuggestion(selectedSuggestion.name);
      }
    });
  });
}

/**
 * Select a suggestion and trigger a search.
 * @param {string} term - The selected suggestion.
 */
function selectSuggestion(term) {
  searchQueryInput.value = term;
  searchQuery = term;
  suggestions = []; // Clear suggestions
  renderSuggestions(); // Hide the suggestions dropdown
  handleSearch(); // Trigger search
}

/**
 * Render the search results.
 */
 function renderResults() {
  const hasResults = Object.values(results).some((items) => items.length > 0);

  if (!hasResults) {
    searchResultsContainer.innerHTML = `<p>No results found for "${searchQuery}".</p>`;
    return;
  }

  // Sort categories by order before rendering results
  const sortedCategories = config.categories
    .filter((category) => results[category.name] && results[category.name].length > 0)
    .sort((a, b) => {
      if (a.order !== -1 && b.order !== -1) {
        return a.order - b.order; // Lower order numbers come first
      }
      return 0; // If order is -1, maintain original order
    });

  searchResultsContainer.innerHTML = sortedCategories
    .map((category) => {
      const items = results[category.name];
      const fields = category.fields;
      const maxResults = category.maxResults; // Use per-category maxResults
      const displayedItems = items.slice(0, maxResults); // Limit the number of results
      const remainingItems = items.length - displayedItems.length; // Calculate remaining items

      // Choose the template based on the displayFormat configuration
      if (config.displayFormat === "table") {
        return tableTemplate(category.name, displayedItems, fields, searchQuery, remainingItems, category.showMoreUrl, category.detailsUrl);
      } else {
        return cardTemplate(category.name, displayedItems, fields, searchQuery, remainingItems, category.showMoreUrl, category.detailsUrl);
      }
    })
    .join("");

  // Add event listeners to "Show More" buttons
  const showMoreButtons = document.querySelectorAll(".show-more-button");
  showMoreButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const category = e.target.dataset.category;
      const showMoreUrl = config.categories.find((cat) => cat.name === category)?.showMoreUrl;

      if (showMoreUrl) {
        // Navigate to the "Show More" URL with the search query as a parameter
        window.location.href = `${showMoreUrl}?q=${encodeURIComponent(searchQuery)}`;
      }
    });
  });
}

/**
 * Calculate the score for a suggestion based on the search query.
 * @param {object} item - The item to score.
 * @param {string} query - The search query.
 * @returns {number} - The calculated score.
 */
function calculateScore(item, query) {
  const queryLower = query.toLowerCase();
  let score = 0;

  // Exact match in the "id" field
  if (item.id.toLowerCase() === queryLower) {
    score += 100;
  }
  // Exact match in the "name" field
  if (item.name.toLowerCase() === queryLower) {
    score += 90;
  }
  // Partial match in the "id" field
  if (item.id.toLowerCase().includes(queryLower)) {
    score += 50;
  }
  // Partial match in the "name" field
  if (item.name.toLowerCase().includes(queryLower)) {
    score += 40;
  }
  // Partial match in other fields
  Object.values(item).forEach((value) => {
    if (String(value).toLowerCase().includes(queryLower)) {
      score += 10;
    }
  });

  return score;
}

/**
 * Highlight the search query in the text.
 * @param {string} text - The text to highlight.
 * @param {string} query - The search query.
 * @returns {string} - The text with highlighted query.
 */
function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<span class='highlight'>$1</span>");
}