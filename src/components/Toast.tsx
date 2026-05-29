interface ToastProps {
  message: string
}

export function Toast({ message }: ToastProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="animate-fade-in-up rounded-full border border-black/5 bg-[#1a1a1a] px-4 py-3 text-sm font-medium text-white shadow-[0_20px_50px_rgba(26,26,26,0.28)]">
        {message}
      </div>
    </div>
  )
}