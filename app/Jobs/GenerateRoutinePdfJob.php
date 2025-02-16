<?php

namespace App\Jobs;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;

class GenerateRoutinePdfJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    protected $routineDetails;
    protected int $routineId;
    public function __construct($routineDetails, $routineId)
    {
        $this->routineDetails = $routineDetails;
        $this->routineId = $routineId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $pdf = Pdf::loadView('pdf.routine', ['routineDetails' => $this->routineDetails]);
        $filePath = "pdfs/rutina_{$this->routineId}.pdf";
        Storage::disk('public')->put($filePath, $pdf->output());
    }




}
