import './style.css'

// 声明全局变量以访问Go WebAssembly导出的函数
// Declare global variables to access functions exported by Go WebAssembly
declare global {
  function splitAndCountGo(text: string): Record<string, number>;
  function splitTextGo(text: string): string[];
}

// 初始化WebAssembly
// Initialize WebAssembly
const initWebAssembly = async (): Promise<void> => {
  // 实例化Go WebAssembly环境
  // Instantiate Go WebAssembly environment
  const go = new window.Go();
  
  try {
    // 加载并实例化WebAssembly模块
    // Load and instantiate WebAssembly module
    const result = await WebAssembly.instantiateStreaming(
      fetch('/public/wordcount.wasm'),
      go.importObject
    );
    
    go.run(result.instance);
    console.log('WebAssembly已成功加载 (WebAssembly loaded successfully)');
  } catch (error) {
    console.error('加载WebAssembly时出错 (Error loading WebAssembly):', error);
  }
};

// TypeScript实现的分词和计数函数
// Tokenization and counting function implemented in TypeScript
const splitAndCountByTs = (text: string): Record<string, number> => {
  const startTime = performance.now();
  
  // 移除不必要的符号并转换为小写
  // Remove unnecessary symbols and convert to lowercase
  text = text.toLowerCase();
  text = text.replace(/[.,!?:;]/g, '');
  
  // 按空格分割文本
  // Split text by spaces
  const words = text.split(/\s+/);
  
  // 统计单词出现次数
  // Count word occurrences
  const wordCount: Record<string, number> = {};
  for (const word of words) {
    if (word) { // 跳过空字符串
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  }
  
  const endTime = performance.now();
  updateExecutionTime(endTime - startTime);
  
  return wordCount;
};

// 使用Go进行分词，使用TypeScript进行计数
// Use Go for tokenization and TypeScript for counting
const splitByGoCountByTs = (text: string): Record<string, number> => {
  const startTime = performance.now();
  
  // 使用Go进行分词
  // Use Go for tokenization
  const words = splitTextGo(text);
  
  // 使用TypeScript进行计数
  // Use TypeScript for counting
  const wordCount: Record<string, number> = {};
  for (const word of words) {
    if (word) { // 跳过空字符串
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  }
  
  const endTime = performance.now();
  updateExecutionTime(endTime - startTime);
  
  return wordCount;
};

// 使用Go进行分词和计数
// Use Go for both tokenization and counting
const splitAndCountByGo = (text: string): Record<string, number> => {
  const startTime = performance.now();
  
  // 调用Go WebAssembly函数执行分词和计数
  // Call Go WebAssembly function to perform tokenization and counting
  const wordCount = splitAndCountGo(text);
  
  const endTime = performance.now();
  updateExecutionTime(endTime - startTime);
  
  return wordCount;
};

// 更新执行时间显示
// Update execution time display
const updateExecutionTime = (time: number): void => {
  const executionTimeElement = document.getElementById('executionTime');
  if (executionTimeElement) {
    executionTimeElement.textContent = time.toFixed(2);
  }
};

// 显示结果
// Display results
const displayResults = (wordCount: Record<string, number>): void => {
  const resultDisplay = document.getElementById('resultDisplay');
  if (!resultDisplay) return;
  
  // 清空之前的结果
  // Clear previous results
  resultDisplay.innerHTML = '';
  
  // 创建结果表格
  // Create results table
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>单词 (Word)</th>
        <th>出现次数 (Count)</th>
      </tr>
    </thead>
    <tbody id="resultBody"></tbody>
  `;
  
  resultDisplay.appendChild(table);
  const resultBody = document.getElementById('resultBody');
  
  if (resultBody) {
    // 按字母顺序排序单词
    // Sort words alphabetically
    const sortedWords = Object.keys(wordCount).sort();
    
    for (const word of sortedWords) {
      const count = wordCount[word];
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${word}</td>
        <td>${count}</td>
      `;
      resultBody.appendChild(row);
    }
  }
};

// 事件处理
// Event handling
document.addEventListener('DOMContentLoaded', async () => {
  // 初始化WebAssembly
  // Initialize WebAssembly
  await initWebAssembly();
  
  // 获取DOM元素
  // Get DOM elements
  const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
  const countByTsButton = document.getElementById('countByTs');
  const countByGoButton = document.getElementById('countByGo');
  const splitByGoCountByTsButton = document.getElementById('splitByGoCountByTs');
  
  // 添加事件监听器
  // Add event listeners
  countByTsButton?.addEventListener('click', () => {
    const text = textInput.value;
    if (text) {
      const wordCount = splitAndCountByTs(text);
      displayResults(wordCount);
    }
  });
  
  countByGoButton?.addEventListener('click', () => {
    const text = textInput.value;
    if (text) {
      const wordCount = splitAndCountByGo(text);
      displayResults(wordCount);
    }
  });
  
  splitByGoCountByTsButton?.addEventListener('click', () => {
    const text = textInput.value;
    if (text) {
      const wordCount = splitByGoCountByTs(text);
      displayResults(wordCount);
    }
  });
});
