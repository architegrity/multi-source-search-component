# Multi-Source Search Component

A dynamic and flexible search interface designed to query and display results from multiple data sources. This component allows users to select specific data categories, provides real-time search suggestions, and displays results in either table or card format. Ideal for applications requiring cross-category search functionality with a user-friendly interface.

---

## Features

- **Multi-Source Search**: Search across multiple data categories or sources simultaneously.
- **Dynamic Suggestions**: Real-time search suggestions based on user input.
- **Customizable Display**: Results can be displayed in table or card format.
- **Frequent Searches**: Quick access to popular or frequently searched terms.
- **Flexible Configuration**: Easily configurable data sources and search parameters.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Highlighting Matches**: Search query matches are highlighted in suggestions and results.
- **Error Handling**: Displays error messages for empty search queries and no results found.
- **Navigation to Details**: Each result item includes a link to a detailed view.

---

## Installation

To use this component in your project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/architegrity/multi-source-search-component.git
   cd multi-source-search-component
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

---

## Usage

### 1. Select Data Sources
- Click the **"Select Data Sources"** button to choose the data categories you want to search across.
- By default, all data sources are selected. You can toggle individual data sources on or off.

### 2. Enter Search Query
- Type your search query in the input field. As you type, real-time suggestions will appear below the input.
- Use the **arrow keys** to navigate through suggestions and press **Enter** to select one.

### 3. View Results
- Results are displayed in either **table** or **card** format, depending on the configuration.
- Use the **"Show More"** button to load additional results if available.

### 4. Frequent Searches
- Click on any of the frequent search badges to quickly populate the search input and view results.

### 5. Clear Search
- Use the **clear button (`×`)** to reset the search input and clear the results.

---

## Configuration

The application can be customized by modifying the `config.js` file. Here are the key configuration options:

- **`displayFormat`**: Determines the format in which search results are displayed. Options are:
  - `"cards"`: Results are displayed as cards.
  - `"table"`: Results are displayed in a table format.

- **`categories`**: An array of objects, each representing a data source category. Each category object contains the following properties:
  - **`name`**: The name of the category (e.g., "Samples", "Equipment").
  - **`dataSource`**: The data source for the category, imported from `data.js`.
  - **`fields`**: An array of fields to display for each item in the category.
  - **`maxResults`**: The maximum number of results to display for the category.
  - **`maxSuggestions`**: The maximum number of suggestions to display for the category.
  - **`order`**: The order in which the category should appear in the results. Lower numbers appear first. A value of `-1` means the order is ignored, and results are sorted by score.
  - **`icon`**: The FontAwesome icon class for the category.
  - **`showMoreUrl`**: The URL for the "Show More" button, which will append the search query as a parameter.
  - **`detailsUrl`**: The base URL for the details page, which will append the item ID.
  - **`suggestionLabel`**: The format for suggestion labels, using placeholders like `${id}` and `${name}`.

- **`popularSearches`**: An object containing predefined frequent searches for each category. Each key corresponds to a category name, and the value is an array of search terms.

Example configuration:
```javascript
const config = {
  displayFormat: "cards",
  categories: [
    {
      name: "Samples",
      dataSource: dataSources.Samples,
      fields: ["id", "name", "equipment"],
      maxResults: 3,
      maxSuggestions: 3,
      order: 1,
      icon: "fas fa-vial",
      showMoreUrl: "/samples",
      detailsUrl: "/sample-details",
      suggestionLabel: "${id} - ${name}"
    },
    {
      name: "Equipment",
      dataSource: dataSources.Equipment,
      fields: ["id", "name", "customer"],
      maxResults: 5,
      maxSuggestions: 5,
      order: 2,
      icon: "fas fa-microscope",
      showMoreUrl: "/equipment",
      detailsUrl: "/equipment-details",
      suggestionLabel: "${name} (${id})"
    }
  ]
};

const popularSearches = {
  Samples: ["SMP-56789", "SMP-43221", "SMP-90877"],
  Equipment: ["EQP-1023", "EQP-2045", "EQP-3078"]
};
```

---

## Data Sources

The `data.js` file contains the sample data used in this application. You can replace this with your own data sources. Each data source is an array of objects with fields that can be searched and displayed.

Example data structure:
```javascript
const dataSources = {
  Samples: [
    { id: "SMP-56789", name: "Sample 1", equipment: "EQP-1023" },
    { id: "SMP-43221", name: "Sample 2", equipment: "EQP-2045" }
  ],
  Equipment: [
    { id: "EQP-1023", name: "Spectrometer X-300", customer: "LabTech Solutions" },
    { id: "EQP-2045", name: "Microscope UltraZoom", customer: "LabTech Solutions" }
  ]
};
```

---

## Templates

The application uses two templates for displaying search results:

### 1. **Card Template (`cardTemplate.js`)**
   - Displays results in a card format.
   - Each card contains the fields specified in the configuration.
   - The `id` field acts as a hyperlink to the details page.

### 2. **Table Template (`tableTemplate.js`)**
   - Displays results in a table format.
   - Each row corresponds to an item, and columns represent the fields specified in the configuration.
   - The `id` field acts as a hyperlink to the details page.

---

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your fork.
4. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Built with HTML, CSS, and JavaScript.
- Inspired by modern search interfaces and multi-source data exploration tools.
- Uses [FontAwesome](https://fontawesome.com/) for icons.
