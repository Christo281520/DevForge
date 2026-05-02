import React, { useState } from "react"
import "../components/css/python.css"

const PythonLearning = () => {

  const [active, setActive] = useState("Basics")

  const topics = [
    "Basics",
    "Variables",
    "Data Types",
    "Operators",
    "Strings",
    "Lists",
    "Tuples",
    "Sets",
    "Dictionaries",
    "Functions",
    "OOP",
    "File Handling",
    "Error Handling"
  ]

  const content = {

    Basics: {
      desc: "Python is a high-level, interpreted programming language known for its simplicity and readability. It is widely used in web development, data science, artificial intelligence, and automation. Python uses indentation instead of braces, making code clean and easy to understand. It has a huge community and many libraries. Beginners prefer Python due to its easy syntax.",
      code: `print("Hello World")`,
      example: "Output: Hello World"
    },

    Variables: {
      desc: "Variables store data values in Python. You don’t need to declare their type explicitly because Python is dynamically typed. Variable names should be meaningful and follow naming rules. You can assign different types of values to variables. Python automatically detects the type.",
      code: `x = 10\ny = "Hello"\nz = 3.5`,
      example: "x is int, y is string, z is float"
    },

    "Data Types": {
      desc: "Python supports multiple data types such as integers, floats, strings, and booleans. Each data type is used to store specific kinds of data. You can check types using type(). Complex data types like lists and dictionaries are also available. Understanding data types is important for writing correct programs.",
      code: `a = 10\nb = 2.5\nc = "text"\nd = True\nprint(type(a))`,
      example: "Output: <class 'int'>"
    },

    Operators: {
      desc: "Operators are used to perform operations on variables. Python supports arithmetic, comparison, and logical operators. Arithmetic operators include +, -, *, /. Logical operators include and, or, not. These help in decision making and calculations.",
      code: `a = 5 + 2\nb = 5 > 2\nc = True and False`,
      example: "a = 7, b = True, c = False"
    },

    Strings: {
      desc: "Strings are sequences of characters used to store text. They can be enclosed in single or double quotes. Strings support indexing and slicing. Built-in methods like upper() and lower() are useful. Strings are immutable.",
      code: `s = "Hello"\nprint(s[0])\nprint(s.upper())`,
      example: "Output: H, HELLO"
    },

    Lists: {
      desc: "Lists are ordered collections that can store multiple values. They are mutable, meaning you can modify them. Lists allow duplicate values. You can add items using append() and remove items easily. Lists are widely used in Python.",
      code: `lst = [1,2,3]\nlst.append(4)\nprint(lst)`,
      example: "Output: [1,2,3,4]"
    },

    Tuples: {
      desc: "Tuples are similar to lists but cannot be modified. They are immutable and faster than lists. Tuples are useful for storing constant data. They are defined using parentheses.",
      code: `t = (1,2,3)\nprint(t[0])`,
      example: "Output: 1"
    },

    Sets: {
      desc: "Sets store unique values and do not allow duplicates. They are unordered collections. Sets are useful for removing duplicates and performing operations like union and intersection.",
      code: `s = {1,2,2,3}\nprint(s)`,
      example: "Output: {1,2,3}"
    },

    Dictionaries: {
      desc: "Dictionaries store key-value pairs. Each key is unique. They are useful for structured data. You can access values using keys. Dictionaries are widely used in real applications.",
      code: `d = {"name":"John","age":20}\nprint(d["name"])`,
      example: "Output: John"
    },

    Functions: {
      desc: "Functions are reusable blocks of code. They help reduce repetition. Functions can take inputs and return outputs. Python uses the def keyword to define functions.",
      code: `def add(a,b):\n  return a+b`,
      example: "add(2,3) → 5"
    },

    OOP: {
      desc: "Object-Oriented Programming allows you to organize code using classes and objects. A class is a blueprint for objects. OOP supports inheritance and encapsulation. It helps in building scalable applications.",
      code: `class Person:\n  def __init__(self,name):\n    self.name = name`,
      example: "Creates an object with name property"
    },

    "File Handling": {
      desc: "File handling allows you to read and write files. Python provides open() function. You can read, write, or append data. Always close files after use.",
      code: `f = open("file.txt","r")\nprint(f.read())`,
      example: "Reads file content"
    },

    "Error Handling": {
      desc: "Error handling prevents program crashes. Python uses try-except blocks. It helps manage runtime errors gracefully. You can also use finally for cleanup.",
      code: `try:\n  x = 10/0\nexcept:\n  print("Error")`,
      example: "Output: Error"
    }

  }

  return (
    <div className="python-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h3>Python</h3>

        {topics.map((t, i) => (
          <div
            key={i}
            className={`topic ${active === t ? "active" : ""}`}
            onClick={() => setActive(t)}
          >
            {t}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="content">

        <h2>{active}</h2>

        <p>{content[active].desc}</p>

        <pre className="code">
{content[active].code}
        </pre>

        <div className="example">
          {content[active].example}
        </div>

      </div>

    </div>
  )
}

export default PythonLearning