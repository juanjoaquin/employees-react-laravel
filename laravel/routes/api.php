<?php

use App\Http\Controllers\CityController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\CsvController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\StateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
    return response()->json([
        'message' => '¡Conexión exitosa con Laravel!',
        'status' => 200
    ]);
});

//Country
Route::get('/countries', [CountryController::class, 'index'])->name('country.index');
Route::post('/countries', [CountryController::class, 'store'])->name('country.store');
Route::put('/countries/{id}', [CountryController::class, 'update'])->name('country.update');
Route::get('/countries/{id}', [CountryController::class, 'show'])->name('country.show');
Route::delete('/countries/{id}', [CountryController::class, 'destroy'])->name('country.destroy');

//State
Route::get('/states', [StateController::class, 'index'])->name('state.index');
Route::post('/states', [StateController::class, 'store'])->name('state.store');
Route::put('/states/{id}', [StateController::class, 'update'])->name('state.update');
Route::get('/states/{id}', [StateController::class, 'show'])->name('state.show');
Route::delete('/states/{id}', [StateController::class, 'destroy'])->name('state.destroy');

//Department
Route::get('/departments', [DepartmentController::class, 'index'])->name('department.index');
Route::post('/departments', [DepartmentController::class, 'store'])->name('department.store');
Route::get('/departments/{id}', [DepartmentController::class, 'show'])->name('department.show');
Route::put('/departments/{id}', [DepartmentController::class, 'update'])->name('department.update');
Route::delete('/departments/{id}', [DepartmentController::class, 'destroy'])->name('department.destroy');

//City
Route::get('/cities', [CityController::class, 'index'])->name('cities.index');
Route::post('/cities', [CityController::class, 'store'])->name('cities.store');
Route::get('/city/{id}', [CityController::class, 'show'])->name('cities.show');
Route::put('/city/{id}', [CityController::class, 'update'])->name('cities.update');
Route::delete('/city/{id}', [CityController::class, 'destroy'])->name('cities.destroy');

//Employee
Route::get('/employees', [EmployeeController::class, 'index'])->name('employees.index');
Route::post('/employees', [EmployeeController::class, 'store'])->name('employees.store');
Route::get('/employees/{id}', [EmployeeController::class, 'show'])->name('employees.show');
Route::put('/employees/{id}', [EmployeeController::class, 'update'])->name('employees.update');
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy'])->name('employees.destroy');

//Employees edit w/components
Route::put('/employees/{id}/update-department', [EmployeeController::class, 'updateDepartment'])->name('employee.updateDepartment');
Route::put('/employees/{id}/update-city', [EmployeeController::class, 'updateCity'])->name('employee.updateCity');
Route::put('/employees/{id}/update-country', [EmployeeController::class, 'updateCountry'])->name('employee.updateCountry');




