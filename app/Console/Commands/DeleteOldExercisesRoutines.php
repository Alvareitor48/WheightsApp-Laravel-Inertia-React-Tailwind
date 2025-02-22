<?php

namespace App\Console\Commands;

use App\Models\ExerciseRoutine;
use Illuminate\Console\Command;

class DeleteOldExercisesRoutines extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'exercises-routines:delete-old';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove deleted exercises from routine more than 1 year';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        ExerciseRoutine::onlyTrashed()
            ->where('deleted_at', '<', now()->subYear())
            ->forceDelete();
    }
}
