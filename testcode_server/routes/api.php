<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\Api\TaskApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public Routes
Route::controller(AuthenticationController::class)->group(function () {
  Route::post('/login', 'login');
});

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
  // Logout
  Route::get('/logout', [AuthenticationController::class, 'logout']);

  // Admin routes
  Route::middleware(['checkrole:admin'])->group(function () {
  });

  // User routes
  Route::controller(TaskApiController::class)->group(function () {
    Route::post('/user/task/add', 'createTaskByUser');
    Route::get('/user/task/completed/list', 'getUserCompletedTasks');
    Route::get('/user/task/incomplete/list', 'getUserIncompleteTasks');
    Route::post('/user/task/completed', 'completeTaskByUser');
  });
});
