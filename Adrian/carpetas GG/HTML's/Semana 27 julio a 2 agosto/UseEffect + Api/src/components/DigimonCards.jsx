import React from "react";

export const DigimonCards = ({ digimonData }) => {
    if (!digimonData) {
        return (
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-center h-72">
                <span className="text-gray-400 animate-pulse font-medium text-sm">Cargando...</span>
            </div>
        )
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col justify-between h-72 hover:shadow-md transition duration-200">
            {/* Contenedor cuadrado para la imagen */}
            <div className="w-full h-40 bg-gray-50 rounded-lg flex items-center justify-center p-3 border border-gray-100">
                {digimonData.images?.[0]?.href ? (
                    <img 
                        src={digimonData.images[0].href}
                        alt={digimonData.name}
                        className="h-full object-contain" 
                    />
                ) : (
                    <span className="text-xs text-gray-400">Sin imagen</span>
                )}
            </div>

            {/* Información del Digimon */}
            <div className="mt-3 text-center">
                <span className="text-xs font-mono text-gray-400 block mb-1">ID: #{digimonData.id}</span>
                <h2 className="text-base font-bold text-gray-800 capitalize truncate">
                    {digimonData.name}
                </h2>
                {digimonData.types?.[0] && (
                    <span className="inline-block mt-1.5 text-[10px] bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded font-semibold uppercase tracking-wider">
                        {digimonData.types[0].type}
                    </span>
                )}
            </div>
        </div>
    )
}