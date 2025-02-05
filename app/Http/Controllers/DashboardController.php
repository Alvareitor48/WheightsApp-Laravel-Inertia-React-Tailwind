<?php

namespace App\Http\Controllers;

use App\Http\Resources\SessionsForCalendarResource;
use App\Models\RoutineSession;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::now()->toDateString();
        $previousMonth = Carbon::now()->subMonth()->toDateString();
        $sessions = RoutineSession::query()
            ->where('user_id',auth()->id())
            ->whereDate('completed_at', '>=', $previousMonth)
            ->whereDate('completed_at', '<=', $today)
            ->with('routine')
            ->get();

        return Inertia::render('profile/pages/Dashboard',['sessions'=>SessionsForCalendarResource::collection($sessions)->toArray(request())]);
    }
}