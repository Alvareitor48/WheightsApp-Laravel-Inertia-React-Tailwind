<?php

namespace App\Listeners;

use App\Events\RoutineDeleted;
use App\Mail\EncourageNewRoutineMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class EncourageUserToCreateRoutineListener implements ShouldQueue
{

    /**
     * Handle the event.
     */
    public function handle(RoutineDeleted $event): void
    {
        $user = $event->routine->user;

        if ($user->routines()->count() === 0) {
            Mail::to($user->email)->queue(new EncourageNewRoutineMail($user));
        }
    }
}
