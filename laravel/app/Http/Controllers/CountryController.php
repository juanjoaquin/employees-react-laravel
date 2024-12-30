<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index()
    {
        $country = Country::with('employees')->get();

        if($country->isEmpty()) {
            return response()->json([
                'message' => 'No countries found'
            ], 200);
        }

        return response()->json($country, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'country_code' => 'required',
            'name' => 'required'
        ]);

        $country = Country::create([
            'country_code' => $request->country_code,
            'name' => $request->name
        ]);

        return response()->json([
            'results' => $country
        ], 201);
    }

    public function show(string $id)
    {
        $country = Country::find($id);

        if(!$country) {
            return response()->json([
                'message' => 'Country not found'
            ], 404);
        }

        return response()->json([
            'country' => $country
        ], 200);
    }

    public function update(Request $request, string $id) 
    {
        $request->validate([
            'country_code' => 'required',
            'name' => 'required'
        ]);

        $country = Country::find($id);
        if(!$country) {
            return response()->json([
                'Country' => 'Department not found'
            ], 404);
        }

        $country->update([
            'name' => $request->name,
            'country_code' => $request->country_code
        ]);

        return response()->json($country, 200);
    }

    public function destroy(string $id) {
        $countryDelete = Country::find($id);

        if(!$countryDelete) {
            return response()->json([
                'message' => 'Country not found'
            ], 404);
        }

        $countryDelete->delete();

        return response()->json([
            'message' => 'Country has been deleted succesfully'
        ], 200);
    }
}
