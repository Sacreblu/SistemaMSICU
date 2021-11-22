<?php

namespace App\Http\Controllers;

use App\TrabajosEnSectores;
use App\TrabSectColaboracionProf;
use App\TrabSectColaboracionEst;
use App\TrabSectEEAsociadas;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TrabajosEnSectoresController extends Controller
{
    public function mostrarTrabajoSector(){
        $objeto = new TrabajosEnSectores();
        $result = $objeto->mostrarTrabajoSector();
        return view('TrabajosEnSector.verTrabajoSector', compact('result'));
    }

    public function registrarTrabajosSector(){
        return view('TrabajosEnSector.registrarTrabajoSector');
    }

    public function VistaModificarTrabajosSector($id){
        $request = new Request();
        $request->request->add(['idTS' => $id]);
        $informacion = new TrabajosEnSectoresController();
        $informacion = $informacion->obtenerInformacionTS($request);

        return view('TrabajosEnSector.modificarTrabajoSector', compact('informacion'));
    }
    
    public function FiltradoTS(Request $request){
        $ts = new TrabajosEnSectores();
        return $ts->FiltradoTS($request);
    }

    public function BusquedaTS(Request $request){
        $ts = new TrabajosEnSectores();
        return $ts->BusquedaTS($request);
    }

    public function obtenerInformacionTS(Request $request){
        $DatosGenerales = new TrabajosEnSectores();
        $DatosGenerales = $DatosGenerales -> ObtenerDatosGeneralesTS($request);
        $ColabProf = new TrabSectColaboracionProf();
        $ColabProf = $ColabProf -> ObtenerColaboracionByProfesor($request);
        $ColabEst = new TrabSectColaboracionEst();
        $ColabEst = $ColabEst -> ObtenerColaboracionByEstudiante($request);
        $EEAsociada = new TrabSectEEAsociadas();
        $EEAsociada = $EEAsociada -> ObtenerEEAsociadas($request);
        
        $array = array(
            "DatosGenerales" => $DatosGenerales[0],
            "ColabProf" => $ColabProf,
            "ColabEst" => $ColabEst,
            "EEAsociada" => $EEAsociada
        );
        return $array;
    }

    public function ValidarDatosGeneralesTrabajoSector(Request $request){
        $validator = Validator::make($request->all(), [

                'NombreConvenio'=>'required',
                'IdConvenio'=>'required',
                'NombreProyecto' => 'required|string|max:150',
                'Institucion'=>'required|string|max:100',
                'ResponsableProyecto'=>'required|string|max:60',
                'ProfesorResponsable'=>'required',
                'IdProfesorResponsable'=>'required',
                'AnioInicio'=>'before_or_equal:AnioFin',
                'AnioFin'=>'after_or_equal:AnioInicio'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarColaboracionesProfesores(Request $request){
        $validator = Validator::make($request->all(), [
                'ColabProf'=>'required',
                'IdColabProf'=>'required',
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarColaboracionesEstudiantes(Request $request){
        $validator = Validator::make($request->all(), [
                'ColabEst'=>'required',
                'IdColabEst'=>'required',
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarEEAsociada(Request $request){
        $validator = Validator::make($request->all(), [
                'EE'=>'required',
                'IdEE'=>'required',
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarDatosGeneralesTrabajoSectorModificar(Request $request, $id){
        $validator = Validator::make($request->all(), [
                'NombreConvenio'=>'required',
                'IdConvenio'=>'required',
                'NombreProyecto' => 'required|string|max:150',
                'Institucion'=>'required|string|max:100',
                'ResponsableProyecto'=>'required|string|max:60',
                'ProfesorResponsable'=>'required',
                'IdProfesorResponsable'=>'required',
                'AnioInicio'=>'before_or_equal:AnioFin',
                'AnioFin'=>'after_or_equal:AnioInicio'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarColaboracionesProfesoresModificar(Request $request){
        $validator = Validator::make($request->all(), [
                'ColabProf'=>'required',
                'IdColabProf'=>'required',
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarColaboracionesEstudiantesModificar(Request $request){
        $validator = Validator::make($request->all(), [
                'ColabEst'=>'required',
                'IdColabEst'=>'required',
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarEEAsociadaModificar(Request $request){
        $validator = Validator::make($request->all(), [
                'EE'=>'required',
                'IdEE'=>'required',
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function RegistrarDG(Request $request){

        $DatosGenerales = new TrabajosEnSectores();
        $idTS=$DatosGenerales->RegistrarDG($request);

        return $idTS;
    }

    public function ModificarDG(Request $request, $id){
        $TS = new TrabajosEnSectores();
        return $TS->ModificarDG($request, $id);
    }

    

    public function EliminarColabProf(Request $request){
        $colaboraciones = new TrabSectColaboracionProf();
        return $colaboraciones->EliminarColabProf($request);
    }

    public function RegistrarColaboracionProfesores(Request $request){
        $colaboracion = new TrabSectColaboracionProf();
        $colaboracion->RegistrarColaboracionProfesores($request);
    }

    public function ModificarColabProf(Request $request){
        $colaboracion = new TrabSectColaboracionProf();
        return $colaboracion->ModificarColabProf($request);
    }



    public function EliminarColabEst(Request $request){
        $colaboraciones = new TrabSectColaboracionEst();
        return $colaboraciones->EliminarColabEst($request);
    }

    public function RegistrarColaboracionEstudiantes(Request $request){
        $colaboracion = new TrabSectColaboracionEst();
        $colaboracion->RegistrarColaboracionEstudiantes($request);
    }

    public function ModificarColabEst(Request $request){
        $colaboracion = new TrabSectColaboracionEst();
        return $colaboracion->ModificarColabEst($request);
    }

    public function EliminarEE(Request $request){
        $ee = new TrabSectEEAsociadas();
        return $ee->EliminarEE($request);
    }

    public function RegistrarEEAsociadas(Request $request){
        $EE = new TrabSectEEAsociadas();
        $EE->RegistrarEEAsociadas($request);
    }

    public function ModificarEE(Request $request){
        $ee = new TrabSectEEAsociadas();
        return $ee->ModificarEE($request);
    }

    public function EliminarTrabajoEnSector(Request $request){
        $ts = new TrabajosEnSectores();
        return $ts->EliminarTrabajoEnSector($request);
    }
    
}
