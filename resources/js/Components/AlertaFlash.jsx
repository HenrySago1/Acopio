import { usePage } from '@inertiajs/react'; // Nos permite leer variables globales
import { useEffect, useState } from 'react';

export default function AlertaFlash() {
    // Extraemos la variable "flash" que configuramos en el Middleware de Laravel
    const { flash } = usePage().props;
    
    // Estado para controlar si mostramos u ocultamos la alerta
    const [visible, setVisible] = useState(false);

    // useEffect vigila los cambios. Si llega un nuevo mensaje "flash", se ejecuta.
    useEffect(() => {
        if (flash.success) {
            setVisible(true);
            
            // Programamos que desaparezca en 3000 milisegundos (3 segundos)
            const timer = setTimeout(() => setVisible(false), 3000);
            
            // Limpieza del temporizador
            return () => clearTimeout(timer);
        }
    }, [flash]);

    // Si no está visible, no renderizamos nada (invisible en la pantalla)
    if (!visible) return null;

    return (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-sm transition-all duration-500">
            <div className="flex items-center">
                {/* Un pequeño ícono de check usando SVG */}
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="font-medium">{flash.success}</p>
            </div>
        </div>
    );
}