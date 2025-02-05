<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoutineController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\DashboardController;
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

Route::middleware('auth')->group(function(){
    Route::get('AdminRoutines/{id}',[RoutineController::class,'show'])->name('AdminRoutines');
    Route::get('IndexRoutines',[RoutineController::class,'index'])->name('IndexRoutines');
    Route::get('UpdateRoutines/{id}/edit', [RoutineController::class, 'edit'])->name('routines.edit');
    Route::put('UpdateRoutines',[RoutineController::class,'update'])->name('routines.update');
    Route::get('StartRoutines/{id}', [RoutineController::class, 'start'])->name('routines.start');
    Route::put('StartRoutines',[RoutineController::class,'session'])->name('routines.start.session');
    Route::get('AddExercises/{routineId}/{redirect_to?}',[ExerciseController::class,'indexAddExercises'])->name('routines.add.exercises');
    Route::put('AddExercise/{routineId}/', [RoutineController::class, 'addExercise'])->name('routines.add.exercise');
    Route::delete('DeleteExercise/{routineId}/', [RoutineController::class, 'deleteExercise'])->name('routines.delete.exercise');
    Route::post('Routines/create', [RoutineController::class, 'createRoutine'])->name('routines.create');
    Route::get('Dashboard',[DashboardController::class,'index'])->name('dashboard');
    Route::get('/exercises-by-muscle/{muscleName}', [DashboardController::class, 'exercisesByMuscle'])->name('exercises.by.muscle');
});

Route::get('IndexExercises',[ExerciseController::class,'index'])->name('exercises.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
