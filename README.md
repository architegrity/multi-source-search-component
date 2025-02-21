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

---

## Installation

To use this component in your project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/multi-source-search-component.git
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
- By default, all data sources are selected.

### 2. Enter Search Query
- Type your search query in the input field. As you type, real-time suggestions will appear below the input.

### 3. View Results
- Results are displayed in either **table** or **card** format, depending on the configuration.
- Use the **"Show More"** button to load additional results if available.

### 4. Frequent Searches
- Click on any of the frequent search badges to quickly populate the search input and view results.

---

## Configuration

The application can be customized by modifying the `config.js` file. Here are the key configuration options:

- **`maxResultsPerCategory`**: Maximum number of results to display per category.
- **`displayFormat`**: Choose between `"table"` or `"cards"` for result display.
- **`categories`**: Define the data sources, fields to display, and associated data.

Example configuration:
```javascript
const config = {
  maxResultsPerCategory: 5,
  displayFormat: "table",
  categories: [
    {
      name: "Samples",
      dataSource: dataSources.Samples,
      fields: ["id", "name", "equipment"]
    },
    {
      name: "Equipment",
      dataSource: dataSources.Equipment,
      fields: ["id", "name", "customer"]
    }
  ]
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
