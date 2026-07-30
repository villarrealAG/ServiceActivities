import React, { useState } from 'react'

export const ResearchCard = ({ title, image, text, code }) => {
  const [showText, setShowText] = useState(false)

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-200">
      <div>
        {image && (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-36 object-cover rounded-lg mb-4 border border-gray-100" 
          />
        )}
        <h2 className="text-base font-bold text-gray-800 mb-2">{title}</h2>
        
        {showText && (
          <div className="mt-3 space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-3">
            <p className="leading-relaxed whitespace-pre-line">{text}</p>
            {code && (
              <pre className="bg-gray-900 text-gray-100 p-3.5 rounded-lg overflow-x-auto text-xs font-mono leading-normal">
                <code>{code}</code>
              </pre>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => setShowText(!showText)}
        className="w-full mt-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100/80 rounded-lg transition duration-200"
      >
        {showText ? 'Ocultar info' : 'Saber más'}
      </button>
    </div>
  )
}
