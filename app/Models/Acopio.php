<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acopio extends Model
{
    use HasFactory;

    // Estos son los campos que permitimos llenar desde el formulario
    protected $fillable = ['material', 'peso_kg'];
}
