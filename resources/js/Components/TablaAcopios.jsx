import { router } from '@inertiajs/react';

// MODIFICA ESTA LÍNEA: Añadimos onEditar
export default function TablaAcopios({ acopios, onEditar }) {
    
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
            router.delete(route('acopios.destroy', id));
        }
    };

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Historial de Ingresos</h3>
            <table className="min-w-full text-left text-sm font-light">
                {/* ... (el thead se queda igual) ... */}
                <thead className="border-b font-medium bg-gray-100">
                    <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Material</th>
                        <th className="px-6 py-4">Peso (Kg)</th>
                        <th className="px-6 py-4">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {acopios.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                Aún no hay registros.
                            </td>
                        </tr>
                    ) : (
                        acopios.map((acopio) => (
                            <tr key={acopio.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{acopio.id}</td>
                                <td className="px-6 py-4 font-semibold">{acopio.material}</td>
                                <td className="px-6 py-4">{acopio.peso_kg} kg</td>
                                <td className="px-6 py-4">
                                    {/* AÑADE ESTE BOTÓN DE EDITAR */}
                                    <button 
                                        onClick={() => onEditar(acopio)}
                                        className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                                    >
                                        Editar
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleDelete(acopio.id)}
                                        className="text-red-600 hover:text-red-800 font-medium"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}