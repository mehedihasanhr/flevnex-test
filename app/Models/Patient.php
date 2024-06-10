<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "phone",
        "gender",
        "address",
        "age"
    ];

    /**
     * Get the appointments for the patient.
     */
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    /**
     * Get the doctors that the patient has appointments with.
     */
    public function doctors()
    {
        return $this->hasManyThrough(Doctor::class, Appointment::class, 'patient_id', 'id', 'id', 'doctor_id');
    }
}
