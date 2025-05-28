<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

Route::get('/students/levels-report', [StudentController::class, 'reportsLevels']);
Route::get('/students/top-a', [StudentController::class, 'topgroupA']);
Route::get('/students/overall', [StudentController::class, 'overall']);
Route::get('/students/subject-performance', [StudentController::class, 'subjectPerformance']);
Route::get('/students/score-distribution/{subject}', [StudentController::class, 'scoreDistribution']);
Route::get('/students/top-by-subject', [StudentController::class, 'topBySubject']);
Route::get('/students/{sbd}', [StudentController::class, 'show']);
