<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    private $timeZone = 'Asia/Dhaka';


    public function index(Request $request)
    {

        $authUser = Auth::user();
        $page = $request->query('page', 1);
        $count = $request->query('count', 10);
        $status = $request->query('status', 'scheduled');
        $date = $request->query('appointment_date', "");
        $patient = $request->query('patient', '');
        $doctor = $request->query('doctor', '');
        $search = $request->query('search', '');
        $sort = $request->query('sort', 'id');
        $order = $request->query('order', 'desc');

        if ($authUser->role == 'doctor') {
            $doctor = $authUser->id;
        }

        // Instantiate the model to get the table name
        $model = new Appointment();
        // available columns
        $columns = ['id', 'serial_number'];



        $appointments = $model::with(['doctor.user', 'patient'])
            ->where(function ($query) use ($status, $patient, $doctor, $date, $search, $columns) {
                // user filter
                if ($patient) {
                    $query->where('patient_id', $patient);
                }

                // user filter
                if ($doctor) {
                    $query->where('doctor_id', $doctor);
                }

                if ($date) {
                    $date = convertToUTC($date, 'm-d-Y', $this->timeZone);
                    $query->whereDate('appointment_date', $date);
                }

                // status filter
                if ($status && $status != 'all') {
                    $query->where('status', $status);
                }

                // Apply search filter
                if ($search) {
                    $query->where(function ($q) use ($search, $columns) {
                        // Search in appointment columns
                        foreach ($columns as $column) {
                            $q->orWhere($column, 'LIKE', '%' . $search . '%');
                        }
                    });
                }
            })
            ->orderBy($sort, $order)->paginate($count, ['*'], 'page', $page);

        // Format doctor and patient data
        $appointments->each(function ($appointment) {
            $appointment->doctor->name = $appointment->doctor->formatted_data['name'] ?? null;
            $appointment->doctor->email = $appointment->doctor->formatted_data['email'] ?? null;
        });


        $doctors = Doctor::all()->map(function ($doctor) {
            return $doctor->formatted_data;
        });


        $patients = Patient::with(['appointments'])->where(function ($query) use ($authUser) {
            if ($authUser && $authUser->role === 'doctor') {
                $query->whereHas('appointments', function ($q) use ($authUser) {
                    $q->where('doctor_id', $authUser->id);
                });
            }
        })->get();


        return Inertia::render('Appointments', [
            "appointments" => $appointments,
            "patients" => $patients,
            "doctors" => $doctors,
            "doctor" => $doctor,
            "page" => $page,
            "count" => $count,
            'patient' => $patient,
            "date" => $date,
            'search' => $search,
            'status' => $status,
            "sort" => $sort,
            "order" => $order
        ]);
    }

    // show appointments details
    public function show(Appointment $appointment, $appointment_id)
    {
        $data = $appointment->with(['doctor.user', 'patient'])->findOrFail($appointment_id);
        $data->doctor->name = $data->doctor->formatted_data['name'] ?? null;
        $data->doctor->email = $data->doctor->formatted_data['email'] ?? null;


        return Inertia::render("AppointmentView", [
            "appointment" => $data
        ]);
    }

    // create new appointment
    public function create()
    {
        $patients = Patient::all();
        $doctors = Doctor::all()->map(function ($doctor) {
            return $doctor->formatted_data;
        });

        return Inertia::render('AppointmentCreate', [
            "patients" => $patients,
            "doctors" => $doctors
        ]);
    }


    // store new appointment
    public function store(Request $request)
    {
        // Validation rules
        $rules = [
            'name' => 'required|string',
            'age' => 'required|numeric',
            'phone' => 'required|string',
            'gender' => 'required|string|in:male,female,other',
            'address' => 'nullable|string',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date|after_or_equal:today',
            'notes' => 'nullable|string',
        ];

        // Validate the request data
        $validator = Validator::make($request->all(), $rules);

        // If validation fails, return back with errors
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }


        // create patients
        $patient = Patient::create([
            "name" => $request->input('name'),
            "age" => $request->input('age'),
            "phone" => $request->input('phone'),
            "gender" => $request->input('gender'),
            "address" => $request->input('address'),
        ]);

        // create appointment
        Appointment::create([
            'doctor_id' => $request->input('doctor_id'),
            'patient_id' => $patient->id,
            'appointment_date' => Carbon::parse($request->input('appointment_date')),
            'notes' => $request->input('notes'),
        ]);


        return redirect()->intended(route('appointment.create'));
    }
}
