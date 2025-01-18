<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ExerciseLog extends Model
{
    use HasFactory;
    protected $fillable = ['routine_session_id', 'exercise_id', 'repetitions', 'RIR', 'failure', 'weight'];
    protected $table = 'exercise_logs';
}