<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ExerciseApiController;
use App\Http\Controllers\Api\AuthApiController;

Route::post('/register', [AuthApiController::class, 'register'])->name('api.register');
Route::post('/login', [AuthApiController::class, 'login'])->name('api.login');
Route::get('/exercises', [ExerciseApiController::class, 'index'])->name('api.exercises.index');
