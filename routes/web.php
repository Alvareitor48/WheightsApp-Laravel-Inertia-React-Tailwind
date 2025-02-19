<?php

use App\Http\Controllers\Web\DashboardController;
use App\Http\Controllers\Web\ExerciseController;
use App\Http\Controllers\Web\PaymentController;
use App\Http\Controllers\Web\ProfileController;
use App\Http\Controllers\Web\RoutineController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home/pages/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        //'laravelVersion' => Application::VERSION,
        //'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware(['auth', 'role:user|premium|admin'])->group(function(){
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/exercises/by-muscle/{muscleName}', [DashboardController::class, 'getExercisesByMuscle'])->name('exercises.by.muscle');
    Route::get('/dashboard/max-weights/by-muscle/{muscleName}', [DashboardController::class, 'getMaxWeightsByMuscle'])->name('max.weights.by.muscle');

    Route::get('/routines', [RoutineController::class, 'index'])->name('routines.index');
    Route::get('/routines/{id}', [RoutineController::class, 'show'])->name('routines.show');
    Route::get('/routines/{id}/edit', [RoutineController::class, 'edit'])->name('routines.edit');
    Route::put('/routines/{id}', [RoutineController::class, 'update'])->name('routines.update');
    Route::delete('/routines/{id}', [RoutineController::class, 'destroy'])->name('routines.destroy');
    Route::post('/routines', [RoutineController::class, 'store'])->name('routines.store');
    Route::get('/routines/{id}/restore', [RoutineController::class, 'restore'])->name('routines.restore');

    Route::get('/routines/{id}/start', [RoutineController::class, 'start'])->name('routines.start');
    Route::put('/routines/{id}/start-session', [RoutineController::class, 'session'])->name('routines.start.session');
    Route::get('/routines/{id}/chart-by-period',[RoutineController::class, 'updateChart'])->name('routines.update.chart');

    Route::get('/routines/{routineId}/add-exercises/{redirect_to?}', [ExerciseController::class, 'indexAddExercises'])->name('routines.add.exercises');
    Route::put('/routines/{routineId}/add-exercise', [RoutineController::class, 'addExercise'])->name('routines.add.exercise');
    Route::delete('/routines/{routineId}/delete-exercise/{redirect_to?}', [RoutineController::class, 'deleteExercise'])->name('routines.delete.exercise');

    Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');
});

Route::middleware(['auth', 'role:premium|admin'])->group(function(){
    Route::post('/routines/{routineId}/generate-pdf', [RoutineController::class, 'generatePDF'])->name('routines.generate.pdf');
    Route::get('/routines/{routineId}/download-pdf', [RoutineController::class, 'downloadPDF'])->name('routines.download.pdf');
    Route::get('/routines/{routineId}/create-exercise/{redirect_to?}',[ExerciseController::class, 'create'])->name('routines.create.exercise');
    Route::post('/routines/{routineId}/store-exercise/{redirect_to?}', [ExerciseController::class, 'store'])->name('routines.store.exercise');
});

Route::get('/exercises', [ExerciseController::class, 'index'])->name('exercises.index');
Route::get('/exercises/{id}/',[ExerciseController::class,'show'])->name('exercises.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->middleware('password.confirm')->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
