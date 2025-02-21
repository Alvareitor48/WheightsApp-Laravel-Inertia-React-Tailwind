<?php

namespace App\Services;

use App\Actions\UpdateExerciseRoutineAction;
use App\Actions\UpdateRoutineAction;
use App\Models\Exercise;
use App\Http\Resources\ExerciseResource;
use App\Http\Resources\SerieResource;

class RoutineService
{
    private UpdateRoutineAction $updateRoutineAction;
    private UpdateExerciseRoutineAction $updateExerciseRoutineAction;

    public function __construct(
        UpdateRoutineAction $updateRoutineAction,
        UpdateExerciseRoutineAction $updateExerciseRoutineAction
    ){
        $this->updateRoutineAction = $updateRoutineAction;
        $this->updateExerciseRoutineAction = $updateExerciseRoutineAction;
    }

    public function updateRoutineAndSeries(array $data)
    {
        $updatedExercises = [];

        foreach ($data['exercises'] as $exerciseData) {
            $exerciseRoutine = $this->updateExerciseRoutineAction->execute(
                $exerciseData['id'],
                $exerciseData['note'] ?? null
            );

            $this->deleteSeries($exerciseData['series'] ?? [], $exerciseRoutine);

            $updatedSeries = [];

            if (!empty($exerciseData['series'])) {
                foreach ($exerciseData['series'] as $seriesData) {
                    $this->updateSeries($exerciseRoutine, $seriesData, $updatedSeries);
                }
            }

            $updatedExercises[] = [
                'id' => $exerciseRoutine->id,
                'note' => $exerciseRoutine->note,
                'exercise' => new ExerciseResource(Exercise::find($exerciseRoutine->exercise_id)),
                'series' => SerieResource::collection($updatedSeries),
            ];
        }

        return [
            'routine' => $this->updateRoutineAction->execute(
                $data['routine']['id'],
                $data['routine']['name'],
                $data['routine']['description']),
            'exercises' => $updatedExercises,
        ];
    }

    private function updateSeries($exerciseRoutine,$seriesData,&$updatedSeries): void
    {
        if (is_numeric($seriesData['id'])) {
            $series = $exerciseRoutine->series()->find($seriesData['id']);
            $series?->update([
                'repetitions' => $seriesData['repetitions'],
                'weight' => $seriesData['weight'],
                'RIR' => $seriesData['RIR'],
                'failure' => $seriesData['failure'],
            ]);
        } elseif (preg_match('/^[0-9a-fA-F-]{36}$/', $seriesData['id'])) {
            $series = $exerciseRoutine->series()->create([
                'repetitions' => $seriesData['repetitions'],
                'weight' => $seriesData['weight'],
                'RIR' => $seriesData['RIR'],
                'failure' => $seriesData['failure'],
            ]);
        }
        $updatedSeries[] = $series;
    }

    private function deleteSeries(array $series, $exerciseRoutine): void
    {
        $seriesIds = collect($series)
            ->filter(fn($seriesData) => is_numeric($seriesData['id']))
            ->pluck('id')
            ->toArray();
        $exerciseRoutine->series()->whereNotIn('id', $seriesIds)->delete();
    }
}

