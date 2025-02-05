<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExerciseLog extends Model
{
    use HasFactory;
    protected $fillable = ['routine_session_id', 'exercise_id', 'repetitions', 'RIR', 'failure', 'weight'];
    protected $table = 'exercise_logs';

    public function routine_session(): BelongsTo
    {
        return $this->belongsTo(RoutineSession::class);
    }

    public function exercise(): BelongsTo
    {
        return $this->belongsTo(Exercise::class);
    }
}
