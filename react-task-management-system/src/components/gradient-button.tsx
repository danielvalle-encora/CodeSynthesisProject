'use client'

import { ArrowRight } from "lucide-react"

export function GradientButton() {
  return (
    <button
      className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-white text-blue-900 font-semibold flex items-center justify-center space-x-2 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-opacity"
      aria-label="Next"
    >
      <span>Next</span>
      <ArrowRight className="w-5 h-5" />
    </button>
  )
}