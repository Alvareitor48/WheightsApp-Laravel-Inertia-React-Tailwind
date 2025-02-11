<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApiExerciseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'media' => 'required|file|mimes:webp,mp4|max:20480',
            'equipment' => 'nullable|string',
            'muscles' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El campo nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no puede tener más de 255 caracteres.',
            'description.required' => 'El campo descripción es obligatorio.',
            'description.string' => 'La descripción debe ser una cadena de texto.',
            'description.max' => 'La descripción no puede tener más de 500 caracteres.',
            'media.required' => 'El campo archivo es obligatorio.',
            'media.file' => 'El archivo debe ser un archivo.',
            'media.mimes' => 'El archivo debe ser de tipo: webp, mp4.',
            'media.max' => 'El archivo no puede ser mayor a 20480 kilobytes.',
            'muscles.required' => 'El campo músculos es obligatorio.',
            'muscles.string' => 'Los músculos deben enviarse como una cadena de texto separada por comas.',
            'equipment.string' => 'El equipo debe ser una cadena de texto.',
        ];
    }
}
