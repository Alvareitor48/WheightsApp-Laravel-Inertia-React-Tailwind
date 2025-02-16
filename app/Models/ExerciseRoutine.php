<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class ExerciseRoutine extends Model
{
    use HasFactory;
    protected $table = 'exercises_routines';
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
}
