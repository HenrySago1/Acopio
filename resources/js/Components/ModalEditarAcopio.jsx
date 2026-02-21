import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ModalEditarAcopio({ show, onClose, acopio }) {
    
    // Preparamos el formulario para la petición PUT
    const { data, setData, put, processing, errors, reset } = useForm({
        material: '',
        peso_kg: '',
    });

    // useEffect vigila la variable "acopio". Cuando cambie (al hacer clic en un registro), llena los inputs.
    useEffect(() => {
        if (acopio) {
            setData({
                material: acopio.material,
                peso_kg: acopio.peso_kg,
            });
        }
    }, [acopio]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('acopios.update', acopio.id), {
            onSuccess: () => {
                reset();    // Limpiamos
                onClose();  // Cerramos el modal
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Editar Registro #{acopio?.id}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Material</label>
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
                            type="number" step="0.1"
                            value={data.peso_kg} 
                            onChange={(e) => setData('peso_kg', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.peso_kg && <div className="text-red-500 text-sm mt-1">{errors.peso_kg}</div>}
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300">
                            Cancelar
                        </button>
                        <button type="submit" disabled={processing} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}