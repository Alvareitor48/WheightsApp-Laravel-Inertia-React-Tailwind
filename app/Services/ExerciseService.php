<?php

namespace App\Services;

use App\Jobs\ProcessExerciseMedia;
use Illuminate\Http\UploadedFile;
use App\Models\Exercise;

class ExerciseService
{
    public function createExercise(UploadedFile $media, string $name, string $description, ?string $equipment): Exercise
    {
        $tempPath = $this->storeTempFile($media);

        $fileName = $this->generateFileName($media, $name, $description);
        $destinationPath = "exercises_video_images/custom/";

        $exercise = Exercise::create([
            'name' => $name,
            'description' => $description,
            'url' => "{$destinationPath}{$fileName}",
            'equipment' => $equipment,
            'user_id' => auth()->id(),
            'is_private' => true,
        ]);

        ProcessExerciseMedia::dispatch($tempPath, $fileName, $destinationPath);

        return $exercise;
    }

    private function storeTempFile(UploadedFile $media): string
    {
        $fileName = time() . "_" . preg_replace('/[^a-zA-Z0-9.]/', '_', $media->getClientOriginalName());
        $path = "tmp/{$fileName}";
        $media->storeAs('tmp', $fileName);

        return $path;
    }


    private function generateFileName(UploadedFile $media, string $name, string $description): string
    {
        $originalExtension = $media->getClientOriginalExtension();
        $sanitizedName = preg_replace('/[^a-zA-Z0-9]/', '_', strtolower($name));
        $sanitizedDescription = substr(preg_replace('/[^a-zA-Z0-9]/', '_', strtolower($description)), 0, 30);
        $timestamp = time();

        return "{$sanitizedName}_{$sanitizedDescription}_{$timestamp}.{$originalExtension}";
    }
}
