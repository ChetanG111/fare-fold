
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

const contentDirectory = path.join(process.cwd(), 'content')

export interface MDXPost {
    slug: string
    meta: {
        title: string
        date: string
        description: string
        [key: string]: any
    }
    content: string
}

export async function getMDXFiles(dir: string): Promise<string[]> {
    const directory = path.join(contentDirectory, dir)
    if (!fs.existsSync(directory)) {
        return []
    }
    return fs.readdirSync(directory).filter((file) => path.extname(file) === '.mdx')
}

export async function getMDXData(dir: string, slug: string): Promise<MDXPost> {
    const filePath = path.join(contentDirectory, dir, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    return {
        slug,
        meta: {
            title: data.title || slug,
            date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
            description: data.description || '',
            ...data,
        },
        content,
    }
}

export async function getAllMDX(dir: string): Promise<MDXPost[]> {
    const files = await getMDXFiles(dir)
    const posts = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace(/\.mdx$/, '')
            return getMDXData(dir, slug)
        })
    )

    return posts.sort((a, b) => {
        if (a.meta.date && b.meta.date) {
            return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
        }
        return 0
    })
}
