<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paises extends Model
{
    protected $fillable = [
        'id',
        'Pais'
    ];

    public function Paises(){
        $paises= Paises::select('Pais')->orderBy('Pais', 'DESC')->get();
        return $paises;
    }

    public function ComprobarPais($pais){
        $check = Paises::select('id', 'Pais')->where('Pais', '=', $pais)->get();
        if(count($check)!=0){
            return $check[0]->id;
        }else{
            $datos = new Paises ([
                'Pais'=> $pais
            ]); 
            $datos->save();
            return $datos->id;
        }
    }
}
