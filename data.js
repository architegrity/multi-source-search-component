// data.js
const dataSources = {
    Samples: [
      { id: "SMP-56789", name: "SMP-56789", equipment: "EQP-1023" },
      { id: "SMP-43221", name: "SMP-43221", equipment: "EQP-2045" },
      { id: "SMP-90877", name: "SMP-90877", equipment: "EQP-3078" },
      { id: "SMP-78543", name: "SMP-78543", equipment: "EQP-1023" },
      { id: "SMP-67234", name: "SMP-67234", equipment: "EQP-4590" },
      { id: "SMP-12345", name: "SMP-12345", equipment: "EQP-1023" },
      { id: "SMP-67890", name: "SMP-67890", equipment: "EQP-2045" },
      { id: "SMP-24680", name: "SMP-24680", equipment: "EQP-3078" },
      { id: "SMP-13579", name: "SMP-13579", equipment: "EQP-4590" },
      { id: "SMP-98765", name: "SMP-98765", equipment: "EQP-7789" }
    ],
    Equipment: [
      { id: "EQP-1023", name: "Spectrometer X-300", customer: "LabTech Solutions" },
      { id: "EQP-2045", name: "Microscope UltraZoom", customer: "LabTech Solutions" },
      { id: "EQP-3078", name: "Centrifuge MaxSpeed", customer: "BioGen Labs" },
      { id: "EQP-4590", name: "Gas Chromatograph", customer: "LabTech Solutions" },
      { id: "EQP-7789", name: "Thermal Cycler PCR", customer: "Genomic Labs" },
      { id: "EQP-1111", name: "Analyzer Pro", customer: "LabTech Solutions" },
      { id: "EQP-2222", name: "Spectrophotometer", customer: "BioGen Labs" },
      { id: "EQP-3333", name: "Incubator Shaker", customer: "Genomic Labs" },
      { id: "EQP-4444", name: "Autoclave", customer: "LabTech Solutions" },
      { id: "EQP-5555", name: "Fluorescence Microscope", customer: "BioGen Labs" }
    ],
    Customers: [
      { id: "CUST-31312", name: "LabTech Solutions", equipment: ["EQP-1023", "EQP-2045", "EQP-4590", "EQP-1111", "EQP-4444"], contracts: ["CTR-2024-0012", "CTR-2024-0023"] },
      { id: "CUST-43242", name: "BioGen Labs", equipment: ["EQP-3078", "EQP-2222", "EQP-5555"], contracts: ["CTR-2024-0035"] },
      { id: "CUST-66532", name: "Genomic Labs", equipment: ["EQP-7789", "EQP-3333"], contracts: ["CTR-2024-0040"] },
      { id: "CUST-12345", name: "PharmaTech", equipment: [], contracts: ["CTR-2024-0050"] },
      { id: "CUST-67890", name: "MediGen", equipment: [], contracts: ["CTR-2024-0060"] }, // MediGen owns no equipment
      { id: "CUST-24680", name: "BioPharma Inc.", equipment: [], contracts: ["CTR-2024-0070"] },
      { id: "CUST-13579", name: "GenomeX", equipment: [], contracts: ["CTR-2024-0080"] },
      { id: "CUST-98765", name: "CellTech", equipment: [], contracts: ["CTR-2024-0090"] },
      { id: "CUST-11223", name: "NanoBio", equipment: [], contracts: [] },
      { id: "CUST-44556", name: "BioSolutions", equipment: [], contracts: [] }
    ],
    Contracts: [
      { id: "CTR-2024-0012", name: "Contract - LabTech Annual Support", customer: "LabTech Solutions" },
      { id: "CTR-2024-0023", name: "Contract - Equipment Maintenance", customer: "LabTech Solutions" },
      { id: "CTR-2024-0035", name: "Contract - BioGen Research Partnership", customer: "BioGen Labs" },
      { id: "CTR-2024-0040", name: "Contract - Genomic Data Analysis", customer: "Genomic Labs" },
      { id: "CTR-2024-0050", name: "Contract - PharmaTech Collaboration", customer: "PharmaTech" },
      { id: "CTR-2024-0060", name: "Contract - MediGen Equipment Lease", customer: "MediGen" },
      { id: "CTR-2024-0070", name: "Contract - BioPharma Research Agreement", customer: "BioPharma Inc." },
      { id: "CTR-2024-0080", name: "Contract - GenomeX Data Services", customer: "GenomeX" },
      { id: "CTR-2024-0090", name: "Contract - CellTech Support", customer: "CellTech" },
      { id: "CTR-2024-0100", name: "Contract - NanoBio Partnership", customer: "NanoBio" }
    ],
    Orders: [
      {
        id: "ORD-1001",
        name: "Order - LabTech Annual Support Samples",
        contract: "CTR-2024-0012",
        customer: "LabTech Solutions",
        samples: ["SMP-56789", "SMP-78543"]
      },
      {
        id: "ORD-1002",
        name: "Order - BioGen Research Samples",
        contract: "CTR-2024-0035",
        customer: "BioGen Labs",
        samples: ["SMP-90877"]
      },
      {
        id: "ORD-1003",
        name: "Order - Genomic Data Analysis Samples",
        contract: "CTR-2024-0040",
        customer: "Genomic Labs",
        samples: ["SMP-24680", "SMP-98765"]
      },
      {
        id: "ORD-1004",
        name: "Order - PharmaTech Collaboration Samples",
        contract: "CTR-2024-0050",
        customer: "PharmaTech",
        samples: ["SMP-12345"]
      },
      // Removed ORD-1005 (MediGen) because MediGen owns no equipment and cannot place an order
      // Removed ORD-1006 (BioPharma Inc.) because BioPharma Inc. owns no equipment and cannot place an order
      {
        id: "ORD-1007",
        name: "Order - GenomeX Data Services Samples",
        contract: "CTR-2024-0080",
        customer: "GenomeX",
        samples: ["SMP-98765"] // GenomeX owns EQP-7789, which is associated with SMP-98765
      },
      // Removed ORD-1008 (CellTech) because CellTech owns no equipment and cannot place an order
      // Removed ORD-1009 (NanoBio) because NanoBio owns no equipment and cannot place an order
      {
        id: "ORD-1010",
        name: "Order - LabTech Additional Samples",
        contract: "CTR-2024-0012",
        customer: "LabTech Solutions",
        samples: ["SMP-67234"] // LabTech Solutions owns EQP-4590, which is associated with SMP-67234
      }
    ]
  };
  
  // Export the dataSources object
  export default dataSources;