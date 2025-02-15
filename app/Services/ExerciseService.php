<?php

namespace App\Services;

use App\Models\Exercise;

class ExerciseService
{
    public function createExercise($media, $name, $description,$equipment): Exercise
    {
        $publicUrl = $this->getMediaDirectory($media,$name,$description);
        return Exercise::create([
            'name' => $name,
            'description' => $description,
            'url' => $publicUrl,
            'equipment' => $equipment ?? null,
            'user_id' => auth()->id(),
            'is_private' => true,
        ]);
    }
    private function getMediaDirectory($media, $name, $description)
    {
        $originalExtension = $media->getClientOriginalExtension();

        $sanitizedName = preg_replace('/[^a-zA-Z0-9]/', '_', strtolower($name));
        $sanitizedDescription = substr(preg_replace('/[^a-zA-Z0-9]/', '_', strtolower($description)), 0, 30);
        $timestamp = time();

        $fileName = "{$sanitizedName}_{$sanitizedDescription}_{$timestamp}.{$originalExtension}";
        $destinationPath = public_path("exercises_video_images/custom/");

        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0777, true);
        }

        $media->move($destinationPath, $fileName);

        return "exercises_video_images/custom/{$fileName}";
    }
}
