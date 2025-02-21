// config.js
import dataSources from './data.js'; // Import the data sources

// Configuration for the application
const config = {
  maxResultsPerCategory: 5, // Maximum number of results to display per category
  displayFormat: "table", // Options: "cards" or "table"
  categories: [
    {
      name: "Samples",
      dataSource: dataSources.Samples, // Use the imported data
      fields: ["id", "name", "equipment"] // Fields to display for Samples
    },
    {
      name: "Equipment",
      dataSource: dataSources.Equipment, // Use the imported data
      fields: ["id", "name", "customer"] // Fields to display for Equipment (removed "samples")
    },
    {
      name: "Customers",
      dataSource: dataSources.Customers, // Use the imported data
      fields: ["id", "name", "equipment", "contracts"] // Fields to display for Customers
    },
    {
      name: "Contracts",
      dataSource: dataSources.Contracts, // Use the imported data
      fields: ["id", "name", "customer"] // Fields to display for Contracts
    },
    {
      name: "Orders",
      dataSource: dataSources.Orders, // Use the imported data
      fields: ["id", "name", "contract", "customer", "samples"] // Fields to display for Orders
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