export const problemDetails = {

  "Two Sum": {
    description: "Find two indices such that their values add up to target.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]" },
      { input: "[3,2,4], 6", expected: "[1,2]" }
    ]
  },

  "Palindrome Number": {
    description: "Check whether an integer is a palindrome.",
    examples: [
      { input: "x = 121", output: "true" },
      { input: "x = -121", output: "false" }
    ],
    testCases: [
      { input: "121", expected: "true" },
      { input: "-121", expected: "false" }
    ]
  },

  "Valid Parentheses": {
    description: "Check if parentheses are valid.",
    examples: [
      { input: "s = '()[]{}'", output: "true" },
      { input: "s = '(]'", output: "false" }
    ],
    testCases: [
      { input: "()[]{}", expected: "true" },
      { input: "(]", expected: "false" }
    ]
  },

  "Merge Two Sorted Lists": {
    description: "Merge two sorted linked lists.",
    examples: [
      { input: "l1 = [1,2,4], l2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "l1 = [], l2 = [0]", output: "[0]" }
    ],
    testCases: [
      { input: "[1,2,4], [1,3,4]", expected: "[1,1,2,3,4,4]" },
      { input: "[], [0]", expected: "[0]" }
    ]
  },

  "Longest Substring Without Repeating Characters": {
    description: "Find longest substring without repeating characters.",
    examples: [
      { input: "s = 'abcabcbb'", output: "3" },
      { input: "s = 'bbbbb'", output: "1" }
    ],
    testCases: [
      { input: "abcabcbb", expected: "3" },
      { input: "bbbbb", expected: "1" }
    ]
  },

  "3Sum": {
    description: "Find triplets that sum to zero.",
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,1],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" }
    ],
    testCases: [
      { input: "[-1,0,1,2,-1,-4]", expected: "[[-1,-1,1],[-1,0,1]]" },
      { input: "[0,1,1]", expected: "[]" }
    ]
  },

  "Container With Most Water": {
    description: "Find max water container.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" }
    ],
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expected: "49" },
      { input: "[1,1]", expected: "1" }
    ]
  },

  "Median of Two Sorted Arrays": {
    description: "Find median of two arrays.",
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.0" },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5" }
    ],
    testCases: [
      { input: "[1,3], [2]", expected: "2.0" },
      { input: "[1,2], [3,4]", expected: "2.5" }
    ]
  },

  "Merge k Sorted Lists": {
    description: "Merge k sorted lists.",
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
      { input: "lists = []", output: "[]" }
    ],
    testCases: [
      { input: "[[1,4,5],[1,3,4],[2,6]]", expected: "[1,1,2,3,4,4,5,6]" },
      { input: "[]", expected: "[]" }
    ]
  },

  "Trapping Rain Water": {
    description: "Calculate trapped rain water.",
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" }
    ],
    testCases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6" },
      { input: "[4,2,0,3,2,5]", expected: "9" }
    ]
  }

}