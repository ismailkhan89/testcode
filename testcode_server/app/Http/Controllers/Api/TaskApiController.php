<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TaskApiController extends Controller
{
  /**
   * Create new task by user
   *
   * @param Illuminate\Http\Request $request
   * @return Illuminate\Http\Response
   */
  public function createTaskByUser(Request $request)
  {
    // Validate data
    $validator = Validator::make($request->all(), [
      'summary'   => 'required',
      'details'   => 'required',
      'due_date'  => 'required',
    ]);

    if ($validator->fails()) {
      return $this->sendError($validator->errors());
    }

    // Insert record
    $result = Task::create([
      'user_id'   => Auth::id(),
      'summary'   => $request->summary,
      'details'   => $request->details,
      'due_date'  => $request->due_date,
    ]);

    if ($result) {
      return response()->json([
        'message' => "Record created Successfully",
        'status'  => 1
      ], 200);
    } else {
      return response()->json([
        'message' => "Sorry something went wrong !",
        'status'  => 0
      ], 400);
    }
  }

  /**
   * Get user completed tasks
   *
   */
  public function getUserCompletedTasks()
  {
    // Get all data
    $result = Task::select('id', 'summary', 'details', 'due_date')
      ->where('user_id', Auth::id())
      ->where('status', 'completed')
      ->orderBy('id', 'desc')
      ->get();

    if ($result) {
      return response()->json([
        'result'  => $result,
        'count'   => count($result),
        'message' => "success",
        'status'  => 1
      ], 200);
    } else {
      return response()->json([
        'message' => "Sorry something went wrong !",
        'status'  => 0
      ], 400);
    }
  }

  /**
   * Get user incomplete tasks
   *
   */
  public function getUserIncompleteTasks()
  {
    // Get all data
    $result = Task::select('id', 'summary', 'details', 'due_date')
      ->where('user_id', Auth::id())
      ->where('status', 'incomplete')
      ->orderBy('id', 'desc')
      ->get();

    if ($result) {
      return response()->json([
        'result'  => $result,
        'count'   => count($result),
        'message' => "success",
        'status'  => 1
      ], 200);
    } else {
      return response()->json([
        'message' => "Sorry something went wrong !",
        'status'  => 0
      ], 400);
    }
  }

  /**
   * Complete task by user
   *
   */
  public function completeTaskByUser(Request $request)
  {
    // Validate data
    $validator = Validator::make($request->all(), [
      'task_id' => 'required'
    ]);

    if ($validator->fails()) {
      return $this->sendError($validator->errors());
    }

    $result = Task::where('id', $request->task_id)->update([
      'status' => 'completed'
    ]);

    if ($result) {
      return response()->json([
        'message' => "Task completed successfully",
        'status'  => 1
      ], 200);
    } else {
      return response()->json([
        'message' => "Sorry something went wrong !",
        'status'  => 0
      ], 400);
    }
  }

  /**
   * Combine errors with messages
   *
   * @param object $message
   */
  public function sendError($message)
  {
    $message = $message->all();
    $response['error'] = "validation_error";
    $response['message'] = implode('', $message);
    $response['status'] = 0;
    return response()->json($response, 422);
  }
}
