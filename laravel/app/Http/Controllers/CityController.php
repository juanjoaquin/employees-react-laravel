<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        $cities = City::with(['state', 'employees'])->get();

        if($cities->isEmpty()) {
            return response()->json(['message' => 'No cities found'], 404);
        }
        
        return response()->json($cities, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'state_id' => 'sometimes|exists:states,id'
        ]);

        $city = City::create([
            'name' => $request->name,
            'state_id' => $request->state_id
        ]);

        return response()->json($city, 201);
    }

    public function show(string $id)
    {
        $findCity = City::with('state')->find($id);

        if(!$findCity) {
            return response()->json([
                'message' => 'City not found'
            ], 404);
        }

        return response()->json([
            'city' => $findCity
        ], 200);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'state_id' => 'sometimes|exists:states,id'
        ]);

        $cities = City::find($id);

        if(!$cities) {
            return response()->json([
                'message' => 'City not found'
            ], 404);
        }

        $cities->name = $request->name;
        $cities->state_id = $request->state_id;

        $cities->save();

        return response()->json($cities, 200);
    }

    public function destroy(string $id)
    {
        $findCity = City::find($id);

        if(!$findCity) {
            return response()->json([
                'message' => 'City not found'
            ], 404);
        }

        $findCity->delete();

        return response()->json([
            'message' => 'City deleted successfully'
        ], 200);
    }
}
