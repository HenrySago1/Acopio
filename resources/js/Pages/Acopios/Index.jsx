import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

// Fíjate que ahora recibimos "acopios" como parámetro (viene del Controlador de Laravel)
export default function Index({ auth, acopios }) {
    
    // El hook useForm maneja el estado de las variables y la petición a Laravel
    const { data, setData, post, processing, reset, errors } = useForm({
        material: 'PET',
        peso_kg: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hacemos la petición POST a la ruta que creamos en web.php
        post(route('acopios.store'), {
            onSuccess: () => reset('peso_kg'), // Si sale bien, limpiamos solo el peso
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registro de Acopio</h2>}
        >
            <Head title="Acopios" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* SECCIÓN DEL FORMULARIO */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">Nuevo Ingreso de Material</h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tipo de Material</label>
                                <select 
                                    value={data.material} 
                                    onChange={(e) => setData('material', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="PET">Botellas PET</option>
                                    <option value="Cartón">Cartón Corrugado</option>
                                    <option value="PEAD">Plástico PEAD</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Peso (Kg)</label>
                                <input 
                                    type="number" 
                                    step="0.1"
                                    value={data.peso_kg} 
                                    onChange={(e) => setData('peso_kg', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    placeholder="Ej. 150.5"
                                />
                                {/* Muestra errores de validación si Laravel los devuelve */}
                                {errors.peso_kg && <div className="text-red-500 text-sm mt-1">{errors.peso_kg}</div>}
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing} // Desactiva el botón mientras carga
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                            >
                                Registrar Acopio
                            </button>
                        </form>
                    </div>

                    {/* SECCIÓN DE LA TABLA (Muestra los datos traídos de la base de datos) */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">Historial de Ingresos</h3>
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Material</th>
                                    <th className="px-6 py-4">Peso (Kg)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {acopios.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                            Aún no hay registros.
                                        </td>
                                    </tr>
                                ) : (
                                    acopios.map((acopio) => (
                                        <tr key={acopio.id} className="border-b">
                                            <td className="px-6 py-4">{acopio.id}</td>
                                            <td className="px-6 py-4 font-semibold">{acopio.material}</td>
                                            <td className="px-6 py-4">{acopio.peso_kg} kg</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}