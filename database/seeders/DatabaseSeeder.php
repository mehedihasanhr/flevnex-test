<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create an administrator
        User::factory()->create([
            'email' => 'administrator@example.com',
            'role' => 'administrator',
        ]);

        // Create a receptionist
        User::factory()->create([
            'email' => 'receptionist@example.com',
            'role' => 'receptionist',
        ]);

        // Create a single doctor and their user
        $singleDoctorUser = User::factory()->create([
            'email' => 'doctor@example.com',
            'role' => 'doctor',
        ]);

        $singleDoctor = Doctor::factory()->create([
            'user_id' => $singleDoctorUser->id,
        ]);

        // Create multiple doctors and their users
        $doctorUsers = User::factory()->count(10)->create([
            'role' => 'doctor',
        ]);

        $doctors = collect();
        foreach ($doctorUsers as $doctorUser) {
            $doctors->push(Doctor::factory()->create([
                'user_id' => $doctorUser->id,
            ]));
        }

        // Create patients and associate them with doctors
        $patients = Patient::factory(20)->create()->each(function ($patient) use ($doctors) {
            // Randomly associate each patient with one of the doctors
            $patient->appointments()->create([
                'doctor_id' => $doctors->random()->id,
                'appointment_date' => now()->addDays(rand(1, 30)),
                'notes' => 'Initial consultation',
            ]);
        });

        // Create appointments for the single doctor
        Appointment::factory(50)->create([
            'doctor_id' => $singleDoctor->id,
            'patient_id' => Patient::inRandomOrder()->first()->id,
            'appointment_date' => now()->addDays(rand(1, 30)),
            'notes' => 'Follow-up consultation',
        ]);
    }
}
