package main

import (
	"strings"
	"syscall/js"
)

// splitText 将文本分割成单词
// splitText splits text into words
func splitText(text string) []string {
	// 移除不必要的符号并转换为小写
	// Remove unnecessary symbols and convert to lowercase
	text = strings.ToLower(text)
	text = strings.ReplaceAll(text, ".", "")
	text = strings.ReplaceAll(text, ",", "")
	text = strings.ReplaceAll(text, "!", "")
	text = strings.ReplaceAll(text, "?", "")
	text = strings.ReplaceAll(text, ":", "")
	text = strings.ReplaceAll(text, ";", "")

	// 按空格分割文本
	// Split text by spaces
	words := strings.Fields(text)
	return words
}

// countWords 统计单词出现的次数
// countWords counts the occurrences of each word
func countWords(words []string) map[string]int {
	wordCount := make(map[string]int)

	for _, word := range words {
		wordCount[word]++
	}

	return wordCount
}

// splitAndCountWrapper 是一个包装函数，用于从JavaScript调用
// splitAndCountWrapper is a wrapper function for calling from JavaScript
func splitAndCountWrapper() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if len(args) != 1 {
			return "Invalid number of arguments"
		}

		text := args[0].String()
		words := splitText(text)
		result := countWords(words)

		// 转换结果为JavaScript对象
		// Convert result to JavaScript object
		jsResult := js.Global().Get("Object").New()
		for word, count := range result {
			jsResult.Set(word, count)
		}

		return jsResult
	})
}

// splitOnlyWrapper 仅执行分词功能
// splitOnlyWrapper only performs the splitting functionality
func splitOnlyWrapper() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if len(args) != 1 {
			return "Invalid number of arguments"
		}

		text := args[0].String()
		words := splitText(text)

		// 转换结果为JavaScript数组
		// Convert result to JavaScript array
		jsArray := js.Global().Get("Array").New(len(words))
		for i, word := range words {
			jsArray.SetIndex(i, word)
		}

		return jsArray
	})
}

func main() {
	c := make(chan struct{}, 0)

	// 注册函数到JavaScript
	// Register functions to JavaScript
	js.Global().Set("splitAndCountGo", splitAndCountWrapper())
	js.Global().Set("splitTextGo", splitOnlyWrapper())

	<-c
}
