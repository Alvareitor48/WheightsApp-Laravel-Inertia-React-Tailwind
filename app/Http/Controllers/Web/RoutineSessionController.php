<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExerciseResource;
use App\Http\Resources\ExerciseRoutineResource;
use App\Http\Resources\SerieResource;
use App\Models\Exercise;
use App\Models\ExerciseLog;
use App\Models\ExerciseRoutine;
use App\Models\Routine;
use App\Models\RoutineSession;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoutineSessionController extends Controller
{
    use AuthorizesRequests;

    public function show($id){
        $routineSession = RoutineSession::findOrFail($id);
        $this->authorize('view', $routineSession);
        $routineDetails = $this->getRoutineDetails($id);
        $routineDetails['isSession'] = true;
        return Inertia::render('routines/pages/AdminRoutines', $routineDetails);
    }

private function getRoutineDetails(int $id): array
{
    $routineSession = RoutineSession::findOrFail($id);
    $routine = Routine::with('user')->where('id', $routineSession->routine_id)->firstOrFail();
    $exerciseRoutines = ExerciseRoutine::withTrashed()->with('series')->where('routine_id', $routine->id)->get();
    $groupedExercisesLogs = ExerciseLog::where('routine_session_id', $routineSession->id)
        ->get()
        ->groupBy('exercise_id')
        ->values();
    $seriesLogs = $groupedExercisesLogs->map(fn($exerciseLogs) => SerieResource::collection($exerciseLogs));
    $exercises = $exerciseRoutines->map(fn($exerciseRoutine) => new ExerciseResource(Exercise::where('id', $exerciseRoutine->exercise_id)->first()));
    $exerciseRoutinesWithDetails = $exerciseRoutines->map(fn($exerciseRoutine, $index) =>
    isset($seriesLogs[$index])
        ? (new ExerciseRoutineResource($exerciseRoutine, $seriesLogs[$index], $exercises[$index]))->toArray(request())
        : null
    )->filter();

    return [
        'routine' => $routine,
        'exercises' => $exerciseRoutinesWithDetails,
    ];
}
}
