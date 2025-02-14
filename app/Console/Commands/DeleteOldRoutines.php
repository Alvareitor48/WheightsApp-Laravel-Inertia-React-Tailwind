<?php

namespace App\Console\Commands;

use App\Models\Routine;
use Illuminate\Console\Command;

class DeleteOldRoutines extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'routines:delete-old';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove deleted routines more than 7 days';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Routine::onlyTrashed()
            ->where('deleted_at', '<', now()->subDays(7))
            ->forceDelete();
    }
}
