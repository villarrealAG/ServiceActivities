import React from "react";

export const DigimonCards = ({ digimonData, onDelete }) => {
    if (!digimonData) {
        return (
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-center h-72">
                <span className="text-slate-400 animate-pulse font-medium text-xs">Cargando...</span>
            </div>
        )
    }

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-sm hover:border-slate-300 transition duration-150">
            {/* Contenedor cuadrado para la imagen */}
            <div className="w-full h-36 bg-slate-50/60 rounded-lg flex items-center justify-center p-3 border border-slate-100">
                {digimonData.images?.[0]?.href ? (
                    <img 
                        src={digimonData.images[0].href}
                        alt={digimonData.name}
                        className="h-full object-contain" 
                    />
                ) : (
                    <span className="text-[11px] text-slate-400">Sin imagen</span>
                )}
            </div>

            {/* Información del Digimon */}
            <div className="mt-3 text-center flex-grow flex flex-col justify-between">
                <div>
                    <span className="text-[10px] font-mono text-slate-400 block mb-0.5">ID: #{digimonData.id}</span>
                    <h2 className="text-sm font-bold text-slate-800 capitalize truncate">
                        {digimonData.name}
                    </h2>
                    {digimonData.types?.[0] && (
                        <span className="inline-block mt-1 text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                            {digimonData.types[0].type}
                        </span>
                    )}
                </div>

                {onDelete && (
                    <button
                        onClick={() => onDelete(digimonData.id)}
                        className="mt-3.5 w-full py-1.5 text-xs font-semibold text-slate-500 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-100 rounded-lg transition duration-150 cursor-pointer"
                    >
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    )
}