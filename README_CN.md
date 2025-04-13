# TypeScript 与 Go WebAssembly 实现的单词计数应用

这是一个简单的单词计数应用程序，展示了 TypeScript 与 Go WebAssembly 的集成。该应用程序允许您输入文本，将其分割成单词，并使用三种不同的处理方法统计每个单词出现的次数：

1. 使用 TypeScript 分词和计数
2. 使用 Go WebAssembly 分词和计数
3. 使用 Go WebAssembly 分词，使用 TypeScript 计数

该项目提供了 TypeScript 和 Go WebAssembly 在文本处理任务上的性能对比。

## 项目结构

```
├── index.html            # 包含用户界面的主HTML文件
├── package.json          # Node.js 包配置
├── tsconfig.json         # TypeScript 配置
├── vite.config.js        # Vite 构建配置
├── .gitignore            # Git 忽略文件
├── go/                   # Go 代码目录
│   ├── go.mod            # Go 模块定义
│   └── wasm/             # WebAssembly 特定的 Go 代码
│       └── wordcount.go  # 单词计数功能的 Go 实现
├── public/               # 公共资源目录
│   └── wasm_exec.js      # Go WebAssembly 加载器（由 Go 提供）
└── src/                  # 源代码目录
    ├── main.ts           # 主要 TypeScript 应用代码
    ├── style.css         # CSS 样式
    └── vite-env.d.ts     # TypeScript 声明文件
```

## 前置要求

- Node.js 和 npm
- Go（1.16 或更高版本）
- 支持 WebAssembly 的现代网络浏览器

## 安装

1. 克隆仓库：
   ```
   git clone <仓库地址>
   cd wordcount-go-awsm
   ```

2. 安装 Node.js 依赖：
   ```
   npm install
   ```

3. 构建 Go WebAssembly 文件：
   ```
   npm run build-wasm
   ```

4. 复制 Go WebAssembly 加载器文件（如果尚不存在）：
   ```
   npm run copy-wasm-exec
   ```

## 开发

启动开发服务器：
```
npm run dev
```

## 生产构建

为生产环境构建应用程序：
```
npm run build
```

## 特点

- **文本输入**：在提供的文本区域中输入任意文本
- **处理方法**：
  - **使用 TypeScript 分词和计数**：使用 TypeScript 分词和统计单词出现次数
  - **使用 Go 分词和计数**：使用 Go WebAssembly 分词和统计单词出现次数
  - **使用 Go 分词，使用 Go 计数**：使用 Go WebAssembly 分词，使用 TypeScript 统计单词出现次数
- **结果显示**：显示输入文本中每个单词的计数
- **性能指标**：显示每种处理方法的执行时间

## 技术实现

### TypeScript 实现

TypeScript 实现使用正则表达式按空格和标点符号分割文本，然后使用 JavaScript 对象作为字典计数单词出现次数。

### Go WebAssembly 实现

Go 实现向 JavaScript 导出两个主要函数：
- `splitAndCountGo`：将文本分割成单词并统计出现次数
- `splitTextGo`：仅将文本分割成单词，返回一个数组

这些函数被编译成 WebAssembly，并从 TypeScript 代码中调用。

## 许可证

[Apache 许可证 2.0](LICENSE)