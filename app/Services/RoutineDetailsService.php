<?php

namespace App\Services;

use App\Helpers\DateHelper;
use App\Http\Resources\StatisticsResource;
use App\Models\Routine;
use App\Models\ExerciseRoutine;
use App\Models\Exercise;
use App\Http\Resources\ExerciseRoutineResource;
use App\Http\Resources\ExerciseResource;
use App\Http\Resources\SerieResource;
use App\Models\RoutineSession;

class RoutineDetailsService
{
    public function getRoutineDetails(int $id): array
    {
        $routine = Routine::with('user')->where('id', $id)->firstOrFail();
        $exerciseRoutines = ExerciseRoutine::with('series')->where('routine_id', $routine->id)->get();

        $series = $exerciseRoutines->map(fn($exerciseRoutine) => SerieResource::collection($exerciseRoutine->series));
        $exercises = $exerciseRoutines->map(fn($exerciseRoutine) => new ExerciseResource(Exercise::where('id', $exerciseRoutine->exercise_id)->first()));

        $exerciseRoutinesWithDetails = $exerciseRoutines->map(fn($exerciseRoutine, $index) =>
        (new ExerciseRoutineResource($exerciseRoutine, $series[$index], $exercises[$index]))->toArray(request())
        );

        return [
            'routine' => $routine,
            'exercises' => $exerciseRoutinesWithDetails,
        ];
    }

    public function chartData(string $period = null, ?int $routineId = null): array
    {
        [$today, $startDate] = DateHelper::getDays($period);
        $sessions = RoutineSession::byUserAndDateRange(auth()->id(), $startDate, $today, $routineId)->get();

        return StatisticsResource::collection($sessions)->toArray(request());
    }
}
