// config.js
import dataSources from './data.js'; // Import the data sources

// Configuration for the application
const config = {
  displayFormat: "table", // Options: "cards" or "table"
  categories: [
    {
      name: "Samples",
      dataSource: dataSources.Samples, // Use the imported data
      fields: ["id", "name", "equipment"], // Fields to display for Samples
      maxResults: 3, // Maximum number of results for Samples
      maxSuggestions: 3, // Maximum number of suggestions for Samples
      order: -1, // Order number for Samples (lower numbers appear first)
      icon: "fas fa-vial", // FontAwesome icon for Samples
      showMoreUrl: "/samples", // URL for "Show More" (search query will be appended)
      detailsUrl: "/sample-details", // Base URL for details page (ID will be appended)
      suggestionLabel: "${id} - ${name}" // Label format for suggestions
    },
    {
      name: "Equipment",
      dataSource: dataSources.Equipment, // Use the imported data
      fields: ["id", "name", "customer"], // Fields to display for Equipment
      maxResults: 5, // Maximum number of results for Equipment
      maxSuggestions: 5, // Maximum number of suggestions for Equipment
      order: -1, // Order number for Equipment
      icon: "fas fa-microscope", // FontAwesome icon for Equipment
      showMoreUrl: "/equipment", // URL for "Show More"
      detailsUrl: "/equipment-details", // Base URL for details page
      suggestionLabel: "${name} (${id})" // Label format for suggestions
    },
    {
      name: "Customers",
      dataSource: dataSources.Customers, // Use the imported data
      fields: ["id", "name", "equipment", "contracts"], // Fields to display for Customers
      maxResults: 5, // Maximum number of results for Customers
      maxSuggestions: 4, // Maximum number of suggestions for Customers
      order: -1, // Order number for Customers
      icon: "fas fa-users", // FontAwesome icon for Customers
      showMoreUrl: "/customers", // URL for "Show More"
      detailsUrl: "/customer-details", // Base URL for details page
      suggestionLabel: "${name}" // Label format for suggestions
    },
    {
      name: "Contracts",
      dataSource: dataSources.Contracts, // Use the imported data
      fields: ["id", "name", "customer"], // Fields to display for Contracts
      maxResults: 5, // Maximum number of results for Contracts
      maxSuggestions: 3, // Maximum number of suggestions for Contracts
      order: -1, // Order number for Contracts
      icon: "fas fa-file-contract", // FontAwesome icon for Contracts
      showMoreUrl: "/contracts", // URL for "Show More"
      detailsUrl: "/contract-details", // Base URL for details page
      suggestionLabel: "${name} - ${id}" // Label format for suggestions
    },
    {
      name: "Orders",
      dataSource: dataSources.Orders, // Use the imported data
      fields: ["id", "name", "contract", "customer", "samples"], // Fields to display for Orders
      maxResults: 5, // Maximum number of results for Orders
      maxSuggestions: 5, // Maximum number of suggestions for Orders
      order: -1, // Order number for Orders (-1 means ignore order and use scores only)
      icon: "fas fa-shopping-cart", // FontAwesome icon for Orders
      showMoreUrl: "/orders", // URL for "Show More"
      detailsUrl: "/order-details", // Base URL for details page
      suggestionLabel: "${id} - ${name} (${customer})" // Label format for suggestions
    }
  ]
};

// Predefined frequent searches for each category
const popularSearches = {
  Samples: ["SMP-56789", "SMP-43221", "SMP-90877"],
  Equipment: ["EQP-1023", "EQP-2045", "EQP-3078"],
  Customers: ["CUST-31312", "CUST-43242", "CUST-66532"],
  Contracts: ["CTR-2024-0012", "CTR-2024-0023", "CTR-2024-0035"],
  Orders: ["ORD-1001", "ORD-1002", "ORD-1003"] // Add frequent searches for Orders
};

// Export the config and popularSearches objects
export { config, popularSearches };