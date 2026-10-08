export function EmptyState({ message }: { message?: string }) {
  return (
    <p className="rounded-2xl border border-dashed border-white/10 py-12 text-center text-sm text-zinc-500">
      {message ?? "暂无内容"}
    </p>
  );
}
