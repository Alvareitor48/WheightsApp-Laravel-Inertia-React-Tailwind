<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class RoutineSession extends Model
{
    use HasFactory , SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $fillable = ['user_id', 'routine_id', 'duration', 'completed_at'];
    protected $table = 'routine_sessions';

    public function exerciseLogs()
    {
        return $this->hasMany(ExerciseLog::class, 'routine_session_id');
    }

    public function routine(): BelongsTo
    {
        return $this->belongsTo(Routine::class, 'routine_id');
    }

    public function scopeByUserAndDateRange($query, $userId, $startDate, $endDate, $routineId = null)
    {
        $query->where('user_id', $userId)
            ->whereBetween('completed_at', [$startDate, $endDate])
            ->with('exerciseLogs');

        if (!is_null($routineId)) {
            $query->where('routine_id', $routineId);
        }

        return $query;
    }

}
