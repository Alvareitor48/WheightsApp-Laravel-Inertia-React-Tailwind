<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ExerciseApiController;
use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\PayPalController;

Route::middleware(['auth:sanctum','role:user|admin|premium'])->group(function () {
    Route::get('/exercises/{id}', [ExerciseApiController::class, 'show'])->name('api.exercises.show');
    Route::post('/logout', [AuthApiController::class, 'logout'])->name('api.logout');
});

Route::middleware(['auth:sanctum','role:admin|premium'])->group(function () {
    Route::post('/exercises', [ExerciseApiController::class, 'store'])->name('api.exercises.store');
});

Route::post('/register', [AuthApiController::class, 'register'])->name('api.register');
Route::post('/login', [AuthApiController::class, 'login'])->name('api.login');
Route::get('/exercises', [ExerciseApiController::class, 'index'])->name('api.exercises.index');

Route::post('/paypal/order', [\App\Http\Controllers\PayPalController::class, 'createOrder']);
Route::post('/paypal/capture', [\App\Http\Controllers\PayPalController::class, 'capturePayment']);
