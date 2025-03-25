export interface Offer {
    title: string;
    description: string[];
    image: string;
  }

const offersData: Offer[] = [
    {
      title: "Maximize Investment",
      description: [
        "98% of rents collected before 5th each month",
        "Yearly rent increase with market analysis",
        "Quarterly Market and Home Analysis",
      ],
      image: "/HomeInvestment.jpg",
    },
    {
      title: "Transparent Reporting",
      description: [
        "Income and Cash Flow Statements",
        "Monthly Account Receivables/Payables",
        "Work Order Transparency",
      ],
      image: "/HomeReporting.webp",
    },
    {
      title: "Proactive Approach",
      description: [
        "In-House Services for Majority of Needs",
        "Competitive and Local Contractors",
        "Quarterly Inspections at No Cost",
      ],
      image: "/HomeApproach.webp",
    },
    // {
    //   title: "Marketing",
    //   description: [
    //     "We utilize a range of marketing channels to highlight your properties and maximize their visibility.",
    //   ],
    //   image: "/HomeInvestment.webp",
    // },
  ];
  
  
  export default offersData;