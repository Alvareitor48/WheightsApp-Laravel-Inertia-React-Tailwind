<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ExerciseApiController;

Route::get('/exercises', [ExerciseApiController::class, 'index'])->name('api.exercises.index');