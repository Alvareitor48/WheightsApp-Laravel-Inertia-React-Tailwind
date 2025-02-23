<?php


namespace App\Actions;

use App\Models\Exercise;
use Illuminate\Http\Request;
class FilterExercisesAction
{
    public function execute(Request $request, bool $isApi = false)
    {
        $query = Exercise::query();

        if ($request->filled('equipment')) {
            $query->where('equipment', $request->equipment === 'Sin equipamiento' ? null : $request->equipment);
        }

        if ($request->filled('muscles') || $request->filled('muscle')) {
            $muscles = $request->filled('muscle') ? $request->muscle : explode(',', $request->muscles);
            $query->whereHas('muscles', function ($query) use ($muscles, $request) {
                $request->filled('muscle') ? $query->where('name', $muscles) : $query->whereIn('name', $muscles);
            });
        }

        if ($isApi) {
            if ($request->boolean('created_by_me') && auth()->check()) {
                $query->where('user_id', auth()->id());
            } elseif ($request->boolean('created_by_me')) {
                abort(response()->json(['message' => 'Unauthorized'], 401));
            }
        } else {
            if ($request->filled('my_exercises')) {
                if ($request->my_exercises === 'Mis ejercicios') {
                    $query->where('user_id', auth()->id());
                } elseif ($request->my_exercises === 'Ejercicios normales') {
                    $query->whereNull('user_id');
                }
            } else {
                $query->whereNull('user_id');
            }
        }

        return $query->paginate($isApi ? 10 : 20)->appends($request->query());
    }
}
