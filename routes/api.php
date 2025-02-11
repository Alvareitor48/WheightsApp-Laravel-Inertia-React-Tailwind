<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ExerciseApiController;
use App\Http\Controllers\Api\AuthApiController;

Route::middleware(['auth:sanctum','role:user'])->group(function () {
    Route::get('/exercises/{id}', [ExerciseApiController::class, 'show'])->name('api.exercises.show');
});

Route::post('/register', [AuthApiController::class, 'register'])->name('api.register');
Route::post('/login', [AuthApiController::class, 'login'])->name('api.login');
Route::get('/exercises', [ExerciseApiController::class, 'index'])->name('api.exercises.index');
