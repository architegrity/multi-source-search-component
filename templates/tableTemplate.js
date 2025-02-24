// templates/tableTemplate.js

/**
 * Template for displaying results in table format.
 * @param {string} key - The category name.
 * @param {Array} items - The items to display.
 * @param {Array} fields - The fields to display for each item.
 * @param {string} searchQuery - The search query.
 * @param {number} remainingItems - The number of remaining items not displayed.
 * @param {string} showMoreUrl - URL for "Show More" (search query will be appended)
 * @param {string} detailsUrl - Base URL for details page (ID will be appended)
 * @returns {string} - The HTML string for the table template.
 */
 export function tableTemplate(category, items, fields, searchQuery, remainingItems, showMoreUrl, detailsUrl) {
    return `
    <div class="result-category">
    <h4>${category}</h4>
    <table class="result-table">
      <thead>
        <tr>
          ${fields.map((field) => `<th>${field}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${items.map((item) => `
          <tr>
            ${fields.map((field) => `
              <td>
                ${field === "id" 
                  ? `<a href="${detailsUrl}/${item.id}" target="_blank">${item[field]}</a>` 
                  : item[field]}
              </td>
            `).join("")}
          </tr>
        `).join("")}
      </tbody>
    </table>
    ${remainingItems > 0 
      ? `<button class="show-more-button" data-category="${category}">Show ${remainingItems} more</button>` 
      : ""}
  </div>
    `;
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