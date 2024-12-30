<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRoutinesRequest extends FormRequest
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
            'routine.id' => 'required|integer|exists:routines,id',
            'routine.name' => 'required|string|max:255',
            'routine.description' => 'nullable|string|max:1000',
            'routine.day' => 'required|string|in:Monday,Tuesday,Wednesday,Thursday,Friday',
            'exercises.*.data.id' => 'required|integer|exists:exercises_routines,id',
            'exercises.*.data.note' => 'required|string|max:255',
            'exercises.*.data.exercise.*.id' => 'required|integer|exists:exercises,id',
            'exercises.*.data.exercise.*.name' => 'required|string|max:255',
            'exercises.*.data.series.*.*.id' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (!is_numeric($value) && !preg_match('/^[0-9a-fA-F-]{36}$/', $value)) {
                        $fail("El campo $attribute debe ser un número entero o un UUID válido.");
                    }
                },
            ],
            'exercises.*.data.series.*.*.repetitions' => 'required|integer',
            'exercises.*.data.series.*.*.RIR' => 'required|in:0,1,2,3,4,5',
            'exercises.*.data.series.*.*.failure' => 'required|boolean',
            'exercises.*.data.series.*.*.weight' => 'required|numeric',
        ];
    }

    public function messages(): array
    {
        return [
            'routine.id.required' => 'El ID de la rutina es obligatorio',
            'routine.id.integer' => 'El ID de la rutina debe ser un número entero',
            'routine.id.exists' => 'El ID de la rutina seleccionado no es válido',
            'routine.name.required' => 'El nombre de la rutina es obligatorio',
            'routine.name.string' => 'El nombre de la rutina debe ser una cadena de texto',
            'routine.name.max' => 'El nombre de la rutina no puede tener más de 255 caracteres',
            'routine.description.string' => 'La descripción de la rutina debe ser una cadena de texto',
            'routine.description.max' => 'La descripción de la rutina no puede tener más de 1000 caracteres',
            'routine.day.required' => 'El día de la rutina es obligatorio',
            'routine.day.string' => 'El día de la rutina debe ser una cadena de texto',
            'routine.day.in' => 'El día de la rutina debe ser uno de los siguientes: Lunes, Martes, Miércoles, Jueves, Viernes',
            'exercises.*.data.id.required' => 'El ID de la rutina de ejercicios es obligatorio',
            'exercises.*.data.id.integer' => 'El ID de la rutina de ejercicios debe ser un número entero',
            'exercises.*.data.id.exists' => 'El ID de la rutina de ejercicios seleccionado no es válido',
            'exercises.*.data.note.required' => 'La nota del ejercicio es obligatoria',
            'exercises.*.data.note.string' => 'La nota del ejercicio debe ser una cadena de texto',
            'exercises.*.data.note.max' => 'La nota del ejercicio no puede tener más de 255 caracteres',
            'exercises.*.data.exercise.*.id.required' => 'El ID del ejercicio es obligatorio',
            'exercises.*.data.exercise.*.id.integer' => 'El ID del ejercicio debe ser un número entero',
            'exercises.*.data.exercise.*.id.exists' => 'El ID del ejercicio seleccionado no es válido',
            'exercises.*.data.exercise.*.name.required' => 'El nombre del ejercicio es obligatorio',
            'exercises.*.data.exercise.*.name.string' => 'El nombre del ejercicio debe ser una cadena de texto',
            'exercises.*.data.exercise.*.name.max' => 'El nombre del ejercicio no puede tener más de 255 caracteres',
            'exercises.*.data.series.*.*.id.required' => 'El ID de la serie es obligatorio',
            'exercises.*.data.series.*.*.repetitions.required' => 'El número de repeticiones es obligatorio',
            'exercises.*.data.series.*.*.repetitions.integer' => 'El número de repeticiones debe ser un número entero',
            'exercises.*.data.series.*.*.RIR.required' => 'El RIR es obligatorio',
            'exercises.*.data.series.*.*.RIR.in' => 'El RIR debe ser uno de los siguientes: 0, 1, 2, 3, 4, 5',
            'exercises.*.data.series.*.*.failure.required' => 'El campo de fallo es obligatorio',
            'exercises.*.data.series.*.*.failure.boolean' => 'El campo de fallo debe ser verdadero o falso',
            'exercises.*.data.series.*.*.weight.required' => 'El peso es obligatorio',
            'exercises.*.data.series.*.*.weight.numeric' => 'El peso debe ser un número',
        ];
    }
}
