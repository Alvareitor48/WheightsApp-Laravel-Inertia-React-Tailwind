<?php

namespace App\Listeners;

use App\Events\RoutineDeleted;
use App\Mail\RoutineDeletedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendRoutineDeletedNotification implements ShouldQueue
{

    public function handle(RoutineDeleted $event): void
    {
        Mail::to($event->routine->user->email)
            ->queue(new RoutineDeletedMail($event->routine));
    }
}
