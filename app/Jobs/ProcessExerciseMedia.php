<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ProcessExerciseMedia implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected string $tempPath;
    protected string $fileName;
    protected string $destinationPath;

    public function __construct(string $tempPath, string $fileName, string $destinationPath)
    {
        $this->tempPath = $tempPath;
        $this->fileName = $fileName;
        $this->destinationPath = $destinationPath;
    }

    public function handle(): void
    {
        $storagePath = Storage::path($this->tempPath);
        $finalPath = public_path("{$this->destinationPath}{$this->fileName}");

        $retries = 0;
        while (!Storage::exists($this->tempPath) && $retries < 5) {
            sleep(1);
            $retries++;
        }

        if (!Storage::exists($this->tempPath)) {
            return;
        }

        if (!is_dir(public_path($this->destinationPath))) {
            mkdir(public_path($this->destinationPath), 0777, true);
        }

        File::move($storagePath, $finalPath);
    }

}
