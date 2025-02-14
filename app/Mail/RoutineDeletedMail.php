<?php

namespace App\Mail;

use App\Models\Routine;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RoutineDeletedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $routine;

    /**
     * Create a new message instance.
     */
    public function __construct(Routine $routine)
    {
        $this->routine = $routine;
    }

    public function build()
    {
        return $this->subject('Tu rutina ha sido eliminada')
            ->view('emails.routine_deleted')
            ->with(['routine' => $this->routine])
            ->with(['link' => config('app.url') . '/routines/restore/' . $this->routine->id]);
    }
}
