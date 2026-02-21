// 1. IMPORTA useState
import AlertaFlash from '@/Components/AlertaFlash';
import ResumenAcopios from '@/Components/ResumenAcopios';
import TablaAcopios from '@/Components/TablaAcopios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
// 2. IMPORTA TU NUEVO MODAL
import ModalEditarAcopio from '@/Components/ModalEditarAcopio';

export default function Index({ auth, acopios }) {
    
    // 3. CREAMOS LAS VARIABLES PARA CONTROLAR EL MODAL
    const [mostrarModal, setMostrarModal] = useState(false);
    const [acopioSeleccionado, setAcopioSeleccionado] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        material: 'PET',
        peso_kg: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('acopios.store'), {
            onSuccess: () => reset('peso_kg'),
        });
    };

    // 4. FUNCIÓN QUE SE EJECUTA AL HACER CLIC EN "EDITAR" EN LA TABLA
    const abrirModalEdicion = (acopio) => {
        setAcopioSeleccionado(acopio);
        setMostrarModal(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registro de Acopio - Empacar</h2>}
        >
            <Head title="Acopios" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    <AlertaFlash />
                    <ResumenAcopios acopios={acopios} />
                    
                    {/* (El div de tu formulario de Nuevo Ingreso se queda exactamente igual) */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* ... tu form ... */}
                    </div>

                    {/* 5. LE PASAMOS LA FUNCIÓN onEditar A LA TABLA */}
                    <TablaAcopios acopios={acopios} onEditar={abrirModalEdicion} />

                </div>
            </div>

            {/* 6. COLOCAMOS EL MODAL AL FINAL (Oculto por defecto) */}
            <ModalEditarAcopio 
                show={mostrarModal} 
                onClose={() => setMostrarModal(false)} 
                acopio={acopioSeleccionado} 
            />

        </AuthenticatedLayout>
    );
}