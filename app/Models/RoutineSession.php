<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RoutineSession extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'routine_id', 'duration', 'complete_at'];
    protected $table = 'routine_sessions';

    public function exerciseLogs()
    {
        return $this->hasMany(ExerciseLog::class, 'routine_session_id');
    }
}