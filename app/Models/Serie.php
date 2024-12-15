<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Serie extends Model
{
    use HasFactory;

    protected $fillable = ['exercises_routines_id','repetitions','duration','RIR','failure','weight'];
    protected $table = 'series';

    public function exerciseRoutine(): BelongsTo
    {
        return $this->belongsTo(ExerciseRoutine::class, 'exercises_routines_id');
    }
}
