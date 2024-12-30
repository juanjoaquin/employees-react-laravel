<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::with(['department', 'country', 'state', 'city',])->get();

        if ($employees->isEmpty()) {
            return response()->json(['message' => 'No employees found.'], 404);
        }

        return response()->json($employees, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'zip_code' => 'required|string|max:10',
            'salary' => 'required|numeric',
            'birth_date' => 'required|date',
            'date_hired' => 'required|date',
            'country_id' => 'required|exists:countries,id',
            'state_id' => 'required|exists:states,id',
            'city_id' => 'required|exists:cities,id',
            'department_id' => 'required|exists:departments,id',
        ]);

        $employee = Employee::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'address' => $request->address,
            'zip_code' => $request->zip_code,
            'salary' => $request->salary,
            'birth_date' => $request->birth_date,
            'date_hired' => $request->date_hired,
            'country_id' => $request->country_id,
            'state_id' => $request->state_id,
            'city_id' => $request->city_id,
            'department_id' => $request->department_id,
        ]);

        return response()->json($employee, 201);
    }

    public function show(string $id)
    {
        $employeeById = Employee::with(['country', 'department', 'city', ])->find($id);

        if (!$employeeById) {
            return response()->json([
                'message' => 'Employee not found'
            ], 404);
        }

        return response()->json($employeeById, 200);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'zip_code' => 'required|string|max:10',
            'salary' => 'required|numeric',
            'birth_date' => 'required|date',
            'date_hired' => 'required|date',
            'country_id' => 'required|exists:countries,id',
            'state_id' => 'required|exists:states,id',
            'city_id' => 'required|exists:cities,id',
            'department_id' => 'required|exists:departments,id',
            
        ]);

        $employees = Employee::find($id);

        if (!$employees) {
            return response()->json([
                'message' => 'Employee not found'
            ], 404);
        }

        $employees->first_name = $request->first_name;
        $employees->last_name = $request->last_name;
        $employees->address = $request->address;
        $employees->zip_code = $request->zip_code;
        $employees->salary = $request->salary;
        $employees->birth_date = $request->birth_date;
        $employees->date_hired = $request->date_hired;
        $employees->country_id = $request->country_id;
        $employees->state_id = $request->state_id;
        $employees->city_id = $request->city_id;
        $employees->department_id = $request->department_id;

        $employees->save();

        return response()->json($employees, 200);
    }

    public function destroy(string $id)
    {
        $findEmployee = Employee::find($id);

        if (!$findEmployee) {
            return response()->json([
                'message' => 'Employee not found'
            ], 404);
        }

        $findEmployee->delete();

        return response()->json([
            'message' => 'Employee deleted successfully'
        ], 200);
    }


    public function updateDepartment(Request $request, string $id)
    {
        $request->validate([
            'department_id' => 'required|exists:departments,id',
        ]);

        $employee = Employee::findOrFail($id);
        $employee->department_id = $request->department_id;
        $employee->update();

        return response()->json($employee, 200);
    }

    public function updateCity(Request $request, string $id)
    {
        $request->validate([
            'city_id' => 'required|exists:cities,id',
        ]);

        $employee = Employee::findOrFail($id);
        $employee->city_id = $request->city_id;
        $employee->update();

        return response()->json($employee, 200);
    }

    public function updateCountry(Request $request, string $id)
    {
        $request->validate([
            'country_id' => 'required|exists:countries,id'
        ]);

        $employee = Employee::findOrFail($id);
        $employee->country_id = $request->country_id;
        $employee->update();

        return response()->json($employee, 200);
    }
}
