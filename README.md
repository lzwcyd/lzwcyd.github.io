# wood的个人博客

基于 Astro 构建的个人博客，从 VuePress 迁移而来。

## 技术栈

- **框架**: Astro 4.x
- **语言**: TypeScript
- **样式**: CSS
- **部署**: GitHub Pages

## 项目结构

```
src/
├── content/           # 内容集合
│   ├── java/         # Java 技术文章
│   ├── go/           # Go 语言文章
│   ├── travel/       # 旅行记录
│   ├── read/         # 阅读笔记
│   └── idea/         # 想法/观点
├── layouts/          # 布局组件
├── pages/            # 页面
└── styles/           # 样式文件
```

## 开发命令

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务器
npm run build      # 构建生产版本
npm run preview    # 预览生产构建
```

## 部署

项目配置为自动部署到 GitHub Pages，推送到 main 分支后会自动构建和部署。

## 迁移说明

从 VuePress 2.0 迁移到 Astro 4.x，主要变化：

1. **框架升级**: VuePress → Astro
2. **内容管理**: 使用 Astro Content Collections
3. **构建优化**: 更快的构建速度
4. **现代特性**: 支持 Islands Architecture

## 文章格式

每篇文章需要包含 frontmatter：

```yaml
---
title: "文章标题"
pubDate: 2024-01-01
---
```

## 分类

- **Java**: Java 技术文章
- **Go**: Go 语言文章
- **Travel**: 旅行记录
- **Read**: 阅读笔记
- **Idea**: 想法/观点