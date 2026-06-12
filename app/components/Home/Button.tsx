"use client"

import { useEffect, useState } from "react"
import { FaMobileAlt } from "react-icons/fa"

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPopup(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const dismiss = () => {
    setHiding(true)
    setTimeout(() => {
      setShowPopup(false)
      setHiding(false)
    }, 300)
  }

  const installApp = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const result = await deferredPrompt.userChoice
    if (result.outcome === "accepted") {
      console.log("User installed app")
    }
    setDeferredPrompt(null)
    dismiss()
  }

  if (!showPopup) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          hiding ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Popup Card */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm
          bg-white rounded-2xl shadow-2xl overflow-hidden
          transition-all duration-300
          ${hiding ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"}
        `}
        style={{
          boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)"
        }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-[#bfb09d]" />

        <div className="px-6 py-5">
          {/* Icon + Text */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#bfb09d] flex items-center justify-center shadow-md">
              <FaMobileAlt className="text-white text-xl" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#a8895f] mb-0.5">
                Add to Home Screen
              </p>
              <h2 className="text-gray-900 font-bold text-base leading-tight">
                DreamLand Hotel
              </h2>
              <p className="text-gray-400 text-xs mt-0.5">
                Fast access, offline support & more
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mb-4" />

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={dismiss}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium
                hover:bg-gray-50 active:scale-95 transition-all duration-150"
            >
              Not Now
            </button>
            <button
              onClick={installApp}
              className="flex-1 py-2.5 rounded-xl bg-[#bfb09d] text-white text-sm font-medium
                hover:bg-[#a8895f] active:scale-95 transition-all duration-150"
            >
              Install
            </button>
          </div>
        </div>
      </div>
    </>
  )
}