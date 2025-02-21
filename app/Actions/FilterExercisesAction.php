<?php


namespace App\Actions;

use App\Models\Exercise;
use Illuminate\Http\Request;
class FilterExercisesAction
{
    public function execute(Request $request)
    {
        $query = Exercise::query();

        if ($request->filled('equipment')) {
            $query->where('equipment', $request->equipment === 'Sin equipamiento' ? null : $request->equipment);
        }

        if ($request->filled('muscle')) {
            $query->whereHas('muscles', function ($query) use ($request) {
                $query->where('name', $request->muscle);
            });
        }

        if ($request->filled('my_exercises')) {
            if ($request->my_exercises === 'Mis ejercicios') {
                $query->where('user_id', auth()->id());
            } elseif ($request->my_exercises === 'Ejercicios normales') {
                $query->whereNull('user_id');
            }
        } else {
            $query->whereNull('user_id');
        }

        return $query->paginate(20);
    }
}
