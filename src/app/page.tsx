import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <span className="text-sm font-semibold tracking-tight">Personal Site</span>
          <nav className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              首页
            </Link>
            <Link
              href="/about/"
              className="hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              关于
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
        <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
          Next.js · GitHub Pages
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          你好，这是你的个人站
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          编辑 <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-sm dark:bg-zinc-800">src/app/page.tsx</code>{" "}
          开始写内容。推送到 GitHub 后，Actions 会自动构建并发布到 Pages。
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="https://github.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            创建 GitHub 仓库
          </a>
          <Link
            href="/about/"
            className="inline-flex h-11 items-center rounded-full border border-zinc-300 px-5 text-sm font-medium transition hover:bg-white dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            部署说明
          </Link>
        </div>
      </main>

      <footer className="border-t border-zinc-200/80 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800">
        © {new Date().getFullYear()} Personal Site
      </footer>
    </div>
  );
}
