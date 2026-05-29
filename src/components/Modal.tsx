import { useEffect } from 'react'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

export function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/35 p-0 backdrop-blur-[2px] md:items-center md:p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="animate-slide-up h-[100dvh] w-full overflow-y-auto rounded-none bg-[#fdf8ef] shadow-[0_30px_90px_rgba(26,26,26,0.2)] md:h-auto md:max-h-[90vh] md:max-w-[520px] md:rounded-[28px]">
        {children}
      </div>
    </div>
  )
}