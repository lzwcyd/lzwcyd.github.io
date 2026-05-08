#!/usr/bin/env python3
"""
将现有文章转换为 Astro Paper 主题格式
"""
import os
import re
from datetime import datetime
from pathlib import Path

# 源目录和目标目录
source_dir = Path("/Users/woodli/GitHub/lzwcyd.github.io/src.astro.backup/content")
target_dir = Path("/Users/woodli/GitHub/lzwcyd.github.io/src/data/blog")

# 确保目标目录存在
target_dir.mkdir(parents=True, exist_ok=True)

# 分类映射
category_mapping = {
    "java": ["java", "技术"],
    "go": ["go", "技术"],
    "travel": ["travel", "旅行"],
    "read": ["read", "阅读"],
    "idea": ["idea", "想法"]
}

def convert_frontmatter(old_content, category, filename):
    """转换 frontmatter 格式"""
    # 提取旧的 frontmatter
    match = re.match(r'^---\n(.*?)\n---\n', old_content, re.DOTALL)
    if not match:
        return None, None
    
    old_frontmatter = match.group(1)
    content_body = old_content[match.end():]
    
    # 解析旧的 frontmatter
    title = ""
    pub_date = ""
    
    for line in old_frontmatter.split('\n'):
        if line.startswith('title:'):
            title = line.split(':', 1)[1].strip().strip('"\'')
        elif line.startswith('pubDate:'):
            pub_date = line.split(':', 1)[1].strip()
    
    # 如果没有找到标题，使用文件名
    if not title:
        title = filename.replace('.md', '').replace('-', ' ').title()
    
    # 如果没有找到日期，使用当前日期
    if not pub_date:
        pub_date = datetime.now().strftime('%Y-%m-%d')
    
    # 转换日期格式
    try:
        if 'T' not in pub_date:
            pub_date = f"{pub_date}T00:00:00Z"
    except:
        pub_date = f"{datetime.now().strftime('%Y-%m-%d')}T00:00:00Z"
    
    # 生成 slug
    slug = filename.replace('.md', '')
    
    # 获取标签
    tags = category_mapping.get(category, ["others"])
    
    # 生成新的 frontmatter
    new_frontmatter = f"""---
author: woodli
pubDatetime: {pub_date}
modDatetime: 
title: "{title}"
slug: {slug}
featured: false
draft: false
tags:
{chr(10).join(f'  - {tag}' for tag in tags)}
description: "{title}"
---"""
    
    return new_frontmatter, content_body

def process_category(category_dir, category_name):
    """处理一个分类目录"""
    print(f"处理分类: {category_name}")
    
    if not category_dir.exists():
        print(f"目录不存在: {category_dir}")
        return
    
    for md_file in category_dir.glob("*.md"):
        print(f"  处理文件: {md_file.name}")
        
        # 读取文件内容
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 转换 frontmatter
        new_frontmatter, body = convert_frontmatter(content, category_name, md_file.name)
        
        if new_frontmatter is None:
            print(f"    跳过文件（无 frontmatter）: {md_file.name}")
            continue
        
        # 生成新内容
        new_content = f"{new_frontmatter}\n{body}"
        
        # 写入目标文件
        target_file = target_dir / md_file.name
        with open(target_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"    已创建: {target_file}")

def main():
    """主函数"""
    print("开始转换文章...")
    
    # 处理每个分类
    for category in ["java", "go", "travel", "read", "idea"]:
        category_dir = source_dir / category
        process_category(category_dir, category)
    
    print("转换完成！")

if __name__ == "__main__":
    main()