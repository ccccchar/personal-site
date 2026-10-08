import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Personal Site
          </Link>
          <nav className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              首页
            </Link>
            <span className="text-zinc-900 dark:text-zinc-100">关于</span>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 prose-zinc dark:prose-invert">
        <h1 className="text-3xl font-semibold tracking-tight">部署到 GitHub Pages</h1>
        <ol className="mt-8 list-decimal space-y-4 pl-5 text-zinc-600 dark:text-zinc-400">
          <li>
            在 GitHub 新建仓库（例如 <code className="text-sm">personal-site</code>），把本目录推上去。
          </li>
          <li>
            仓库 <strong>Settings → Pages → Build and deployment</strong> 选{" "}
            <strong>GitHub Actions</strong>。
          </li>
          <li>
            推送 <code className="text-sm">main</code> 分支，等待 workflow 跑完。访问地址为{" "}
            <code className="text-sm">https://&lt;用户名&gt;.github.io/&lt;仓库名&gt;/</code>
            （若仓库名为 <code className="text-sm">用户名.github.io</code> 则在根路径）。
          </li>
          <li>
            本地开发默认根路径；若要和线上子路径一致，执行{" "}
            <code className="text-sm">npm run dev:pages</code>。
          </li>
        </ol>
        <p className="mt-10">
          <Link href="/" className="text-violet-600 hover:underline dark:text-violet-400">
            ← 返回首页
          </Link>
        </p>
      </main>
    </div>
  );
}
