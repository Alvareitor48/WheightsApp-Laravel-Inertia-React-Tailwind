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
}
