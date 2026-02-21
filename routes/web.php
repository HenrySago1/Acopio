<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AcopioController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware(['auth', 'verified'])->group(function () {
    // Ruta para ver la página (llama a la función index)
    Route::get('/acopios', [AcopioController::class, 'index'])->name('acopios.index');
    
    // Ruta para guardar datos (llama a la función store cuando React hace POST)
    Route::post('/acopios', [AcopioController::class, 'store'])->name('acopios.store');
});

Route::delete('/acopios/{acopio}', [AcopioController::class, 'destroy'])->name('acopios.destroy');
Route::put('/acopios/{acopio}', [AcopioController::class, 'update'])->name('acopios.update');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
