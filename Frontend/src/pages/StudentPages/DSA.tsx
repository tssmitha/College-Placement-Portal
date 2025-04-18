import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Typography,
  LinearProgress,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Divider,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const questionCategories = [
  {
    topic: "Sorting Techniques",
    questions: [
      { id: 1, title: "Selection Sorting", url: "https://www.geeksforgeeks.org/problems/selection-sort/1" },
      { id: 2, title: "Bubble Sort", url: "https://www.geeksforgeeks.org/problems/bubble-sort/1" },
      { id: 3, title: "Insertion Sort", url: "https://www.geeksforgeeks.org/problems/insertion-sort/0" },
      { id: 4, title: "Merge Sort", url: "https://www.geeksforgeeks.org/problems/merge-sort/1" },
    ],
  },
  {
    topic: "Linked List",
    questions: [
      { id: 5, title: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/" },
      { id: 6, title: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
      { id: 7, title: "Detect a cycle in Linked List", url: "https://leetcode.com/problems/linked-list-cycle/" },
      { id: 8, title: "Merge K sorted arrays", url: "https://www.naukri.com/code360/problems/merge-k-sorted-arrays_975379" },
      { id: 9, title: "Remove Nth Node From End of List", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
    ],
  },
  {
    topic: "Arrays",
    questions: [
        {id:10,title:"next-permutation",url:"https://leetcode.com/problems/next-permutation/description/"},
      { id: 11, title: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
      { id: 12, title: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      {id: 13,title:"Kadane's Algorithm", url:"https://leetcode.com/problems/maximum-subarray/description/"},
      {id: 14,title:"Majority Element (n/3 times) ", url:"https://leetcode.com/problems/majority-element-ii/description/"},
      {id: 15,title:"Count number of subarrays with given xor K", url:"https://www.interviewbit.com/problems/subarray-with-given-xor/"},
      {id: 16,title:"Find the repeating and missing number", url:"https://www.geeksforgeeks.org/problems/find-missing-and-repeating2512/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=find-missing-and-repeating"},
      {id: 17,title:"Count Inversions", url:"https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=inversion-of-array"},
      {id: 18,title:"Maximum Product Subarray", url:"https://leetcode.com/problems/maximum-product-subarray/description/"},
      {id: 19,title:"Pascal's Triangle", url:"https://leetcode.com/problems/pascals-triangle/"},
    ],
  },
  {
    topic: "Stack",
    questions: [
      { id: 20, title: "Next Greater Element", url: "https://leetcode.com/problems/next-greater-element-i/description/" },
      { id: 21, title: "Trapping Rainwater", url: "https://leetcode.com/problems/trapping-rain-water/description/" },
    ],
  },
  {
    topic: "Graph",
    questions: [
      { id: 22, title: "Pacific Atlantic Water Flow", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
      { id: 23, title: "Number of islands(Do in Grid and Graph Both", url: "https://leetcode.com/problems/number-of-islands/description//" },
      { id: 24, title: "Longest Consecutive Sequence", url: "https://leetcode.com/problems/longest-consecutive-sequence/description//" },
      { id: 25, title: "Alien dictionary", url: "https://leetcode.com/problems/alien-dictionary/editorial/" },
      { id: 26, title: "Graph Valid Treey", url: "https://leetcode.com/problems/graph-valid-tree/solutions/" },
    ],
  },
  {
    topic: "binary",
    questions: [
      { id: 27, title: "Sum of Two Integers", url: "https://leetcode.com/problems/sum-of-two-integers/description/" },
      { id: 28, title: "Number of 1 Bits", url: "https://leetcode.com/problems/number-of-1-bits/" },
      { id: 29, title: "Counting Bits", url: "https://leetcode.com/problems/counting-bits/description/" },
      { id: 30, title: "Find missing number in an array", url: "https://leetcode.com/problems/missing-number/" },
      { id: 31, title: "Reverse Bits", url: "https://leetcode.com/problems/reverse-bits/description/" },
    ],
  },
  {
    topic: "String",
    questions: [
      { id: 32, title: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/description/" },
      { id: 33, title: "longest repeating character replacement", url: "https://leetcode.com/problems/longest-repeating-character-replacement/description/" },
      { id: 34, title: "Minimum Window Substring", url: "https://leetcode.com/problems/minimum-window-substring/description/" },
      { id: 35, title: "Check for Anagrams", url: "https://leetcode.com/problems/valid-anagram/description/" },
    ]
    } ,
    {
      topic: "Dynamic Programming",
      questions: [
        { id: 36, title: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/" },
        { id: 37, title: "House Robber", url: "https://leetcode.com/problems/house-robber/" },
        { id: 38, title: "Coin change", url: "https://leetcode.com/problems/coin-change/description/" },
        { id: 39, title: "Longest Increasing Subsequence", url: "https://leetcode.com/problems/longest-increasing-subsequence/description/" },
        { id: 40, title: "Longest Common Subsequence", url: "https://leetcode.com/problems/longest-common-subsequence/description/" },
        { id: 41, title: "Word Break", url: "https://leetcode.com/problems/word-break/description/" },
        { id: 42, title: "Grid Unique Paths", url: "https://leetcode.com/problems/unique-paths/" },
      ],
    },
    {
      topic: "Tree",
      questions: [
        { id: 43, title: "Height of a Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/description/" },
        { id: 44, title: "Check if two trees are identical or not", url: "https://leetcode.com/problems/same-tree/description/" },
        { id: 45, title: "Invert/Flip Binary Tree (Create)", url: "https://leetcode.com/problems/invert-binary-tree/description/" },
        { id: 46, title: "Maximum path sum", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/description/" },
        { id: 47, title: "Level order Traversal / Level order traversal in spiral form", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/description/"}
      ],},
      {
          topic: "Heap",
          questions: [
            { id: 48, title: "K most frequent elements", url: "https://leetcode.com/problems/top-k-frequent-elements/description/" },
            { id: 49, title: "Find Median from Data Stream", url: "https://leetcode.com/problems/find-median-from-data-stream/description/" },
            { id: 50, title: "Task Scheduler", url: "https://leetcode.com/problems/task-scheduler/" },
          ]
      }  
];

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  "&:before": {
    display: "none",
  },
}));

const LeetCodeProgress = () => {
  const [solvedQuestions, setSolvedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("solvedQuestions") || "[]");
    setSolvedQuestions(saved);
  }, []);

  const handleToggle = (id: number) => {
    const updated = solvedQuestions.includes(id)
      ? solvedQuestions.filter((q) => q !== id)
      : [...solvedQuestions, id];
    setSolvedQuestions(updated);
    localStorage.setItem("solvedQuestions", JSON.stringify(updated));
  };

  const totalQuestions = questionCategories.reduce((sum, cat) => sum + cat.questions.length, 0);
  const progressPercent = (solvedQuestions.length / totalQuestions) * 100;

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          📘 DSA Tracker
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          Track your solved DSA questions. Click on the title to open the problem.
        </Typography>

        <Box sx={{ width: "100%", my: 3 }}>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Overall Progress: {solvedQuestions.length} / {totalQuestions}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{ height: 10, borderRadius: 5 }}
            color="success"
          />
        </Box>

        {questionCategories.map((category) => {
          const solvedInCategory = category.questions.filter((q) =>
            solvedQuestions.includes(q.id)
          ).length;

          const categoryProgress = (solvedInCategory / category.questions.length) * 100;

          return (
            <StyledAccordion key={category.topic}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {category.topic}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={categoryProgress}
                    sx={{ mt: 1, height: 8, borderRadius: 5 }}
                    color="primary"
                  />
                  <Typography variant="caption" sx={{ mt: 0.5, color: "text.secondary" }}>
                    {solvedInCategory} / {category.questions.length} solved
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {category.questions.map((q) => (
                    <ListItem
                      key={q.id}
                      button
                      component="a"
                      href={q.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        transition: "all 0.2s",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={solvedQuestions.includes(q.id)}
                          onClick={(e) => {
                            e.preventDefault();
                            handleToggle(q.id);
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={q.title}
                        primaryTypographyProps={{ fontSize: "0.95rem" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </StyledAccordion>
          );
        })}

        <Divider sx={{ mt: 4 }} />
        <Typography variant="caption" color="text.disabled" sx={{ mt: 2, display: "block", textAlign: "center" }}>
          Progress is saved locally in your browser.
        </Typography>
      </Paper>
    </Container>
  );
};

export default LeetCodeProgress;
