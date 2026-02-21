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
        // 1. Validamos que los datos sean correctos
        $validated = $request->validate([
            'material' => 'required|string',
            'peso_kg' => 'required|numeric|min:0.1',
        ]);

        // 2. Guardamos en la base de datos
        Acopio::create($validated);

        // 3. Regresamos a la página anterior (Inertia actualizará la tabla automáticamente)
        return redirect()->back();
    }
}