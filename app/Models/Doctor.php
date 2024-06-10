<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        "phone",
        "specialization",
    ];

    /**
     * Get with authenticate information
     */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the appointments for the doctor.
     */
    public function appointments()
    {
        return $this->hasManyThrough(Appointment::class, Patient::class);
    }


    /**
     * Doctor's formatted data
     */


    public function getFormattedDataAttribute()
    {
        return [
            'id' => $this->id,
            'name' => $this->user->name,
            'email' => $this->user->email,
            'specialization' => $this->specialization,
            'phone' => $this->phone,
        ];
    }
}
