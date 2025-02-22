<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ExerciseApiController;
use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\RoutineApiController;
use App\Http\Controllers\PayPalController;

Route::middleware(['auth:sanctum','role:user|admin|premium'])->group(function () {
    Route::get('/exercises/{id}', [ExerciseApiController::class, 'show'])->name('api.exercises.show');
    Route::post('/logout', [AuthApiController::class, 'logout'])->name('api.logout');
    Route::get('/routines/{id}', [RoutineApiController::class, 'show'])->name('api.routines.show');
    Route::get('/routines/{id}/chart-data', [RoutineApiController::class, 'chartData'])->name('api.routines.chartData');
});

Route::middleware(['auth:sanctum','role:admin|premium'])->group(function () {
    Route::post('/exercises', [ExerciseApiController::class, 'store'])->name('api.exercises.store');
});

Route::post('/register', [AuthApiController::class, 'register'])->name('api.register');
Route::post('/login', [AuthApiController::class, 'login'])->name('api.login');
Route::get('/exercises', [ExerciseApiController::class, 'index'])->name('api.exercises.index');

Route::post('/paypal/order', [PayPalController::class, 'createOrder']);
Route::post('/paypal/capture', [PayPalController::class, 'capturePayment']);
