# Word Count with TypeScript and Go WebAssembly

A simple word count application that demonstrates the integration of TypeScript with Go WebAssembly. The application allows you to input text, split it into words, and count the occurrences of each word using three different processing methods:

1. Split and count using TypeScript
2. Split and count using Go WebAssembly
3. Split using Go WebAssembly, count using TypeScript

This project provides a practical comparison of the performance between TypeScript and Go WebAssembly for text processing tasks.

## Project Structure

```
├── index.html            # Main HTML file with the user interface
├── package.json          # Node.js package configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.js        # Vite build configuration
├── .gitignore            # Git ignore file
├── go/                   # Go code directory
│   ├── go.mod            # Go module definition
│   └── wasm/             # WebAssembly-specific Go code
│       └── wordcount.go  # Go implementation of word counting functions
├── public/               # Public assets directory
│   └── wasm_exec.js      # Go WebAssembly loader (provided by Go)
└── src/                  # Source code directory
    ├── main.ts           # Main TypeScript application code
    ├── style.css         # CSS styles
    └── vite-env.d.ts     # TypeScript declaration file
```

## Prerequisites

- Node.js and npm
- Go (1.16 or later)
- A modern web browser that supports WebAssembly

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd wordcount-go-awsm
   ```

2. Install the Node.js dependencies:
   ```
   npm install
   ```

3. Build the Go WebAssembly file:
   ```
   npm run build-wasm
   ```

4. Copy the Go WebAssembly loader file (if it doesn't exist yet):
   ```
   npm run copy-wasm-exec
   ```

## Development

Start the development server:
```
npm run dev
```

## Building for Production

Build the application for production:
```
npm run build
```

## Features

- **Text Input**: Enter any text in the provided text area
- **Processing Methods**:
  - **Split & Count by TypeScript**: Uses TypeScript for both splitting text into words and counting occurrences
  - **Split & Count by Go**: Uses Go WebAssembly for both splitting text into words and counting occurrences
  - **Split by Go, Count by Go**: Uses Go WebAssembly for splitting text into words, and TypeScript for counting occurrences
- **Results Display**: Shows the count of each word in the input text
- **Performance Metrics**: Displays the execution time for each processing method

## Technical Implementation

### TypeScript Implementation

The TypeScript implementation uses regular expressions to split the text by spaces and punctuation, then counts word occurrences using a JavaScript object as a dictionary.

### Go WebAssembly Implementation

The Go implementation exports two main functions to JavaScript:
- `splitAndCountGo`: Splits text into words and counts occurrences
- `splitTextGo`: Only splits text into words, returning an array

These functions are compiled to WebAssembly and called from the TypeScript code.

## License

[Apache License 2.0](LICENSE)