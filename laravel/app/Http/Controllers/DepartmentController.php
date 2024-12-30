<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::with('employees')->get();

        if(!$departments) {
            return response()->json([
                'message' => 'Departments not found'
            ], 404);
        }

        return response()->json([
            'departments' => $departments
        ], 200);
    }

    public function store(Request $request) 
    {
        $request->validate([
            'name' => 'required'
        ]);

        $departments = Department::create([
            'name' => $request->name
        ]);

        return response()->json([
            'departments' => $departments
        ], 201);
    }

    public function show(string $id)
    {
        $departmentById = Department::find($id);

        if(!$departmentById) {
            return response()->json([
                'message' => 'Department not found'
            ], 404);
        }

        return response()->json([
            'department' => $departmentById
        ], 200);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',

        ]);

        $department = Department::find($id);

        if(!$department) {
            return response()->json([
                'message' => 'Department not found'
            ], 404);
        }

        $department->name = $request->name;

        $department->save();

        return response()->json($department, 200);
    }

    public function destroy(string $id)
    {
        $departmentDelete = Department::find($id);

        if(!$departmentDelete) {
            return response()->json([
                'message' => 'Department not found'
            ], 404);
        }

        $departmentDelete->delete();

        return response()->json([
            'message' => 'Department has been deleted succesfully' 
        ], 200);
    }
}
