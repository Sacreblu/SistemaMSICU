<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GradosAcademicos extends Model
{
    protected $fillable = [
        'id',
        'Grado'
    ];

    public function Grados(){
        $grados= GradosAcademicos::select('id', 'Grado')->orderBy('id', 'ASC')->get();
        return $grados;
    }
}
