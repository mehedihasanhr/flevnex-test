<?php

namespace Database\Factories;

use App\Models\Appointment;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    protected $model = Appointment::class;

    public function definition()
    {
        return [
            'doctor_id' => \App\Models\Doctor::factory(),
            'patient_id' => \App\Models\Patient::factory(),
            'appointment_date' => $this->faker->dateTimeBetween('+1 day', '+1 month'),
            'status' => $this->faker->randomElement(['scheduled', 'completed', 'canceled']),
            'notes' => $this->faker->text,
        ];
    }
}
