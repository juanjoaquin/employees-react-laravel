<?php

namespace App\Http\Controllers;

use App\Models\State;
use Illuminate\Http\Request;

class StateController extends Controller
{
    public function index()
    {
        $states = State::with(['country', 'employees'])->get();

        if($states->isEmpty()) {
            return response()->json(['message' => 'No states found'], 404);
        }
        
        return response()->json($states, 200);
    }

    public function store(Request $request) 
    {
        $request->validate([
            'name' => 'required',
            'country_id' => 'required|exists:countries,id',
        ]);

        $state = State::create([
            'name' => $request->name,
            'country_id' => $request->country_id
        ]);

        return response()->json($state, 201);
    }

    public function show(string $id)
    {
        $states = State::with('country')->find($id);

        if(!$states) {
            return response()->json([
                'message' => 'State not found'
            ], 404);
        }

        return response()->json([
            'states' => $states
        ], 200);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'country_id' => 'sometimes|exists:countries,id',
        ]);

        $states = State::find($id);

        if(!$states) {
            return response()->json([
                'message' => 'State not found'
            ], 404);
        }

        $states->name = $request->name;

        if($request->has('country_id')) {
            $states->country_id = $request->country_id;
        }


        $states->save();

        return response()->json($states, 200);
    }

    public function destroy(string $id)
    {
        $findState = State::find($id);

        if(!$findState) {
            return response()->json([
                'message' => 'State not found'
            ], 404);
        }

        $findState->delete();

        return response()->json([
            'message' => 'State deleted successfully'
        ], 200);

    }

}
