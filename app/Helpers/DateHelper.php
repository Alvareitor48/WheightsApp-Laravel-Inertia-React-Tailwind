<?php

namespace App\Helpers;

use Illuminate\Support\Carbon;

class DateHelper
{
    public static function getDays($period)
    {
        return [
            Carbon::now()->endOfDay(),
            self::switchForDate($period),
        ];
    }

    public static function switchForDate($period)
    {
        return match ($period) {
            '3months' => Carbon::now()->subMonths(3)->startOfDay(),
            'year' => Carbon::now()->subYear()->startOfDay(),
            default => Carbon::now()->subMonth()->startOfDay(),
        };
    }
}
