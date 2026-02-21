<?php

namespace App\Http\Controllers;

use App\Models\Acopio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcopioController extends Controller
{
    // Esta función carga la página inicial y le envía los datos guardados a React
    public function index()
    {
        return Inertia::render('Acopios/Index', [
            'acopios' => Acopio::latest()->get() // Traemos todos los registros, los más nuevos primero
        ]);
    }

    // Esta función recibe los datos del formulario de React y los guarda
    public function store(Request $request)
    {
        $validated = $request->validate([
            'material' => 'required|string',
            'peso_kg' => 'required|numeric|min:0.1',
        ]);

        Acopio::create($validated);

        // MODIFICA ESTA LÍNEA: Agregamos ->with()
        return redirect()->back()->with('success', '¡Material registrado correctamente!');
    }

    public function destroy(Acopio $acopio)
    {
        $acopio->delete();
        
        // MODIFICA ESTA LÍNEA: Agregamos ->with()
        return redirect()->back()->with('success', 'Registro eliminado del sistema.');
    }


    public function update(Request $request, Acopio $acopio)
    {
        $validated = $request->validate([
            'material' => 'required|string',
            'peso_kg' => 'required|numeric|min:0.1',
        ]);

        // Actualizamos el registro en la base de datos
        $acopio->update($validated);
        
        return redirect()->back()->with('success', 'Registro actualizado con éxito.');
    }
}