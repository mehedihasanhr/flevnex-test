<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DoctorFactory extends Factory
{
    protected $model = Doctor::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),  // Assumes you have a User factory
            'specialization' => $this->faker->randomElement(['Cardiologist', 'Neurologist', 'Pediatrician', 'General Practitioner']),
            'phone' => $this->faker->phoneNumber,
        ];
    }
}
