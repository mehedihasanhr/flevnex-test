<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $authUser = Auth::user();

        $page = $request->query('page', 1);
        $count = $request->query('count', 10);
        $search = $request->query('search', '');
        $sort = $request->query('sort', 'id');
        $order = $request->query('order', 'desc');

        // available columns
        $columns = ['id', 'name', 'phone'];

        $patients = Patient::with('appointments')->where(function ($query) use ($search, $columns, $authUser) {
            // Apply search filter
            if ($search) {
                $query->where(function ($q) use ($search, $columns) {
                    // Search in patient columns
                    foreach ($columns as $column) {
                        $q->orWhere($column, 'LIKE', '%' . $search . '%');
                    }
                });
            }

            // Filter by doctor if the authenticated user has a doctor role
            if ($authUser && $authUser->role === 'doctor') {
                $query->whereHas('appointments', function ($q) use ($authUser) {
                    $q->where('doctor_id', $authUser->id);
                });
            }
        })
            ->orderBy($sort, $order)
            ->paginate($count, ['*'], 'page', $page);

        if ($authUser->role == 'receptionist') {
            return Inertia::render("NotPermission");
        }

        return Inertia::render('Patients', [
            "patients" => $patients,
            "page" => $page,
            "count" => $count,
            'search' => $search,
            "sort" => $sort,
            "order" => $order
        ]);
    }
}
