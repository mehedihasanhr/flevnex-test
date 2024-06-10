<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DoctorController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page', 1);
        $count = $request->query('count', 10);
        $search = $request->query('search', '');
        $sort = $request->query('sort', 'id');
        $order = $request->query('order', 'desc');

        // available columns
        $columns = ['id', 'phone'];


        $doctors = Doctor::with(['user'])
            ->where(function ($query) use ($search, $columns) {
                if ($search) {
                    $query->where(function ($q) use ($search, $columns) {
                        // Search in doctor columns
                        foreach ($columns as $column) {
                            $q->orWhere($column, 'LIKE', '%' . $search . '%');
                        }

                        // search from user table
                        $q->orWhereHas('user', function ($q) use ($search) {
                            $q->where('name', 'LIKE', '%' . $search . '%');
                        });
                    });
                }
            })
            ->orderBy($sort, $order)
            ->paginate($count, ['*'], 'page', $page);

        $authUser = Auth::user();

        if ($authUser->role == 'doctor') {
            return Inertia::render("NotPermission");
        }

        return Inertia::render('Doctors', [
            "doctors" => $doctors,
            "page" => $page,
            "count" => $count,
            'search' => $search,
            "sort" => $sort,
            "order" => $order
        ]);
    }
}
