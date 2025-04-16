import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";

const rules = [
  {
    title: "Eligibility for Placement",
    points: [
      "Only students with a minimum CGPA of X.XX are eligible to register for the placement process.",
      "Students must submit updated resumes and academic records before deadlines."
    ]
  },
  {
    title: "Application Policy",
    points: [
      "Students must apply only through the official placement portal.",
      "Applications after the deadline will not be accepted under any circumstances."
    ]
  },
  {
    title: "Offer Rules",
    points: [
      "Once a student is placed in a company, they will not be allowed to sit for any further placement drives.",
      "Exceptions may apply based on company type (Core/Dream/Super Dream) as per placement cell policies."
    ]
  },
  {
    title: "Company Classification",
    points: [
      "Core Company: Related to the student's branch of study.",
      "Dream Company: Offers a CTC above ₹X LPA.",
      "Super Dream Company: Offers a CTC above ₹Y LPA.",
      "Students placed in a dream company may apply only for super dream companies (if eligible), based on placement cell’s discretion."
    ]
  },
  {
    title: "Interview Etiquette",
    points: [
      "Students must attend all interviews and pre-placement talks in formal attire.",
      "Any form of misconduct or unprofessional behavior will lead to disqualification from the placement process."
    ]
  },
  {
    title: "Withdrawal Policy",
    points: [
      "Once applied, a student cannot withdraw from the process unless there is a valid reason approved by the placement officer."
    ]
  },
  {
    title: "Blacklisting Criteria",
    points: [
      "Students may be blacklisted if:",
      "- They miss interviews without prior notice.",
      "- They provide false information in resumes/documents.",
      "- They violate placement cell rules repeatedly."
    ]
  },
  {
    title: "Communication",
    points: [
      "All official communication will be via college email.",
      "Students are responsible for checking updates regularly."
    ]
  }
];

const PlacementRulesPage = () => {
  return (
    <Box sx={{ p: 4, maxWidth: "900px", mx: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        📋 General Rules & Regulations – Placement Cell
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {rules.map((section, index) => (
        <Card key={index} variant="outlined" sx={{ mb: 3, borderRadius: 3, boxShadow: 3, backgroundColor: "#f9fafb" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
              {section.title}
            </Typography>
            <ul style={{ paddingLeft: "1.5rem", marginTop: 8, lineHeight: 1.8 }}>
              {section.points.map((point, idx) => (
                <li key={idx} style={{ fontSize: "1rem" }}>{point}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PlacementRulesPage;