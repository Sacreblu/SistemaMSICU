<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sectores extends Model
{
    protected $fillable = [
        'id',
        'Sector'
    ];

    public function Tipos(){
        $tipos= Sectores::select('id', 'Sector')->orderBy('id', 'ASC')->get();
        return $tipos;
    }
}
