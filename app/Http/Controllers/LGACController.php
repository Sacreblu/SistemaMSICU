<?php

namespace App\Http\Controllers;

use App\LGAC;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LGACController extends Controller
{
    public function registrarLGAC(Request $request){
        $lgac = new LGAC();
        $validator=$this->validate($request, 
            [
                'Nombre'=>'required|string|max:150|unique:l_g_a_c_s'
            ]);
        return $lgac->RegistrarLGAC($request);
    }

    public function modificarLGAC(Request $request, $id){
        $lgac = new LGAC();
        $validator=$this->validate($request, 
            [
                'Nombre'=>'required|string|max:150|unique:l_g_a_c_s,Nombre,'.$id
            ]);
        return $lgac->ModificarLGAC($request, $id);
    }

    public function filtradoLGAC(Request $request){
        $objeto = new LGAC();
        $lgac = $objeto->filtradoLGAC($request);
        return $lgac;
    }

    public function busquedaLGAC(Request $request){
        $objeto = new LGAC();
        $lgac = $objeto->busquedaLGAC($request);
        return $lgac;
    }

    public function ObtenerLGACs(){
        $objeto = new LGAC();
        $lgacs = $objeto->ObtenerLGACs();
        return $lgacs;
    }
}
