---
title: "Go 语言入门"
pubDate: 2024-01-01
---

# Go 语言入门

Go 是一种开源的编程语言，由 Google 开发。

## 特点

- 简洁的语法
- 强大的并发支持
- 快速的编译速度
- 丰富的标准库

## Hello World

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

## 并发编程

Go 的 goroutine 和 channel 使得并发编程变得简单。

```go
func main() {
    ch := make(chan string)
    
    go func() {
        ch <- "Hello from goroutine"
    }()
    
    msg := <-ch
    fmt.Println(msg)
}
```

Go 是一门值得学习的现代编程语言。