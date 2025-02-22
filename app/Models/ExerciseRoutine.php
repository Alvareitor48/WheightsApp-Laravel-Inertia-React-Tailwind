<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExerciseRoutine extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'exercises_routines';
    protected $dates = ['deleted_at'];
    protected $fillable = ['exercise_id','routine_id','note','rest_time'];

    public function exercise(): BelongsTo
    {
        return $this->belongsTo(Exercise::class);
    }

    public function routine(): BelongsTo
    {
        return $this->belongsTo(Routine::class);
    }

    public function series(): HasMany
    {
        return $this->hasMany(Serie::class,'exercises_routines_id');
    }

    public function scopeByRoutineAndExercise($query, $routineId, $exerciseId)
    {
        return $query->where('routine_id', $routineId)
            ->where('id', $exerciseId);
    }
}
