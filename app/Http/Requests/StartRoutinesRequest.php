<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StartRoutinesRequest extends FormRequest
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
            'durationInSeconds' => 'required|integer|min:1',
            'exercises.*.id' => 'required|integer|exists:exercises_routines,id',
            'exercises.*.note' => 'nullable|string|max:255',
            'exercises.*.exercise.id' => 'required|integer|exists:exercises,id',
            'exercises.*.exercise.name' => 'required|string|max:255',
            'exercises.*.series.*.id' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (!is_numeric($value) && !preg_match('/^[0-9a-fA-F-]{36}$/', $value)) {
                        $fail("El campo $attribute debe ser un número entero o un UUID válido.");
                    }
                },
            ],
            'exercises.*.series.*.repetitions' => 'required|integer|not_in:0',
            'exercises.*.series.*.RIR' => 'required|in:0,1,2,3,4,5',
            'exercises.*.series.*.failure' => 'required|boolean',
            'exercises.*.series.*.weight' => 'required|numeric|not_in:0',
        ];
    }

    public function messages(): array
    {
        return [
            'routine.id.required' => 'El ID de la rutina es obligatorio.',
            'routine.id.integer' => 'El ID de la rutina debe ser un número entero.',
            'routine.id.exists' => 'El ID de la rutina seleccionado no es válido.',
            'routine.name.required' => 'El nombre de la rutina es obligatorio.',
            'routine.name.string' => 'El nombre de la rutina debe ser una cadena de texto.',
            'routine.name.max' => 'El nombre de la rutina no puede tener más de 255 caracteres.',
            'routine.description.string' => 'La descripción de la rutina debe ser una cadena de texto.',
            'routine.description.max' => 'La descripción de la rutina no puede tener más de 1000 caracteres.',
            'routine.day.required' => 'El día de la rutina es obligatorio.',
            'routine.day.string' => 'El día de la rutina debe ser una cadena de texto.',
            'routine.day.in' => 'El día de la rutina debe ser uno de los siguientes: Monday, Tuesday, Wednesday, Thursday, Friday.',
            'exercises.*.id.required' => 'El ID del ejercicio es obligatorio.',
            'exercises.*.id.integer' => 'El ID del ejercicio debe ser un número entero.',
            'exercises.*.id.exists' => 'El ID del ejercicio seleccionado no es válido.',
            'exercises.*.note.string' => 'La nota del ejercicio debe ser una cadena de texto.',
            'exercises.*.note.max' => 'La nota del ejercicio no puede tener más de 255 caracteres.',
            'exercises.*.exercise.id.required' => 'El ID del ejercicio es obligatorio.',
            'exercises.*.exercise.id.integer' => 'El ID del ejercicio debe ser un número entero.',
            'exercises.*.exercise.id.exists' => 'El ID del ejercicio seleccionado no es válido.',
            'exercises.*.exercise.name.required' => 'El nombre del ejercicio es obligatorio.',
            'exercises.*.exercise.name.string' => 'El nombre del ejercicio debe ser una cadena de texto.',
            'exercises.*.exercise.name.max' => 'El nombre del ejercicio no puede tener más de 255 caracteres.',
            'exercises.*.series.*.id.required' => 'El ID de la serie es obligatorio.',
            'exercises.*.series.*.repetitions.required' => 'El número de repeticiones es obligatorio.',
            'exercises.*.series.*.repetitions.integer' => 'El número de repeticiones debe ser un número entero.',
            'exercises.*.series.*.repetitions.not_in' => 'El número de repeticiones no puede ser cero.',
            'exercises.*.series.*.RIR.required' => 'El RIR es obligatorio.',
            'exercises.*.series.*.RIR.in' => 'El RIR debe ser uno de los siguientes: 0, 1, 2, 3, 4, 5.',
            'exercises.*.series.*.failure.required' => 'El campo de fallo es obligatorio.',
            'exercises.*.series.*.failure.boolean' => 'El campo de fallo debe ser verdadero o falso.',
            'exercises.*.series.*.weight.required' => 'El peso es obligatorio.',
            'exercises.*.series.*.weight.numeric' => 'El peso debe ser un número.',
            'exercises.*.series.*.weight.not_in' => 'El peso no puede ser cero.',
        ];
    }
}