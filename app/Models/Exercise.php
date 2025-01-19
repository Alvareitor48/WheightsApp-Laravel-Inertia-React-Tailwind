<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Exercise extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description','gif','equipment'];
    protected $table = 'exercises';

    public function routines(): BelongsToMany
    {
        return $this->belongsToMany(Routine::class,'exercises_routines')
            ->withPivot(['id','duration','note','rest_time'])
            ->as('pivot');
    }

    public function muscles(): BelongsToMany
    {
        return $this->belongsToMany(Muscle::class, 'exercise_muscle');
    }
}