<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RoutineSession extends Model
{
    use HasFactory;
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
}
